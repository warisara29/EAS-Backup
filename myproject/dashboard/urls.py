from django.urls import path
from .views import Home, getDB, getDataPie, ConsumptionAnalysis, consumptionData, SelectOption, PowerHistory, PowerHistoryData, Test
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('', Home),
    path('home/', Home),
    path('db/', getDB),
    path('dbPie/', getDataPie),
    path('consumptionAnalysis/', ConsumptionAnalysis),
    path('consumptionData/', consumptionData),
    path('SelectOption/', SelectOption),
    path('PowerHistory/', PowerHistory),
    path('PowerHistoryData/', PowerHistoryData),
    path('test/', Test),
    #path('date-picker', DatePicker, name = 'DatePicker'),
]


