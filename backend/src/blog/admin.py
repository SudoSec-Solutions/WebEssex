from django.contrib import admin

from .models import BlogAuthor, BlogCategory, BlogPost


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
  list_display = ('name', 'slug', 'description', 'created_at')
  search_fields = ('name', 'slug', 'description')
  prepopulated_fields = {'slug': ('name',)}
  readonly_fields = ('created_at', 'updated_at')


@admin.register(BlogAuthor)
class BlogAuthorAdmin(admin.ModelAdmin):
  list_display = ('full_name', 'role', 'updated_at')
  search_fields = ('full_name', 'role')
  readonly_fields = ('created_at', 'updated_at')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
  list_display = ('title', 'status', 'published_at', 'reading_time_minutes')
  list_filter = ('status', 'published_at', 'categories')
  search_fields = ('title', 'excerpt', 'body', 'seo_title', 'seo_description')
  prepopulated_fields = {'slug': ('title',)}
  filter_horizontal = ('categories',)
  readonly_fields = ('created_at', 'updated_at', 'reading_time_minutes')
  fieldsets = (
    ('Content', {
      'fields': ('title', 'slug', 'excerpt', 'body', 'hero_image', 'hero_image_url', 'author', 'categories')
    }),
    ('Publishing', {
      'fields': ('status', 'published_at', 'reading_time_minutes')
    }),
    ('SEO', {
      'fields': ('canonical_url', 'seo_title', 'seo_description', 'seo_keywords')
    }),
    ('Metadata', {
      'fields': ('created_at', 'updated_at')
    })
  )
