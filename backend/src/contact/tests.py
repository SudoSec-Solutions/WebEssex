from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactSubmission, Subscription, WorkshopRequest


class ContactSubmissionTests(APITestCase):
  def test_create_contact_submission(self):
    payload = {
      'name': 'Jane Doe',
      'email': 'jane@example.com',
      'phone': '+44 20 7946 0018',
      'company': 'Acme Inc.',
      'message': 'Interested in a redesign project.',
      'subscribe_to_updates': True
    }
    url = reverse('contact:contact-submissions')
    response = self.client.post(url, payload, format='json')

    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(ContactSubmission.objects.count(), 1)
    submission = ContactSubmission.objects.first()
    self.assertTrue(submission.subscribe_to_updates)
    self.assertEqual(submission.phone, '+44 20 7946 0018')


class SubscriptionTests(APITestCase):
  def test_create_subscription(self):
    payload = {'email': 'subscriber@example.com', 'name': 'Subscriber'}
    url = reverse('contact:subscriptions')
    response = self.client.post(url, payload, format='json')

    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Subscription.objects.count(), 1)

  def test_idempotent_subscription(self):
    Subscription.objects.create(email='subscriber@example.com')
    payload = {'email': 'subscriber@example.com', 'name': 'Updated Name'}
    url = reverse('contact:subscriptions')
    response = self.client.post(url, payload, format='json')

    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(Subscription.objects.count(), 1)
    self.assertEqual(Subscription.objects.first().name, 'Updated Name')


class WorkshopRequestTests(APITestCase):
  def test_create_workshop_request(self):
    payload = {
      'preferred_date': '2025-12-05',
      'preferred_time': '10:30:00',
      'location': 'London HQ',
      'email': 'ops@example.com',
      'phone': '+44 20 7946 0018',
      'description': 'Strategy alignment workshop.'
    }
    url = reverse('contact:workshop-requests')
    response = self.client.post(url, payload, format='json')

    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(WorkshopRequest.objects.count(), 1)
    request = WorkshopRequest.objects.first()
    self.assertEqual(request.location, 'London HQ')
