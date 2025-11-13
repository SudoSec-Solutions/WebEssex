from django.contrib import admin

from .models import ContactSubmission, Subscription, WorkshopRequest


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'phone', 'company', 'subscribe_to_updates', 'created_at')
  list_filter = ('subscribe_to_updates', 'created_at')
  search_fields = ('name', 'email', 'phone', 'company')
  readonly_fields = ('created_at', 'updated_at')


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
  list_display = ('email', 'name', 'source', 'created_at')
  search_fields = ('email', 'name', 'source')
  readonly_fields = ('created_at', 'updated_at')


@admin.register(WorkshopRequest)
class WorkshopRequestAdmin(admin.ModelAdmin):
  list_display = ('email', 'preferred_date', 'preferred_time', 'location', 'created_at')
  search_fields = ('email', 'location', 'phone')
  readonly_fields = ('created_at', 'updated_at')
