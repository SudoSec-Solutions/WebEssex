from rest_framework import serializers

from .models import ContactSubmission, Subscription


class ContactSubmissionSerializer(serializers.ModelSerializer):
  class Meta:
    model = ContactSubmission
    fields = ['id', 'name', 'email', 'company', 'message', 'subscribe_to_updates', 'created_at']
    read_only_fields = ['id', 'created_at']


class SubscriptionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Subscription
    fields = ['id', 'email', 'name', 'source', 'created_at']
    read_only_fields = ['id', 'created_at']
    extra_kwargs = {
      'email': {
        'validators': [],
      }
    }

  def validate_email(self, value: str) -> str:
    return value.lower()
