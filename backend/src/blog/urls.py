from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import BlogCategoryViewSet, BlogPostViewSet, blog_sitemap

app_name = 'blog'

router = DefaultRouter()
router.register('posts', BlogPostViewSet, basename='blog-posts')
router.register('categories', BlogCategoryViewSet, basename='blog-categories')

urlpatterns = [
  path('sitemap.xml', blog_sitemap, name='blog-sitemap')
]

urlpatterns += router.urls
