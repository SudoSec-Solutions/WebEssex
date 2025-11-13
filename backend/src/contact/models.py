from django.db import models


class TimeStampedModel(models.Model):
  """Abstract base model that tracks creation and update timestamps."""

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True


class ContactSubmission(TimeStampedModel):
  name = models.CharField(max_length=150)
  email = models.EmailField()
  phone = models.CharField(max_length=30, blank=True)
  company = models.CharField(max_length=150, blank=True)
  message = models.TextField()
  subscribe_to_updates = models.BooleanField(default=False)

  class Meta:
    ordering = ['-created_at']

  def __str__(self) -> str:
    return f"ContactSubmission<{self.email}>"


class Subscription(TimeStampedModel):
  email = models.EmailField(unique=True)
  name = models.CharField(max_length=150, blank=True)
  source = models.CharField(max_length=100, blank=True)

  class Meta:
    ordering = ['-created_at']

  def __str__(self) -> str:
    return f"Subscription<{self.email}>"
