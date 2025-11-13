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
