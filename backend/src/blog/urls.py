from rest_framework.routers import DefaultRouter

from .views import BlogCategoryViewSet, BlogPostViewSet

app_name = 'blog'

router = DefaultRouter()
router.register('posts', BlogPostViewSet, basename='blog-posts')
router.register('categories', BlogCategoryViewSet, basename='blog-categories')

urlpatterns = router.urls
