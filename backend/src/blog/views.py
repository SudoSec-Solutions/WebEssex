from xml.sax.saxutils import escape

from django.http import HttpResponse
from django.utils import timezone
from rest_framework import filters, viewsets

from .models import BlogCategory, BlogPost
from .pagination import BlogPostPagination
from .serializers import BlogCategorySerializer, BlogPostDetailSerializer, BlogPostListSerializer


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = BlogPostListSerializer
  lookup_field = 'slug'
  filter_backends = [filters.SearchFilter]
  search_fields = ['title', 'excerpt', 'seo_title', 'seo_description']
  pagination_class = BlogPostPagination

  def get_queryset(self):
    queryset = BlogPost.objects.published().select_related('author').prefetch_related('categories')
    category_slug = self.request.query_params.get('category')
    if category_slug:
      queryset = queryset.filter(categories__slug=category_slug)
    return queryset

  def get_serializer_class(self):
    if self.action == 'retrieve':
      return BlogPostDetailSerializer
    return super().get_serializer_class()


class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
  serializer_class = BlogCategorySerializer
  lookup_field = 'slug'
  queryset = BlogCategory.objects.all()


def blog_sitemap(request):
  posts = BlogPost.objects.published().only('slug', 'updated_at', 'published_at', 'canonical_url')
  url_entries: list[str] = []

  for post in posts:
    canonical = post.canonical_url
    if canonical and canonical.startswith('http'):
      loc = canonical
    else:
      path = canonical or post.get_absolute_url()
      loc = request.build_absolute_uri(path)

    lastmod_dt = post.updated_at or post.published_at or timezone.now()
    lastmod = lastmod_dt.date().isoformat()

    url_entries.append(
      '\n'.join([
        '  <url>',
        f'    <loc>{escape(loc)}</loc>',
        f'    <lastmod>{lastmod}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>'
      ])
    )

  xml = '\n'.join([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    *url_entries,
    '</urlset>',
    ''
  ])

  return HttpResponse(xml, content_type='application/xml')
