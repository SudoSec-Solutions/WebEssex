from rest_framework import serializers

from .models import ContactSubmission, Lead, Subscription, WorkshopRequest


class ContactSubmissionSerializer(serializers.ModelSerializer):
  class Meta:
    model = ContactSubmission
    fields = [
      'id',
      'name',
      'email',
      'phone',
      'company',
      'message',
      'subscribe_to_updates',
      'consent_privacy',
      'created_at'
    ]
    read_only_fields = ['id', 'created_at']

  def validate_consent_privacy(self, value: bool) -> bool:
    if value is not True:
      raise serializers.ValidationError('Consent is required.')
    return value


class SubscriptionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Subscription
    fields = ['id', 'email', 'name', 'source', 'consent', 'created_at']
    read_only_fields = ['id', 'created_at']
    extra_kwargs = {
      'email': {
        'validators': [],
      }
    }

  def validate_email(self, value: str) -> str:
    return value.lower()

  def validate_consent(self, value: bool) -> bool:
    if value is not True:
      raise serializers.ValidationError('Consent is required.')
    return value


class WorkshopRequestSerializer(serializers.ModelSerializer):
  class Meta:
    model = WorkshopRequest
    fields = [
      'id',
      'preferred_date',
      'preferred_time',
      'location',
      'email',
      'phone',
      'description',
      'created_at'
    ]
    read_only_fields = ['id', 'created_at']


class LeadSerializer(serializers.ModelSerializer):
  class Meta:
    model = Lead
    fields = ['id', 'name', 'email', 'phone', 'company', 'plan', 'message', 'consent_privacy', 'created_at']
    read_only_fields = ['id', 'created_at']

  def validate_consent_privacy(self, value: bool) -> bool:
    if value is not True:
      raise serializers.ValidationError('Consent is required.')
    return value
