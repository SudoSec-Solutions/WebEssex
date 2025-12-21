from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from .models import ContactSubmission, Lead, Subscription, WorkshopRequest
from .serializers import ContactSubmissionSerializer, LeadSerializer, SubscriptionSerializer, WorkshopRequestSerializer


class ContactSubmissionView(CreateAPIView):
  queryset = ContactSubmission.objects.all()
  serializer_class = ContactSubmissionSerializer


class SubscriptionView(CreateAPIView):
  queryset = Subscription.objects.all()
  serializer_class = SubscriptionSerializer

  def create(self, request, *args, **kwargs):
    # Allow graceful handling if the email already exists
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    subscription, created = Subscription.objects.get_or_create(
      email=serializer.validated_data['email'],
      defaults={
        'name': serializer.validated_data.get('name', ''),
        'source': serializer.validated_data.get('source', ''),
        'consent': serializer.validated_data.get('consent', False)
      }
    )

    if not created:
      # Update optional fields if provided
      update_fields = []
      for field in ['name', 'source']:
        new_value = serializer.validated_data.get(field)
        if new_value:
          setattr(subscription, field, new_value)
          update_fields.append(field)
      if serializer.validated_data.get('consent') is True and not subscription.consent:
        subscription.consent = True
        update_fields.append('consent')
      if update_fields:
        subscription.save(update_fields=update_fields)

    response_serializer = self.get_serializer(subscription)
    status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
    return Response(response_serializer.data, status=status_code)


class WorkshopRequestView(CreateAPIView):
  queryset = WorkshopRequest.objects.all()
  serializer_class = WorkshopRequestSerializer


class LeadView(CreateAPIView):
  queryset = Lead.objects.all()
  serializer_class = LeadSerializer
