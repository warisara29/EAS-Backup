from django.db import models

# Create your models here.

class tblPoint(models.Model):
    PointID = models.IntegerField()
    PointName = models.CharField(max_length=300)
    UnitName = models.CharField(max_length=20)
    SystemName = models.CharField(max_length=50)
    Operation = models.CharField(max_length=50)
    PointDescription = models.CharField(max_length=500)
    PointType = models.CharField(max_length=20)

class tblTrendAnalog(models.Model):
    PointID = models.IntegerField()
    PointDate = models.IntegerField()
    ActualValue = models.IntegerField()


class DatePicker(models.Model) :
    date1 = models.CharField(max_length=100)
    date2 = models.CharField(max_length=100)
