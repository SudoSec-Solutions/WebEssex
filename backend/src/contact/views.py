from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from .models import ContactSubmission, Subscription
from .serializers import ContactSubmissionSerializer, SubscriptionSerializer


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
        'source': serializer.validated_data.get('source', '')
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
      if update_fields:
        subscription.save(update_fields=update_fields)

    response_serializer = self.get_serializer(subscription)
    status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
    return Response(response_serializer.data, status=status_code)
