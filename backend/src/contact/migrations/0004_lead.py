from django.db import migrations, models


class Migration(migrations.Migration):

  dependencies = [
    ('contact', '0003_workshoprequest'),
  ]

  operations = [
    migrations.CreateModel(
      name='Lead',
      fields=[
        ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        ('created_at', models.DateTimeField(auto_now_add=True)),
        ('updated_at', models.DateTimeField(auto_now=True)),
        ('name', models.CharField(max_length=150)),
        ('email', models.EmailField(max_length=254)),
        ('phone', models.CharField(blank=True, max_length=30)),
        ('company', models.CharField(blank=True, max_length=150)),
        ('plan', models.CharField(max_length=60)),
        ('message', models.TextField(blank=True)),
      ],
      options={
        'ordering': ['-created_at'],
      },
    ),
  ]
