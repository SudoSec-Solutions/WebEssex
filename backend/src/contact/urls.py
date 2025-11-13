from django.urls import path

from .views import ContactSubmissionView, SubscriptionView, WorkshopRequestView

app_name = 'contact'

urlpatterns = [
  path('contact-submissions/', ContactSubmissionView.as_view(), name='contact-submissions'),
  path('subscriptions/', SubscriptionView.as_view(), name='subscriptions'),
  path('workshop-requests/', WorkshopRequestView.as_view(), name='workshop-requests')
]
