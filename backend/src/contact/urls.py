from django.urls import path

from .views import ContactSubmissionView, SubscriptionView

app_name = 'contact'

urlpatterns = [
  path('contact-submissions/', ContactSubmissionView.as_view(), name='contact-submissions'),
  path('subscriptions/', SubscriptionView.as_view(), name='subscriptions')
]
