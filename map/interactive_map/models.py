from django.db import models
from django.urls import reverse

# Прогноз погоды
class Weather_Report(models.Model):
    kilometers = models.ForeignKey('Kilometers', on_delete=models.PROTECT, null=True)
    date = models.DateField(null=True, verbose_name='Дата прогноза')
    time_day = models.ForeignKey('Time_Day', on_delete=models.PROTECT, null=True)
    amount_precipitation = models.IntegerField(null=True, verbose_name='Количество осадков')

# Время дня
class Time_Day(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')

# Километры железной дороги
class Kilometers(models.Model):
    name = models.IntegerField(verbose_name='Километр')
    distance = models.IntegerField(verbose_name='Протяженность')
    station = models.ForeignKey('Station', on_delete=models.PROTECT, null=True)
    start_latitude = models.DecimalField(max_digits=15,decimal_places=12, null=True, verbose_name='Широта')
    start_longitude = models.DecimalField(max_digits=15, decimal_places=12, null=True, verbose_name='Широта')

# Искуственные сооружения железной дороги
class Artificial_Construction(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    latitude = models.DecimalField(max_digits=15,decimal_places=12, null=True, verbose_name='Широта')
    longitude = models.DecimalField(max_digits=15,decimal_places=12, null=True, verbose_name='Долгота')
    media = models.ForeignKey('Media', on_delete=models.PROTECT, null=True)

    @property
    def media_link(self):
        return self.media.link

# Таблица с картинками и видео
class Media(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    link = models.FileField(verbose_name='Медиа')

    def __str__(self):
        return self.link

# Таблица станций
class Station(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    latitude = models.DecimalField(max_digits=15, decimal_places=12, null=True, verbose_name='Широта')
    longitude = models.DecimalField(max_digits=15, decimal_places=12, null=True, verbose_name='Долгота')

# Риск размыва пути
class Risk_Destroying_Path(models.Model):
    characteristic_artificial_construction = models.ForeignKey('Characteristic_Artificial_Construction', on_delete=models.PROTECT, null=True)
    weather_report = models.ForeignKey('Weather_Report', on_delete=models.PROTECT, null=True)
    risk = models.IntegerField(null=True, verbose_name='Риск размыва пути')

class Characteristic_Artificial_Construction(models.Model):
    name = models.ForeignKey('Artificial_Construction', on_delete=models.PROTECT, null=True)
    kilometers = models.ForeignKey('Kilometers', on_delete=models.PROTECT, null=True)
    type_ballast = models.ForeignKey('Type_Ballast', on_delete=models.PROTECT, null=True)
    type_rail = models.ForeignKey('Type_Rail', on_delete=models.PROTECT, null=True)
    height_embankmen = models.ForeignKey('Height_Embankmen', on_delete=models.PROTECT, null=True)
    availability_artificial_construction = models.ForeignKey('Availability_Artificial_Construction', on_delete=models.PROTECT, null=True)
    changing_watercours = models.ForeignKey('Changing_Watercours', on_delete=models.PROTECT, null=True)
    condition_drainage_ditches = models.ForeignKey('Condition_Drainage_Ditches', on_delete=models.PROTECT, null=True)
    dams = models.ForeignKey('Dams', on_delete=models.PROTECT, null=True)
    strengthening_bridge_cones = models.ForeignKey('Strengthening_Bridge_Cones', on_delete=models.PROTECT, null=True)
    condition_culvert_capacity = models.ForeignKey('Condition_Culvert_Capacity', on_delete=models.PROTECT, null=True)
    catchment_area = models.ForeignKey('Catchment_Area', on_delete=models.PROTECT, null=True)
    terrain = models.ForeignKey('Terrain', on_delete=models.PROTECT, null=True)
    water_flow_rate = models.ForeignKey('Water_Flow_Rate', on_delete=models.PROTECT, null=True)
    water_flow_direction = models.ForeignKey('Water_Flow_Direction', on_delete=models.PROTECT, null=True)
    cross_country_roads = models.ForeignKey('Cross_Country_Roads', on_delete=models.PROTECT, null=True)
    sufficiency = models.ForeignKey('Sufficiency', on_delete=models.PROTECT, null=True)
    work_experience = models.ForeignKey('Work_Experience', on_delete=models.PROTECT, null=True)

# Вид балласта
class Type_Ballast(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название типа балласта')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Тип шпал
class Type_Rail(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название типа шпал')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Высота насыпи
class Height_Embankmen(models.Model):
    name = models.CharField(max_length=255, verbose_name='Диапозон высоты насыпи')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Наличие ИССО
class Availability_Artificial_Construction(models.Model):
    name = models.CharField(max_length=255, verbose_name='Наличие ИССО')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Изменение естественного характера водотока относительно ж.д. за счет строительства автодороги
class Changing_Watercours(models.Model):
    name = models.CharField(max_length=255, verbose_name='Изменение естественного характера водотока')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Состояние водоотводных канав
class Condition_Drainage_Ditches(models.Model):
    name = models.CharField(max_length=255, verbose_name='Состояние водоотводных канав')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Водораздельные и водооградительные дамбы
class Dams(models.Model):
    name = models.CharField(max_length=255, verbose_name='Водораздельные и водооградительные дамбы')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Укрепления конусов мостов (каменное мощение труб)
class Strengthening_Bridge_Cones(models.Model):
    name = models.CharField(max_length=255, verbose_name='Укрепления конусов мостов')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Состояние ИССО по водопропускной способности
class Condition_Culvert_Capacity(models.Model):
    name = models.CharField(max_length=255, verbose_name='Состояние ИССО по водопропускной способности')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Площадь водосбора
class Catchment_Area(models.Model):
    name = models.CharField(max_length=255, verbose_name='Площадь водосбора')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Рельеф местности с уклонами к ж.д. пути, ‰
class Terrain(models.Model):
    name = models.CharField(max_length=255, verbose_name='Рельеф местности с уклонами')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Скорость потока воды
class Water_Flow_Rate(models.Model):
    name = models.CharField(max_length=255, verbose_name='Скорость потока воды')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Направление потока воды к насыпи ж.д.
class Water_Flow_Direction(models.Model):
    name = models.CharField(max_length=255, verbose_name='Направление потока воды')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Наличие притрассовых автодорог
class Cross_Country_Roads(models.Model):
    name = models.CharField(max_length=255, verbose_name='Наличие притрассовых автодорог')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Обеспеченность материалами и инструментом для водоборьбы
class Sufficiency(models.Model):
    name = models.CharField(max_length=255, verbose_name='Обеспеченность материалами и инструментом для водоборьбы')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')

# Стаж работы ПД
class Work_Experience(models.Model):
    name = models.CharField(max_length=255, verbose_name='Стаж работы')
    ratio = models.DecimalField(max_digits=3, decimal_places=2, verbose_name='Веса')
    risk = models.IntegerField(verbose_name='Риск')