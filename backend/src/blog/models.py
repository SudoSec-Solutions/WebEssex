from __future__ import annotations

import typing
import uuid

import bleach
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

ALLOWED_BODY_TAGS = [
  'a',
  'abbr',
  'blockquote',
  'br',
  'code',
  'em',
  'figcaption',
  'figure',
  'h2',
  'h3',
  'h4',
  'hr',
  'img',
  'li',
  'ol',
  'p',
  'pre',
  'strong',
  'ul'
]

ALLOWED_BODY_ATTRIBUTES = {
  '*': ['class'],
  'a': ['href', 'title', 'rel', 'target'],
  'img': ['src', 'alt', 'title', 'loading', 'width', 'height']
}

ALLOWED_PROTOCOLS = ['http', 'https', 'mailto']


def sanitize_rich_text(value: str) -> str:
  return bleach.clean(
    value or '',
    tags=ALLOWED_BODY_TAGS,
    attributes=ALLOWED_BODY_ATTRIBUTES,
    protocols=ALLOWED_PROTOCOLS,
    strip=True
  ).strip()


def sanitize_plain_text(value: str) -> str:
  return bleach.clean(value or '', tags=[], attributes={}, strip=True).strip()


class TimeStampedModel(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True


class BlogCategory(TimeStampedModel):
  name = models.CharField(max_length=120, unique=True)
  slug = models.SlugField(max_length=140, unique=True)
  description = models.CharField(max_length=200, blank=True)

  class Meta:
    ordering = ['name']

  def __str__(self) -> str:
    return self.name

  def clean(self):
    self.description = sanitize_plain_text(self.description)

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.name)
    self.clean()
    super().save(*args, **kwargs)


class BlogAuthor(TimeStampedModel):
  full_name = models.CharField(max_length=120)
  role = models.CharField(max_length=120, blank=True)
  bio = models.TextField(blank=True)
  avatar_url = models.URLField(blank=True)

  class Meta:
    ordering = ['full_name']

  def __str__(self) -> str:
    return self.full_name

  def clean(self):
    self.bio = sanitize_plain_text(self.bio)

  def save(self, *args, **kwargs):
    self.clean()
    super().save(*args, **kwargs)


class BlogPostQuerySet(models.QuerySet):
  def published(self):
    now = timezone.now()
    return self.filter(status=BlogPost.Status.PUBLISHED, published_at__isnull=False, published_at__lte=now)


class BlogPost(TimeStampedModel):
  class Status(models.TextChoices):
    DRAFT = 'draft', 'Draft'
    PUBLISHED = 'published', 'Published'

  title = models.CharField(max_length=180)
  slug = models.SlugField(max_length=200, unique=True, blank=True)
  excerpt = models.TextField()
  body = models.TextField()
  hero_image_url = models.URLField(blank=True)
  hero_image = models.ImageField(upload_to='blog/heroes/', blank=True, null=True)
  reading_time_minutes = models.PositiveIntegerField(default=4, editable=False)
  status = models.CharField(max_length=12, choices=Status.choices, default=Status.DRAFT)
  published_at = models.DateTimeField(blank=True, null=True)
  canonical_url = models.URLField(blank=True)
  seo_title = models.CharField(max_length=180, blank=True)
  seo_description = models.CharField(max_length=300, blank=True)
  seo_keywords = models.CharField(max_length=300, blank=True, help_text='Comma-separated list of keywords.')
  author = models.ForeignKey(BlogAuthor, on_delete=models.SET_NULL, related_name='posts', null=True, blank=True)
  categories = models.ManyToManyField(BlogCategory, related_name='posts', blank=True)

  objects = BlogPostQuerySet.as_manager()

  class Meta:
    ordering = ['-published_at', '-created_at']

  def __str__(self) -> str:
    return self.title

  def clean(self):
    self.excerpt = sanitize_plain_text(self.excerpt)
    self.body = sanitize_rich_text(self.body)
    self.seo_title = sanitize_plain_text(self.seo_title)
    self.seo_description = sanitize_plain_text(self.seo_description)
    self.seo_keywords = sanitize_plain_text(self.seo_keywords)
    self.hero_image_url = sanitize_plain_text(self.hero_image_url)

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = self._generate_unique_slug()

    if self.status == self.Status.PUBLISHED and not self.published_at:
      self.published_at = timezone.now()
    elif self.status == self.Status.DRAFT:
      self.published_at = None

    self.clean()
    self.reading_time_minutes = self._estimate_read_time()
    return super().save(*args, **kwargs)

  def _generate_unique_slug(self) -> str:
    base_slug = slugify(self.title) if self.title else ''
    if not base_slug:
      base_slug = uuid.uuid4().hex[:16]

    slug_candidate = base_slug
    index = 1
    while BlogPost.objects.filter(slug=slug_candidate).exclude(pk=self.pk).exists():
      slug_candidate = f"{base_slug}-{index}"
      index += 1
    return slug_candidate

  def _estimate_read_time(self) -> int:
    word_count = len(sanitize_plain_text(self.body).split())
    minutes = max(1, int(round(word_count / 200)))  # assume 200 WPM
    return minutes

  @property
  def seo_payload(self) -> dict[str, typing.Any]:
    return {
      'title': self.seo_title or self.title,
      'description': self.seo_description or self.excerpt[:150],
      'keywords': [keyword.strip() for keyword in self.seo_keywords.split(',') if keyword.strip()],
      'canonical': self.canonical_url or f"/blog/{self.slug}",
      'ogImage': self.resolved_hero_image_url
    }

  def get_absolute_url(self):
    return f"/blog/{self.slug}"

  @property
  def resolved_hero_image_url(self) -> str | None:
    if self.hero_image:
      return self.hero_image.url
    return self.hero_image_url or None
