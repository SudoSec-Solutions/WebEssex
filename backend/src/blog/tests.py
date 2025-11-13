from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import BlogAuthor, BlogCategory, BlogPost


class BlogApiTests(APITestCase):
  def setUp(self):
    self.author = BlogAuthor.objects.create(full_name='Jane Writer', role='Content Lead')
    self.category = BlogCategory.objects.create(name='Product', slug='product')
    self.published_post = BlogPost.objects.create(
      title='Launch Playbook',
      excerpt='How to launch.',
      body='<p>Sanitized body</p>',
      status=BlogPost.Status.PUBLISHED,
      hero_image_url='https://cdn.example.com/hero.jpg',
      author=self.author,
    )
    self.published_post.categories.add(self.category)
    self.draft_post = BlogPost.objects.create(
      title='Draft Only',
      excerpt='Not public',
      body='<p>Draft</p>',
      status=BlogPost.Status.DRAFT,
    )

  def test_list_returns_only_published(self):
    url = reverse('blog:blog-posts-list')
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    slugs = [item['slug'] for item in response.data['results']]
    self.assertIn(self.published_post.slug, slugs)
    self.assertNotIn(self.draft_post.slug, slugs)

  def test_detail_returns_post_and_related(self):
    url = reverse('blog:blog-posts-detail', kwargs={'slug': self.published_post.slug})
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['slug'], self.published_post.slug)
    self.assertIn('body', response.data)
    self.assertEqual(response.data['canonical_url'], f"/blog/{self.published_post.slug}")

  def test_draft_detail_returns_404(self):
    url = reverse('blog:blog-posts-detail', kwargs={'slug': self.draft_post.slug})
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

  def test_category_filter(self):
    other_category = BlogCategory.objects.create(name='Growth', slug='growth')
    other_post = BlogPost.objects.create(
      title='Growth Update',
      excerpt='Growth content',
      body='<p>Growth body</p>',
      status=BlogPost.Status.PUBLISHED,
    )
    other_post.categories.add(other_category)

    url = reverse('blog:blog-posts-list')
    response = self.client.get(url, {'category': 'growth'})
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    slugs = [item['slug'] for item in response.data['results']]
    self.assertIn(other_post.slug, slugs)
    self.assertNotIn(self.published_post.slug, slugs)
