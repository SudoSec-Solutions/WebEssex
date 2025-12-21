from django.contrib import admin

from .models import ContactSubmission, Lead, Subscription, WorkshopRequest


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'phone', 'company', 'subscribe_to_updates', 'consent_privacy', 'created_at')
  list_filter = ('subscribe_to_updates', 'consent_privacy', 'created_at')
  search_fields = ('name', 'email', 'phone', 'company')
  readonly_fields = ('created_at', 'updated_at')


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
  list_display = ('email', 'name', 'source', 'consent', 'created_at')
  search_fields = ('email', 'name', 'source')
  readonly_fields = ('created_at', 'updated_at')


@admin.register(WorkshopRequest)
class WorkshopRequestAdmin(admin.ModelAdmin):
  list_display = ('email', 'preferred_date', 'preferred_time', 'location', 'created_at')
  search_fields = ('email', 'location', 'phone')
  readonly_fields = ('created_at', 'updated_at')


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'plan', 'company', 'consent_privacy', 'created_at')
  search_fields = ('name', 'email', 'plan', 'company')
  readonly_fields = ('created_at', 'updated_at')
