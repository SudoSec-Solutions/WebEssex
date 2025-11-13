from rest_framework import serializers

from .models import BlogAuthor, BlogCategory, BlogPost


class BlogCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogCategory
    fields = ['id', 'name', 'slug', 'description']


class BlogAuthorSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogAuthor
    fields = ['id', 'full_name', 'role', 'bio', 'avatar_url']


class BlogPostListSerializer(serializers.ModelSerializer):
  author = BlogAuthorSerializer()
  categories = BlogCategorySerializer(many=True)
  seo = serializers.SerializerMethodField()
  hero_image_url = serializers.SerializerMethodField()

  class Meta:
    model = BlogPost
    fields = [
      'id',
      'title',
      'slug',
      'excerpt',
      'hero_image_url',
      'reading_time_minutes',
      'published_at',
      'author',
      'categories',
      'seo'
    ]

  def get_seo(self, obj: BlogPost):
    return obj.seo_payload

  def get_hero_image_url(self, obj: BlogPost):
    url = obj.resolved_hero_image_url
    request = self.context.get('request')
    if url and obj.hero_image and request is not None:
      return request.build_absolute_uri(url)
    return url


class BlogPostDetailSerializer(BlogPostListSerializer):
  body = serializers.CharField()
  canonical_url = serializers.SerializerMethodField()
  related_posts = serializers.SerializerMethodField()

  class Meta(BlogPostListSerializer.Meta):
    fields = BlogPostListSerializer.Meta.fields + ['body', 'canonical_url', 'related_posts']

  def get_canonical_url(self, obj: BlogPost) -> str:
    return obj.canonical_url or obj.get_absolute_url()

  def get_related_posts(self, obj: BlogPost):
    related_qs = (
      BlogPost.objects.published()
      .filter(categories__in=obj.categories.values_list('pk', flat=True))
      .exclude(pk=obj.pk)
      .select_related('author')
      .prefetch_related('categories')
      .distinct()[:3]
    )
    return BlogPostListSerializer(related_qs, many=True, context=self.context).data
