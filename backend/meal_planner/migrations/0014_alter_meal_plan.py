# Generated by Django 4.0.1 on 2022-04-06 14:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('meal_planner', '0013_rename_date_meal_day_rename_name_meal_meal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='plan',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meals', to='meal_planner.plan'),
        ),
    ]
