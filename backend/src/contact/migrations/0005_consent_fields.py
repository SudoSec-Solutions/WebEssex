from django.db import migrations, models


class Migration(migrations.Migration):

  dependencies = [
    ('contact', '0004_lead'),
  ]

  operations = [
    migrations.AddField(
      model_name='contactsubmission',
      name='consent_privacy',
      field=models.BooleanField(default=False),
    ),
    migrations.AddField(
      model_name='lead',
      name='consent_privacy',
      field=models.BooleanField(default=False),
    ),
    migrations.AddField(
      model_name='subscription',
      name='consent',
      field=models.BooleanField(default=False),
    ),
  ]
