from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
import pyodbc
from json import encoder, JSONDecoder, JSONEncoder
import json
import decimal
from collections import defaultdict, Iterable
# from .forms import DatePickerForm
import json
from datetime import datetime, date, timedelta
import time
from operator import itemgetter 
import re
import cgi, os
import cgitb; cgitb.enable()
from . import forms
import os
import calendar
import requests
import pandas as pd 



# Create your views here.

def Home(request):
    # return HttpResponse('<h1>hello world</h1>')

    if request.method == "POST":

        if 'date' in request.POST:
            date1 = request.POST.get('date1')
            date2 = request.POST.get('date2')

            if (request.POST.get('select') == 'daily') :

                datePeroid = 'daily'

                if (date1 and date2):
                    Home.getDate1 = date1
                    Home.getDate2 = date2

                else:
                #     # if ( date1 and date2) == "" :
                #         # REMOVE COMMENT AFTER GET REAL DATA ###################################
                    setDate2 = date.today() - timedelta(1)
                    setDate = "2020-08-06"
                    setDate2 = datetime.strptime(setDate, '%Y-%m-%d')
                    print(setDate2)
                    days = timedelta(days=5)
                    setDate1 = setDate2 - days
                    print("default date ", setDate1, setDate2)

                    date1 = str(setDate1)
                    date2 = str(setDate2)

                    Home.getDate1 = date1
                    Home.getDate2 = date2

                Home.datePeroid = datePeroid
            
            elif (request.POST.get('select') == 'weekly') :
            #     print("weekly",request.POST.get('select'))
                datePeroid = 'weekly'
                if (date1 and date2):
                    Home.getDate1 = date1
                    Home.getDate2 = date2

                else:
                #     # if ( date1 and date2) == "" :
                #         # REMOVE COMMENT AFTER GET REAL DATA ###################################
                    setDate2 = date.today() - timedelta(1)
                    setDate = "2020-08-06"
                    setDate2 = datetime.strptime(setDate, '%Y-%m-%d')
                    print(setDate2)
                    days = timedelta(days=5)
                    setDate1 = setDate2 - days
                    print("default date ", setDate1, setDate2)

                    date1 = str(setDate1)
                    date2 = str(setDate2)

                    Home.getDate1 = date1
                    Home.getDate2 = date2

                Home.datePeroid = datePeroid
                
            #     if (date1 and date2):
            #         Home.getDate1 = date1
            #         Home.getDate2 = date2

            #         # test = date1 - datetime.timedelta()
                    
            #     elif date1 == "" and date2 != "" :
            #         getDate1 = datetime.strptime(date2, '%Y-%m-%d') - timedelta(weeks=7)
            #         date1 = datetime.strftime(getDate1, '%Y-%m-%d')
            #         print("date1", date1)
            #         Home.getDate1 = date1
            #         Home.getDate2 = date2
            #         print("day1 null", date1, date2)

            #     else :
            #         date2 = '2020-08-06' #datetime now later
            #         getDate1 = datetime.strptime(date2, '%Y-%m-%d') - timedelta(weeks=7)
            #         date1 = datetime.strftime(getDate1, '%Y-%m-%d')
            #         Home.getDate1 = date1
            #         Home.getDate1 = date2

                # Home.getDate1 = date1
                # Home.getDate2 = date2
                # sending get request and saving the response as response object 
                # URL = "http://10.7.117.5/api/workweek"
                # PARAMS = {'range': 1, 'date1': date1, 'date2': date2}
                # r = requests.get(url = URL, params = PARAMS)
                # # r = requests.get(url= URL)
                # data = r.json()
                # Home.Data = data
                # print("data",data)

            elif (request.POST.get('select') == 'monthly') :
                datePeroid = 'monthly'
                if (date1 and date2):
                    Home.getDate1 = date1
                    Home.getDate2 = date2

                else:
                #     # if ( date1 and date2) == "" :
                #         # REMOVE COMMENT AFTER GET REAL DATA ###################################
                    setDate2 = date.today() - timedelta(1)
                    setDate = "2020-08-06"
                    setDate2 = datetime.strptime(setDate, '%Y-%m-%d')
                    print(setDate2)
                    days = timedelta(days=5)
                    setDate1 = setDate2 - days
                    print("default date ", setDate1, setDate2)

                    date1 = str(setDate1)
                    date2 = str(setDate2)

                    Home.getDate1 = date1
                    Home.getDate2 = date2

                Home.datePeroid = datePeroid
            #     print("monthly",request.POST.get('select'))
            #     if (date1 and date2):
            #         getDate1 = [date1[:4],date1[5:7]]
            #         getDate2 = [date2[:4],date2[5:7]]
            #         print(getDate1,getDate2)
            #         monthList = []
            #         numofmonth = []
            #         first_day = []
            #         for i in range(int(getDate1[1]), int(getDate2[1])) :
            #             print(i)
            #             # num_days1 = 
            #             numofmonth.append(i)
            #             first_day_of_month = datetime(int(date1[:4]),i,int(1))
            #             first_day.append(first_day_of_month)
            #             monthList.append(calendar.monthrange(int(getDate1[0]), i)[1])
            #         # num_days2 = calendar.monthrange(int(getDate2[0]),int(getDate2[1]))[1]
            #         print("month", monthList,first_day)
            #         for i in range(len(monthList)) :
            #             last_day_of_month = datetime(int(date1[:4]),numofmonth[i],monthList[i])
            #             print(monthList[i])
            #             print(last_day_of_month)
                    
                    # last_date = datetime(int(date1[:4]),int(date1[5:7]),int(num_days1))
                    # print("date",last_date,first_day_of_month)

            #     elif date1 == "" and date2 != "" :
            #         Home.getDate2 = date2
            #         date1 = datetime.strptime(date2, '%Y-%m-%d') - timedelta(weeks=7)
            #         Home.getDate1 = date1
            #         print("day1 null", date1, date2)

            #     else :
            #         Home.getDate2 = '2020-08-06' #datetime now later
            #         date1 = datetime.strptime(date2, '%Y-%m-%d') - timedelta(weeks=7)
            #         Home.getDate1 = date1

            #     Home.getDate1 = date1
            #     Home.getDate2 = date2

        elif 'check' in request.POST:
            guideline = request.POST.get('guideline')

            if (guideline):

                Home.getGuideline = guideline

            else:
                guideline = 65000
                Home.getGuideline = guideline

        else:
            setDate2 = date.today() - timedelta(1)
            setDate = "2020-08-06"
            setDate2 = datetime.strptime(setDate, '%Y-%m-%d')
            print(setDate2)
            days = timedelta(days=5)
            setDate1 = setDate2 - days
            print("default date ", setDate1, setDate2)

            date1 = str(setDate1)
            date2 = str(setDate2)

            Home.getDate1 = date1
            Home.getDate2 = date2

            guideline = 65000
            Home.getGuideline = guideline

    else:
        setDate2 = date.today() - timedelta(1)
        setDate = "2020-08-06"
        setDate2 = datetime.strptime(setDate, '%Y-%m-%d')
        print(setDate2)
        days = timedelta(days=5)
        setDate1 = setDate2 - days
        print("default date ", setDate1, setDate2)

        date1 = str(setDate1)
        date2 = str(setDate2)

        Home.getDate1 = date1
        Home.getDate2 = date2

        guideline = 65000
        Home.getGuideline = guideline
        Home.datePeroid = "datePeroid"

    return render(request, 'dashboard/template.html')


def getDB(request):

    object_result = {}

    object_resultP = {}

    date1 = (Home.getDate1)
    date2 = (Home.getDate2)
    datePeroid  = (Home.datePeroid)
    print("date peroid ",datePeroid)

    workweek = []
    common_seagate_workweek = []
    fix_drive_workweek = []
    var_drive_workweek = []
    fix_hsa_workweek = []
    var_hsa_workweek = []
    fix_slider_workweek = []
    var_slider_workweek = []
    # print(date1, date2)
    # data = Home.Data
    # print("dataaaaa", data)
    if (datePeroid == 'daily') :
        server = 'localhost\SQLEXPRESS'
        database = 'ION'
        username = 'sa'
        password = 'sa1234'
        conn = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER="+server+";DATABASE="+database+";UID="+username+";PWD=" + password)
        cursor = conn.cursor()
        cursor.execute("select tblPoint.PointID, tblPoint.PointName, tblPoint.UnitName, tblPoint.Operation, tblPoint.PointType, tblTrendAnalog.ActualValue, tblTrendAnalog.PointDate from tblPoint inner join tblTrendAnalog on tblPoint.PointID = tblTrendAnalog.PointID where tblTrendAnalog.PointDate >= '" +
                    date1+"'  and tblTrendAnalog.PointDate <= '"+date2+"' and tblPoint.PointType = 'PRIMARY' order by tblTrendAnalog.PointDate asc ")
        result = cursor.fetchall()

        y = len(result)
        print(y)

        data_list = []

        for data in result:
            test = data.PointDate
            # print(test)
            timeStamp = test.strftime("%Y-%m-%d")
            # print(timeStamp)
            t = (data.PointID, data.PointName, data.UnitName,
                data.Operation, data.PointType, timeStamp, data.ActualValue)
            data_list.append(t)

        j = json.dumps(data_list)
        k = json.loads(j)

        a = []
        b = []
        c = []
        d = []
        e = []
        f = []
        g = []

        object_dic = {}

        series_list = []

        dates_dic = {}

        dates_list = []

        summation_dic = {}

        summation_list = []

        pointDate = {}

        allPointDate = []

        for data in result:
            dateText = data.PointDate.strftime("%d %B")
            date = data.PointDate
            dates_dic[date] = {}
            dates_dic[date] = dateText
            dates_list.append(dates_dic)

            value = float("{:.2f}".format(data.ActualValue))

            pointDate = {}
            pointDate['date'] = dates_list
            pointDate['value'] = value
            allPointDate.append(pointDate)

            # summation_dic = {}
            # summation_dic[dateText] = data.ActualValue
            # summation_list.append(summation_dic)
            # print(summation_list)

            if (data.PointName == "COMMON_seagate"):
                decA = float("{:.2f}".format(data.ActualValue))
                a.append(decA)
                sumA = sum(a)
                # print(a)

                object_dic['series1'] = {}
                object_dic['series1']['name'] = data.PointName
                object_dic['series1']['type'] = 'column'
                object_dic['series1']['index'] = 0
                object_dic['series1']['data'] = a
                series_list.append(object_dic['series1'])

            if (data.PointName == "FIX_drive"):
                decA = float("{:.2f}".format(data.ActualValue))
                b.append(decA)
                sumB = sum(b)
                # b.append(data.ActualValue)
                object_dic['series2'] = {}
                object_dic['series2']['name'] = data.PointName
                object_dic['series2']['type'] = 'column'
                object_dic['series2']['index'] = 1
                object_dic['series2']['data'] = b
                series_list.append(object_dic['series2'])

            if (data.PointName == "VAR_drive"):

                decA = float("{:.2f}".format(data.ActualValue))
                c.append(decA)
                sumC = sum(c)
                object_dic['series3'] = {}
                object_dic['series3']['name'] = data.PointName
                object_dic['series3']['type'] = 'column'
                object_dic['series3']['index'] = 2
                object_dic['series3']['data'] = c

                series_list.append(object_dic['series3'])

            if (data.PointName == "FIX_hsa"):
                decA = float("{:.2f}".format(data.ActualValue))
                d.append(decA)
                sumD = sum(d)
                object_dic['series4'] = {}
                object_dic['series4']['name'] = data.PointName
                object_dic['series4']['type'] = 'column'
                object_dic['series4']['index'] = 3
                object_dic['series4']['data'] = d

                series_list.append(object_dic['series4'])

                #print("test print!!",series_list)

            if (data.PointName == "VAR_hsa"):
                decA = float("{:.2f}".format(data.ActualValue))
                e.append(decA)
                sumE = sum(g)
                object_dic['series5'] = {}
                object_dic['series5']['name'] = data.PointName
                object_dic['series5']['type'] = 'column'
                object_dic['series5']['index'] = 4
                object_dic['series5']['data'] = e

                series_list.append(object_dic['series5'])

            if (data.PointName == "FIX_slider"):
                decA = float("{:.2f}".format(data.ActualValue))
                f.append(decA)
                sumF = sum(f)
                object_dic['series6'] = {}
                object_dic['series6']['name'] = data.PointName
                object_dic['series6']['type'] = 'column'
                object_dic['series6']['index'] = 5
                object_dic['series6']['data'] = f

                series_list.append(object_dic['series6'])

            if (data.PointName == "VAR_slider"):
                decA = float("{:.2f}".format(data.ActualValue))
                g.append(decA)
                sumG = sum(g)
                object_dic['series7'] = {}
                object_dic['series7']['name'] = data.PointName
                object_dic['series7']['type'] = 'column'
                object_dic['series7']['index'] = 6
                object_dic['series7']['data'] = g
                series_list.append(object_dic['series7'])

    elif (datePeroid == 'weekly') :
        print("hi")
        # print("driver",pyodbc.drivers())
        # sending get request and saving the response as response object 
        URL = "http://10.7.117.5/api/workweek"
        PARAMS = {'range': 3, 'date1': date1}
        r = requests.get(url = URL, params = PARAMS)
        # r = requests.get(url= URL)
        print("r", r)
        data = r.json()
        Home.Data = data
        print("data",data)

        URL = "http://10.7.117.5/api/workweek"
        PARAMS = {'range': 3, 'date1': date2}
        r = requests.get(url = URL, params = PARAMS)
        # r = requests.get(url= URL)
        data2 = r.json()
        Home.Data = data2
        print("data",data2)

        date1 = data[0]
        date2 = data2[6]
        print("date1 ", date1)
        print("date2 ", type(date2))
        server = 'localhost\SQLEXPRESS'
        database = 'ION'
        username = 'sa'
        password = 'sa1234'
        conn = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER="+server+";DATABASE="+database+";UID="+username+";PWD=" + password)
        cursor = conn.cursor()
        cursor.execute("select tblPoint.PointID, tblPoint.PointName, tblPoint.UnitName, tblPoint.Operation, tblPoint.PointType, tblTrendAnalog.ActualValue, tblTrendAnalog.PointDate from tblPoint inner join tblTrendAnalog on tblPoint.PointID = tblTrendAnalog.PointID where tblTrendAnalog.PointDate >= '" +
                    date1+"'  and tblTrendAnalog.PointDate <= '"+date2+"' and tblPoint.PointType = 'PRIMARY' order by tblTrendAnalog.PointDate asc ")
        result = cursor.fetchall()

        y = len(result)
        print(y)

        data_list = []
        test_list = []

        date_list = {}

        URL = "http://10.7.117.5/api/workweek"

        for data in result:
            # test = data.PointDate
            workweek = datetime.strftime(data.PointDate, '%Y-%m-%d')
            # print("workweek ", type(workweek))

        # print("work week ", workweek)
            PARAMS = {'range': 0, 'date1': workweek}
            r = requests.get(url = URL, params = PARAMS)
            testData = r.json()

            # print("test data ", testData['obj'])
            date_list['data'] = [{"value" : [{str(testData['obj'][0])+" "+str(testData['obj'][1]) : float("{:.2f}".format(data.ActualValue))}], "pointname" : data.PointName, "date" : workweek}]
            test_list.append(date_list['data'])
            # r = requests.get(url= URL)
                
        common_seagate = []
        fix_drive = []
        var_drive = []
        fix_hsa = []
        var_hsa = []
        fix_slider = []
        var_slider = []

        for i in range(len(test_list)) :
            
            if (test_list[i][0]['pointname'] == "COMMON_seagate") :
                common_seagate.append(test_list[i][0])
                
            elif (test_list[i][0]['pointname'] == "FIX_drive") :
                fix_drive.append(test_list[i][0])

            elif (test_list[i][0]['pointname'] == "VAR_drive") :
                var_drive.append(test_list[i][0])

            elif (test_list[i][0]['pointname'] == "FIX_hsa") :
                fix_hsa.append(test_list[i][0])

            elif (test_list[i][0]['pointname'] == "VAR_hsa") :
                var_hsa.append(test_list[i][0])

            elif (test_list[i][0]['pointname'] == "FIX_slider") :
                fix_slider.append(test_list[i][0])

            elif (test_list[i][0]['pointname'] == "VAR_slider") :
                var_slider.append(test_list[i][0])

        # print("common", common_seagate)
        # print("fd ", fix_drive)
        # print("vd ", var_drive)
        # print("fh", fix_hsa)
        # print("vh", var_hsa)
        # print("fs", fix_slider)
        # print("vs", var_slider)

        fix_drive_dict = dict()
        for i in fix_drive :
            # print("i", i)
            if i['pointname'] not in fix_drive_dict :
                fix_drive_dict["pointname"] = i['pointname']

            for key in i['value'][0] :
                # print("key", key)
                if key in fix_drive_dict :
                    fix_drive_dict[key].append(i['value'][0][key])
                else :
                    fix_drive_dict[key] = [i['value'][0][key]]   
        # print("value ",fix_drive_dict)

        for key in fix_drive_dict : 
            print("key ",key)
            if key != 'pointname' :
                # print("test ",common_seagate_dict[key])
                fix_drive_dict[key] = float("{:.2f}".format(sum(fix_drive_dict[key])))
                # print("test2 ", test)
        # print("value2 ",fix_drive_dict)
                fix_drive_workweek.append(fix_drive_dict[key])

        var_drive_dict = dict()
        for i in var_drive :
            # print("i", i["value"])
            if i['pointname'] not in var_drive_dict :
                var_drive_dict["pointname"] = i['pointname']

            for key in i['value'][0] :
                # print("key", key)
                if key in var_drive_dict :
                    var_drive_dict[key].append(i['value'][0][key])
                else :
                    var_drive_dict[key] = [i['value'][0][key]]
        # print("value ",var_drive_dict)

        for key in var_drive_dict : 
            # print("key ",key)
            if key != 'pointname' :
                # print("test ",common_seagate_dict[key])
                var_drive_dict[key] = float("{:.2f}".format(sum(var_drive_dict[key])))
                # print("test2 ", test)
                # print("value2 ",var_drive_dict)
                var_drive_workweek.append(var_drive_dict[key])

        fix_hsa_dict = dict()
        for i in fix_hsa :
            # print("i", i["value"])
            if i['pointname'] not in fix_hsa_dict :
                fix_hsa_dict["pointname"] = i['pointname']

            for key in i['value'][0] :
                # print("key", key)
                if key in fix_hsa_dict :
                    fix_hsa_dict[key].append(i['value'][0][key])
                else :
                    fix_hsa_dict[key] = [i['value'][0][key]]
        # print("value ",fix_hsa_dict)

        for key in fix_hsa_dict : 
            # print("key ",key)
            if key != 'pointname' :
                # print("test ",common_seagate_dict[key])
                fix_hsa_dict[key] = float("{:.2f}".format(sum(fix_hsa_dict[key])))
                # print("test2 ", test)
            # print("value2 ",fix_hsa_dict)
                fix_hsa_workweek.append(fix_hsa_dict[key])

        var_hsa_dict = dict()
        for i in var_hsa :
            # print("i", i["value"])
            if i['pointname'] not in var_hsa_dict :
                var_hsa_dict["pointname"] = i['pointname']

            for key in i['value'][0] :
                # print("key", key)
                if key in var_hsa_dict :
                    var_hsa_dict[key].append(i['value'][0][key])
                else :
                    var_hsa_dict[key] = [i['value'][0][key]]
        # print("value ",var_hsa_dict)

        for key in var_hsa_dict : 
            # print("key ",key)
            if key != 'pointname' :
                # print("test ",common_seagate_dict[key])
                var_hsa_dict[key] = float("{:.2f}".format(sum(var_hsa_dict[key])))
                # print("test2 ", test)
        # print("value2 ",var_hsa_dict)
                var_hsa_workweek.append(var_hsa_dict[key])

        fix_slider_dict = dict()
        for i in fix_slider :
            # print("i", i["value"])
            if i['pointname'] not in fix_slider_dict :
                fix_slider_dict["pointname"] = i['pointname']

            for key in i['value'][0] :
                # print("key", key)
                if key in fix_slider_dict :
                    fix_slider_dict[key].append(i['value'][0][key])
                else :
                    fix_slider_dict[key] = [i['value'][0][key]]
        # print("value ",fix_slider_dict)

        for key in fix_slider_dict : 
            # print("key ",key)
            if key != 'pointname' :
                # print("test ",common_seagate_dict[key])
                fix_slider_dict[key] = float("{:.2f}".format(sum(fix_slider_dict[key])))
                # print("test2 ", test)
        # print("value2 ",fix_slider_dict)
                fix_slider_workweek.append(fix_slider_dict[key])

        var_slider_dict = dict()
        for i in var_slider :
            # print("i", i["value"])
            if i['pointname'] not in var_slider_dict :
                var_slider_dict["pointname"] = i['pointname']

            for key in i['value'][0] :
                # print("key", key)
                if key in var_slider_dict :
                    var_slider_dict[key].append(i['value'][0][key])
                else :
                    var_slider_dict[key] = [int(i['value'][0][key])]
        # print("value ",var_slider_dict)

        for key in var_slider_dict : 
            # print("key ",key)
            if key != 'pointname' :
                # print("test ",common_seagate_dict[key])
                var_slider_dict[key] = float("{:.2f}".format(sum(var_slider_dict[key])))
                # print("test2 ", test)
        # print("value2 ",var_slider_dict)
                var_slider_workweek.append(var_slider_dict[key])

        common_seagate_dict = dict()
        for i in common_seagate :
            # print("i", i["value"])
            if i['pointname'] not in common_seagate_dict :
                common_seagate_dict["pointname"] = i['pointname']

            for key in i['value'][0] :
                # print("key", key)
                if key in common_seagate_dict :
                    common_seagate_dict[key].append(i['value'][0][key])
                else :
                    common_seagate_dict[key] = [i['value'][0][key]]

        # print("value ",common_seagate_dict)

        for key in common_seagate_dict : 
            # print("key ",key)
            if key != 'pointname' :
                # print("test ",common_seagate_dict[key])
                common_seagate_dict[key] = float("{:.2f}".format(sum(common_seagate_dict[key])))
                # print("test2 ", test)
        # print("value2 ",common_seagate_dict)
                common_seagate_workweek.append(common_seagate_dict[key])

        workweekList = []
        for key in common_seagate_dict :
            if (key != 'pointname') :
                key = "FY"+key[2:4]+"WW"+key[5:]
                workweekList.append(key)
            # print(key)

        print("workweek ", workweekList)
        workweek = workweekList

# OLD THING       
    #     # a = []
    #     # b = []
    #     # c = []
    #     # d = []
    #     # e = []
    #     # f = []
    #     # g = []

    #     # object_dic = {}

    #     # series_list = []

    #     # dates_dic = {}

    #     # dates_list = []

    #     # summation_dic = {}

    #     # summation_list = []

    #     # pointDate = {}

    #     # allPointDate = []

    #     # for data in result:
    #     #     dateText = data.PointDate.strftime("%d %B")
    #     #     date = data.PointDate
    #     #     dates_dic[date] = {}
    #     #     dates_dic[date] = dateText
    #     #     dates_list.append(dates_dic)

    #     #     value = float("{:.2f}".format(data.ActualValue))

    #     #     pointDate = {}
    #     #     pointDate['date'] = dates_list
    #     #     pointDate['value'] = value
    #     #     allPointDate.append(pointDate)

    #     #     # summation_dic = {}
    #     #     # summation_dic[dateText] = data.ActualValue
    #     #     # summation_list.append(summation_dic)
    #     #     # print(summation_list)

    #     #     if (data.PointName == "COMMON_seagate"):
    #     #         decA = float("{:.2f}".format(data.ActualValue))
    #     #         a.append(decA)
    #     #         sumA = sum(a)
    #     #         # print(a)

    #     #         object_dic['series1'] = {}
    #     #         object_dic['series1']['name'] = data.PointName
    #     #         object_dic['series1']['type'] = 'column'
    #     #         object_dic['series1']['index'] = 0
    #     #         object_dic['series1']['data'] = a
    #     #         series_list.append(object_dic['series1'])

    #     #     if (data.PointName == "FIX_drive"):
    #     #         decA = float("{:.2f}".format(data.ActualValue))
    #     #         b.append(decA)
    #     #         sumB = sum(b)
    #     #         # b.append(data.ActualValue)
    #     #         object_dic['series2'] = {}
    #     #         object_dic['series2']['name'] = data.PointName
    #     #         object_dic['series2']['type'] = 'column'
    #     #         object_dic['series2']['index'] = 1
    #     #         object_dic['series2']['data'] = b
    #     #         series_list.append(object_dic['series2'])

    #     #     if (data.PointName == "VAR_drive"):

    #     #         decA = float("{:.2f}".format(data.ActualValue))
    #     #         c.append(decA)
    #     #         sumC = sum(c)
    #     #         object_dic['series3'] = {}
    #     #         object_dic['series3']['name'] = data.PointName
    #     #         object_dic['series3']['type'] = 'column'
    #     #         object_dic['series3']['index'] = 2
    #     #         object_dic['series3']['data'] = c

    #     #         series_list.append(object_dic['series3'])

    #     #     if (data.PointName == "FIX_hsa"):
    #     #         decA = float("{:.2f}".format(data.ActualValue))
    #     #         d.append(decA)
    #     #         sumD = sum(d)
    #     #         object_dic['series4'] = {}
    #     #         object_dic['series4']['name'] = data.PointName
    #     #         object_dic['series4']['type'] = 'column'
    #     #         object_dic['series4']['index'] = 3
    #     #         object_dic['series4']['data'] = d

    #     #         series_list.append(object_dic['series4'])

    #     #         #print("test print!!",series_list)

    #     #     if (data.PointName == "VAR_hsa"):
    #     #         decA = float("{:.2f}".format(data.ActualValue))
    #     #         e.append(decA)
    #     #         sumE = sum(g)
    #     #         object_dic['series5'] = {}
    #     #         object_dic['series5']['name'] = data.PointName
    #     #         object_dic['series5']['type'] = 'column'
    #     #         object_dic['series5']['index'] = 4
    #     #         object_dic['series5']['data'] = e

    #     #         series_list.append(object_dic['series5'])

    #     #     if (data.PointName == "FIX_slider"):
    #     #         decA = float("{:.2f}".format(data.ActualValue))
    #     #         f.append(decA)
    #     #         sumF = sum(f)
    #     #         object_dic['series6'] = {}
    #     #         object_dic['series6']['name'] = data.PointName
    #     #         object_dic['series6']['type'] = 'column'
    #     #         object_dic['series6']['index'] = 5
    #     #         object_dic['series6']['data'] = f

    #     #         series_list.append(object_dic['series6'])

    #     #     if (data.PointName == "VAR_slider"):
    #     #         decA = float("{:.2f}".format(data.ActualValue))
    #     #         g.append(decA)
    #     #         sumG = sum(g)
    #     #         object_dic['series7'] = {}
    #     #         object_dic['series7']['name'] = data.PointName
    #     #         object_dic['series7']['type'] = 'column'
    #     #         object_dic['series7']['index'] = 6
    #     #         object_dic['series7']['data'] = g
    #     #         series_list.append(object_dic['series7'])

    # print(sumA, sumB, sumC, sumD, sumE, sumF, sumG)
    # print("g is ", g[0])
    # lenA = len(a)
    # sumV_list = []
    # for i in range(0, lenA):
    #     sumV = float("{:.2f}".format(
    #         a[i] + b[i] + c[i] + d[i] + e[i] + f[i] + g[i]))
    #     print("sum is ", sumV)
    #     sumV_list.append(sumV)
    #     i = i + 1

    # print("sum list ", sumV_list)

    # # print(object_dic)
    # # print(dates_dic)
    # # print("series ",series_list)

    # #      plotLines: [{
    # #     color: '#14bf4d',
    # #     width: 5,
    # #     value: 50000,
    # #   }],

    # #print("datelist ",dates_list)

    # # print(dates_list)
    # # print(allPointDate)

    # ########################## SUMVALUE BY EACH DATE #########################################

    # # get_date_list = []
    # # value_list = []

    # # for data in result :
    # #     print("data", data)

    # #     get_date = data.PointDate.strftime("%Y-%d-%m")

    # #     get_value = data.ActualValue

    # #     value_list.append(get_value)

    # #     get_date_object = {}
    # #     get_date_object[get_date] = sum(value_list)
    # #     get_date_list.append(get_date_object)

    # # print("date list",get_date_list)
    # # print("datel list type ", type(get_date_list))

    # # d_list = []

    # # for dateL in get_date_list :
    # #     d_list.append(dateL)

    # #print("d list ",d_list)

    # ######################## PLOT LINE CHARTS ##############################################
    # plotLines = {}
    # plotLines['color'] = 'red'
    # plotLines['width'] = 4
    # plotLines['value'] = Home.getGuideline
    # plotLines['dashStyle'] = 'line'
    # plotLines['zIndex'] = 5

    # # print("plot line ", plotLines)

    # sumDate = {}
    # sumDate['date1'] = str(date1)
    # sumDate['date2'] = str(date2)

    # ######################### FOR LINE CHART ON TOP OF STACK ##############################################
    # # marker = {}
    # # marker['lineWidth'] = 2
    # # marker['lineColor'] = 'blue'
    # # marker['fillColor'] = 'red'

    # # print('marker ', marker)

    # # lineWidth: 5
    # #lineWidth: 4

    # object_dic['series8'] = {}
    # object_dic['series8']['name'] = 'Total'
    # object_dic['series8']['type'] = 'spline'
    # object_dic['series8']['data'] = sumV_list

    # # object_dic['series8']['marker'] = marker
    # series_list.append(object_dic['series8'])

    # series_object = []
    # for arrList in object_dic:
    #     # print(arrList)
    #     series_object.append(object_dic[arrList])

    # # print("series list",series_list)
    # # print("type alldate", type(series_list))

    # # # test = series_object.split("[", "]")
    # # print("dict ", series_object)

    # allDate_list = []
    # for datelist in dates_dic:
    #     allDate_list.append(dates_dic[datelist])

    # date_len = len(allDate_list)
    # getDB.dateLen = date_len

    # print("test test test ", getDB.dateLen)

    # # print("date dic ", allDate_list)

    # # print("type alldate", type(allDate_list))

    # # print(series_objectP)

    # # print(k)
    # # print("TYPE: ", type(k))
    # # object_file = 'datajoin_object.json'
    # # f = open(object_file, j,'w')
    # # print (f)

    # # print(dates_list)
    # data = json.dumps(series_object)

    # test = type(series_object)
    # # print(test)

    # #print("series obj", series_object)
    # object_result["data"] = data
    # object_result["date"] = allDate_list
    # object_result["plotLine"] = plotLines
    # object_result["sumDate"] = sumDate

    # object_result["pie"] = getDataPie(request)

# get JSON
    # name = int('name')
    object_result["workweek"] = workweek
    object_result["workweek_value"] = [{'name' : "Common","data" : common_seagate_workweek}, {"name" : "Drive Fix", "data" : fix_drive_workweek}, {"name" : "Drive VAR", "data" : var_drive_workweek}, {"name" : "HSA FIX", "data" : fix_hsa_workweek}, {"name" : "HSA VAR", "data" : var_hsa_workweek},{"name" : "Slider FIX", "data" : fix_slider_workweek},{"name" : "Slider VAR", "data" : var_slider_workweek}]
    print("object ",object_result)

    return HttpResponse(
        json.dumps(object_result),
        content_type='application/javascript; charset=utf8')


def getDataPie(request):

    object_resultP = {}

    date1 = (Home.getDate1)
    date2 = (Home.getDate2)

    # Check date if date is null set default date #
    defaultDate = []

    # print(date1, date2)
    server = 'localhost\SQLEXPRESS'
    database = 'ION'
    username = 'sa'
    password = 'sa1234'
    conn = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER="+server+";DATABASE="+database+";UID="+username+";PWD=" + password)
    cursor = conn.cursor()
    cursor.execute("select tblPoint.PointID, tblPoint.PointName, tblPoint.UnitName, tblPoint.Operation, tblPoint.PointType, tblTrendAnalog.ActualValue, tblTrendAnalog.PointDate from tblPoint inner join tblTrendAnalog on tblPoint.PointID = tblTrendAnalog.PointID where tblTrendAnalog.PointDate >= '" +
                   date1+"'  and tblTrendAnalog.PointDate <= '"+date2+"' and tblPoint.PointType = 'PRIMARY' order by tblTrendAnalog.PointDate asc")
    result = cursor.fetchall()

    y = len(result)
    print(y)

    data_list = []

    for data in result:
        test = data.PointDate
        # print(test)
        timeStamp = test.strftime("%Y-%m-%d")
        # print(timeStamp)
        t = (data.PointID, data.PointName, data.UnitName,
             data.Operation, data.PointType, timeStamp, data.ActualValue)
        data_list.append(t)

    j = json.dumps(data_list)
    k = json.loads(j)

    a = []
    b = []
    c = []
    d = []
    e = []
    f = []
    g = []
    x = []

    object_dicP = {}

    series_listP = []

    dates_dicP = {}

    dates_listP = []

    for dataPie in result:
        if (dataPie.PointName == "COMMON_seagate"):

            decA = float("{:.2f}".format(dataPie.ActualValue))
            a.append(decA)
            # x = sum(decA)
            sumA = float("{:.2f}".format(sum(a)))

            # print(a)

            object_dicP['series'] = {}
            object_dicP['series']['name'] = dataPie.PointName
            object_dicP['series']['y'] = float(
                "{:.2f}".format(sumA / (getDB.dateLen)))
            series_listP.append(object_dicP['series'])

        if (dataPie.PointName == "FIX_drive"):
            decA = float("{:.2f}".format(dataPie.ActualValue))
            b.append(decA)
            sumB = float("{:.2f}".format(sum(b)))
            # b.append(data.ActualValue)
            object_dicP['series2'] = {}
            object_dicP['series2']['name'] = dataPie.PointName
            object_dicP['series2']['y'] = float(
                "{:.2f}".format(sumB / (getDB.dateLen)))
            series_listP.append(object_dicP['series2'])

        if (dataPie.PointName == "VAR_drive"):

            decA = float("{:.2f}".format(dataPie.ActualValue))
            c.append(decA)
            sumC = float("{:.2f}".format(sum(c)))
            object_dicP['series3'] = {}
            object_dicP['series3']['name'] = dataPie.PointName
            object_dicP['series3']['y'] = float(
                "{:.2f}".format(sumC / (getDB.dateLen)))

            series_listP.append(object_dicP['series3'])

        if (dataPie.PointName == "FIX_hsa"):
            decA = float("{:.2f}".format(dataPie.ActualValue))
            d.append(decA)
            sumD = float("{:.2f}".format(sum(d)))
            object_dicP['series4'] = {}
            object_dicP['series4']['name'] = dataPie.PointName
            object_dicP['series4']['y'] = float(
                "{:.2f}".format(sumD / (getDB.dateLen)))

            series_listP.append(object_dicP['series4'])

        if (dataPie.PointName == "VAR_hsa"):
            decA = float("{:.2f}".format(dataPie.ActualValue))
            e.append(decA)
            sumE = float("{:.2f}".format(sum(e)))
            object_dicP['series5'] = {}
            object_dicP['series5']['name'] = dataPie.PointName
            object_dicP['series5']['y'] = float(
                "{:.2f}".format(sumE / (getDB.dateLen)))

            series_listP.append(object_dicP['series5'])

        if (dataPie.PointName == "FIX_slider"):
            decA = float("{:.2f}".format(dataPie.ActualValue))
            f.append(decA)
            sumF = float("{:.2f}".format(sum(f)))
            object_dicP['series6'] = {}
            object_dicP['series6']['name'] = dataPie.PointName
            object_dicP['series6']['y'] = float(
                "{:.2f}".format(sumF / (getDB.dateLen)))

            series_listP.append(object_dicP['series6'])

        if (dataPie.PointName == "VAR_slider"):
            decA = float("{:.2f}".format(dataPie.ActualValue))
            g.append(decA)
            sumG = float("{:.2f}".format(sum(g)))
            object_dicP['series7'] = {}
            object_dicP['series7']['name'] = dataPie.PointName
            object_dicP['series7']['y'] = float(
                "{:.2f}".format(sumG / (getDB.dateLen)))
            series_listP.append(object_dicP['series7'])

    sumAll = [sumA, sumB, sumC, sumD, sumE, sumF, sumG]
    averageAll = sum(sumAll) / getDB.dateLen

    sumCommon = sum([sumA])
    averageComm = sumCommon / (getDB.dateLen)

    sumFix = sum([sumB, sumD, sumF])
    averageFix = sumFix / getDB.dateLen

    sumVar = sum([sumC, sumE, sumG])
    averageVar = sumVar / getDB.dateLen

    print("Average ", averageAll)

    #print("len ", len(sumList))
    consumption = {}
    consumption['allValue'] = float("{:.2f}".format(averageAll))
    consumption['common'] = float("{:.2f}".format(averageComm))
    consumption['fix'] = float("{:.2f}".format(averageFix))
    consumption['var'] = float("{:.2f}".format(averageVar))

    series_objectP = []
    for arrListP in object_dicP:
        # print(arrList)
        series_objectP.append(object_dicP[arrListP])

    # print(series_objectP)
    # print(object_dicP['series']['y']
    series_objectP.append(consumption)

    #
    # object_resultP["data"] = {}
    # object_resultP["data"] = data
    # object_resultP["date"] = {}
    # object_resultP["date"] = dates_dicP

    # print(object_resultP)

    return HttpResponse(
        json.dumps(series_objectP),
        content_type='application/javascript; charset=utf8')


def ConsumptionAnalysis(request):

    # week = (Week(2020, 30))
    # print(week.saturday())
    # print(week.friday())
    # # print(request.POST['chosen-value-fullpoint'])
    
    if 'date' in request.POST:
        print(request.POST)
        week1 = request.POST.get('week1')
        week2 = request.POST.get('week2')

        month1 = request.POST.get('month1')
        month2 = request.POST.get('month2')

        date1 = request.POST.get('date1')
        date2 = request.POST.get('date2')


        if (week1 and week2) :
            URL  = "http://10.7.117.5/api/workweek?range="+jgh+"&date1=2020-07-01&date2=2020-09-01"
            
            PARAMS = {'range': 0,'date1': week1,'date2': week2}

            r = requests.get(url = URL, params = PARAMS)

            data = r.json

            print(data)

        if (month1 and month2) :
            cut_month1 = month1[:-3]
            cut_month2 = month2[:-3]
            print(month1, cut_month1, " : ",month2, cut_month2)

            ConsumptionAnalysis.getDate1 = cut_month1
            ConsumptionAnalysis.getDate2 = cut_month2

        if (date1 and date2):
            ConsumptionAnalysis.getDate1 = date1
            ConsumptionAnalysis.getDate2 = date2

        else:
            #     # if ( date1 and date2) == "" :
            #         # REMOVE COMMENT AFTER GET REAL DATA ###################################
            setDate2 = date.today() - timedelta(1)
            setDate = "2020-08-06"
            setDate2 = datetime.strptime(setDate, '%Y-%m-%d')
            # print(setDate2)
            days = timedelta(days=5)
            setDate1 = setDate2 - days


            # print("default date ", setDate1, setDate2)

            date1 = str(setDate1)
            date2 = str(setDate2)

            ConsumptionAnalysis.getDate1 = date1
            ConsumptionAnalysis.getDate2 = date2
    
    else:
        setDate2 = date.today() - timedelta(1)
        setDate = "2020-08-06"
        setDate2 = datetime.strptime(setDate, '%Y-%m-%d')
        # print(setDate2)
        days = timedelta(days=5)
        setDate1 = setDate2 - days
        # print("default date ", setDate1, setDate2)

        date1 = str(setDate1)
        date2 = str(setDate2)

        ConsumptionAnalysis.getDate1 = date1
        ConsumptionAnalysis.getDate2 = date2

        # print("get valueee ", ConsumptionAnalysis.getValue)

        get_list = []
        if 'check' in request.POST :
            # print('type ', type(request.POST))
            # print(request.POST)
            graphDate1 = request.POST.get('dateRawGraph1')
            graphDate2 = request.POST.get('dateRawGraph2')
            system = request.POST.get('chosen-value-operation')
            # print("657 ",graphDate1)
            # print("658 ",graphDate2)
            get_list =  (request.POST.getlist('chosen-value-fullpoint'))

        else : 
            get_list = [53,49]
            graphDate1 = '2020-08-01'
            graphDate2 = '2020-08-05'
            system = "Example"

        ConsumptionAnalysis.getValue = get_list
        ConsumptionAnalysis.getgraphDate1 = graphDate1
        ConsumptionAnalysis.getgraphDate2 = graphDate2
        ConsumptionAnalysis.getSystem = system

            # print(get_list)

    # ConsumptionAnalysis.getDate1 = date1
    # ConsumptionAnalysis.getDate2 = date2


    return render(request, 'dashboard/consumptionAnalysis.html')


def consumptionData(request):

    date1 = ConsumptionAnalysis.getDate1
    date2 = ConsumptionAnalysis.getDate2
    print(date1, date2)
    server = 'localhost\SQLEXPRESS'
    database = 'ION'
    username = 'sa'
    password = 'sa1234'
    conn = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER="+server+";DATABASE="+database+";UID="+username+";PWD=" + password)
    cursor = conn.cursor()
    cursor.execute("select tblPoint.PointID, tblPoint.PointName, tblPoint.UnitName, tblPoint.Operation, tblPoint.PointType, tblTrendAnalog.ActualValue, tblTrendAnalog.PointDate from tblPoint inner join tblTrendAnalog on tblPoint.PointID = tblTrendAnalog.PointID where tblTrendAnalog.PointDate >= '"+date1+"'  and tblTrendAnalog.PointDate <= '"+date2+"' and tblPoint.PointType = 'PRIMARY' order by tblTrendAnalog.PointDate asc ")
    result = cursor.fetchall()

    y = len(result)
    print("THIS IS Y ",y)
    
    result_date = []
    for date in range(len(result)):
        date_in_result = result[date].PointDate.strftime("%d %B")
        result_date.append(date_in_result)
        date += 1


    #print(result_date)

    a = []
    b = []
    c = []
    d = []
    e = []
    f = []
    g = []
    h = []
    x = []
    j = []

    z = []

    object_dic = {}

    series_list = []

    dates_list = []
    
    dates_dic = {}

    summation_dic = {}

    summation_list = []

    pointDate = {}

    allPointDate = []

    avgA = []

    totalFixDrive = {}
    totalVarDrive = {}
    totalFixHsa = {}
    totalvarHsa = {}
    totalFixSlider = {}
    totalVarSlider = {}
    totalAll = []

    for data in result:
        dateText = data.PointDate.strftime("%d %B %Y")
        date = data.PointDate
        dates_dic[dateText] = {}
        dates_dic[dateText] = dateText
        dates_list.append(dates_dic[dateText])

        value = float("{:.2f}".format(data.ActualValue))
        
        if (data.PointName == "FIX_drive"):
            decA = int(data.ActualValue)
            totalFixDrive["value"] = {}
            totalFixDrive["value"][datetime.strftime(data.PointDate, '%d-%m-%y')] = decA
            fixDrive = [{"Drive FIX" : totalFixDrive["value"]}]
            totalAll.append(fixDrive[0])
            a.append(decA)
            sumA = sum(a) / len(a)
            # avgA.append(sumA)
            object_dic['series0'] = {}
            object_dic['series0']['name'] = "Drive FIX"
            object_dic['series0']['data'] = a
            series_list.append(object_dic['series0'])

        if (data.PointName == "VAR_drive"):
            decA = int(data.ActualValue)
            totalVarDrive["value"] = {}
            totalVarDrive["value"][datetime.strftime(data.PointDate, '%d-%m-%y')] = decA
            varDrive = [{"Drive VAR" : totalVarDrive["value"]}]
            totalAll.append(varDrive[0])
            b.append(decA)
            sumB = sum(b)
            object_dic['series1'] = {}
            object_dic['series1']['name'] = "Drive VAR"
            object_dic['series1']['data'] = b
            #object_dic['series1']['date'] = allDate_list
            series_list.append(object_dic['series1'])

        if (data.PointName == "COMMON_drive"):
            decA = int(data.ActualValue)
            c.append(decA)
            sumC = sum(c)
            object_dic['series2'] = {}
            object_dic['series2']['name'] = "Drive Common"
            object_dic['series2']['data'] = c
            #object_dic['series2']['date'] = allDate_list

            series_list.append(object_dic['series2'])

            #print("test print!!",series_list)

        if (data.PointName == "FIX_hsa"):
            decA = int(data.ActualValue)
            totalFixHsa["value"] = {}
            totalFixHsa["value"][datetime.strftime(data.PointDate, '%d-%m-%y')] = decA
            fixHsa = [{"HSA FIX" : totalFixHsa["value"]}]
            totalAll.append(fixHsa[0])
            d.append(decA)
            sumD = sum(d)
            object_dic['series3'] = {}
            object_dic['series3']['name'] = "HSA FIX"
            object_dic['series3']['data'] = d
            #object_dic['series3']['date'] = allDate_list

            series_list.append(object_dic['series3'])

        if (data.PointName == "VAR_hsa"):
            decA = int(data.ActualValue)
            totalvarHsa["value"] = {}
            totalvarHsa["value"][datetime.strftime(data.PointDate, '%d-%m-%y')] = decA
            varHsa = [{"HSA VAR" : totalvarHsa["value"]}]
            totalAll.append(varHsa[0])
            e.append(decA)
            sumE = sum(e)
            object_dic['series4'] = {}
            object_dic['series4']['name'] = "HSA VAR"
            object_dic['series4']['data'] = e
            #object_dic['series4']['date'] = allDate_list
            series_list.append(object_dic['series4'])

        if (data.PointName == "COMMON_hsa"):
            decA = int(data.ActualValue)
            f.append(decA)
            sumF = sum(f)
            object_dic['series5'] = {}
            object_dic['series5']['name'] = "HSA Common"
            object_dic['series5']['data'] = f
            #object_dic['series5']['date'] = allDate_list
            series_list.append(object_dic['series5'])

        if (data.PointName == "FIX_slider"):
            decA = int(data.ActualValue)
            totalFixSlider["value"] = {}
            totalFixSlider["value"][datetime.strftime(data.PointDate, '%d-%m-%y')] = decA
            fixSlider = [{"Slider FIX" : totalFixSlider["value"]}]
            totalAll.append(fixSlider[0])
            g.append(decA)
            sumG = sum(g)
            object_dic['series6'] = {}
            object_dic['series6']['name'] = "Silder FIX"
            object_dic['series6']['data'] = g
            #object_dic['series6']['date'] = allDate_list
            series_list.append(object_dic['series6'])

        if (data.PointName == "VAR_slider"):
            decA = int(data.ActualValue)
            totalVarSlider["value"] = {}
            totalVarSlider["value"][datetime.strftime(data.PointDate, '%d-%m-%y')] = decA
            varSlider = [{"Slider VAR" : totalVarSlider["value"]}]
            totalAll.append(varSlider[0])
            h.append(decA)
            sumH = sum(h)
            object_dic['series7'] = {}
            object_dic['series7']['name'] = "Silder VAR"
            object_dic['series7']['data'] = h
            #object_dic['series7']['date'] = allDate_list
            series_list.append(object_dic['series7'])


        if (data.PointName == "COMMON_slider"):
            decA = int(data.ActualValue)
            x.append(decA)
            sumI = sum(x)
            object_dic['series8'] = {}
            object_dic['series8']['name'] = "Slider Common"
            object_dic['series8']['data'] = x
            #object_dic['series8']['date'] = allDate_list
            series_list.append(object_dic['series8'])

        if (data.PointName == "TOTAL_seagate"):
            decA = int(data.ActualValue)
            j.append(decA)
            sumJ = sum(j)
            object_dic['series9'] = {}
            object_dic['series9']['name'] = "Total"
            object_dic['series9']['data'] = j
            #object_dic['series9']['date'] = allDate_list
            series_list.append(object_dic['series9'])
    # print("zzzzzzzzzzzz ",z)

    consumption = {}
    consumption['fix drive'] = (a)
    consumption['var drive'] = (b)
    consumption['common drive'] = (c)
    consumption['fix hsa'] = (d)
    consumption['var hsa'] = (e)
    consumption['common hsa'] = (f)
    consumption['fix silder'] = (g)
    consumption['var slider'] = (h)
    consumption['common slider'] = (x)
    consumption['total seagate'] = (j)
    # consumption['value'] = valueList

    # print("consumption ",consumption)
    summary_cursor = conn.cursor()
    summary_cursor.execute("select * from [ION].[dbo].[tblTrendAnalog] inner join [ION].[dbo].[tblPoint] on tblTrendAnalog.[PointID] = tblPoint.[PointID] where tblTrendAnalog.[PointDate] >= '"+date1+"' and tblTrendAnalog.[PointDate] <= '"+date2+"' and PointType = 'table' order by tblTrendAnalog.[PointDate] asc" )
    result_summary = summary_cursor.fetchall()
    
    summaryList = []
    valueDict = {}
    totalValue = {}
    totalList = []
    pointname = []

    total = []

    print("testttt",totalAll)

    for value in result_summary :
        # summaryList.append(value)
        
        if value.Operation is None :
            system = "Other"
        else :
            system = value.Operation + " " + value.UnitName
        
        if system == 'drive FIX' :
            system = 'Drive FIX'
            # total.append(decA)
            valueDict["summary"] = {}
            valueDict["summary"][system] = [{"pointname" : value.PointName, datetime.strftime(value.PointDate, '%d-%m-%y') : ("{0:.2f}".format(value.ActualValue))}]
            summaryList.append(valueDict["summary"])

        if system == 'drive VAR' :
            system = 'Drive VAR'
            valueDict["summary"] = {}
            valueDict["summary"][system] = [{"pointname" : value.PointName, datetime.strftime(value.PointDate, '%d-%m-%y') : "{0:.2f}".format(value.ActualValue)}]
            summaryList.append(valueDict["summary"])

        if system == 'slider FIX' :
            system = 'Slider FIX'
            valueDict["summary"] = {}
            valueDict["summary"][system] = [{"pointname" : value.PointName, datetime.strftime(value.PointDate, '%d-%m-%y') : "{0:.2f}".format(value.ActualValue)}]
            summaryList.append(valueDict["summary"])

        if system == 'slider VAR' :
            system = 'Slider VAR'
            valueDict["summary"] = {}
            valueDict["summary"][system] = [{"pointname" : value.PointName, datetime.strftime(value.PointDate, '%d-%m-%y') : "{0:.2f}".format(value.ActualValue)}]
            summaryList.append(valueDict["summary"])

        if system == 'hsa FIX' :
            system = 'HSA FIX'
            valueDict["summary"] = {}
            valueDict["summary"][system] = [{"pointname" : value.PointName, datetime.strftime(value.PointDate, '%d-%m-%y') : "{0:.2f}".format(value.ActualValue)}]
            summaryList.append(valueDict["summary"])

#HSA is special
    system = 'HSA VAR'
    valueDict["summary"] = {}
    valueDict["summary"][system] = [{"pointname" : "Bldg.1A & Bldg.2A", "value" : e}]
    summaryList.append(valueDict["summary"])

#grop by system   
    dd = defaultdict(list)

    for d in summaryList :
        for key, value in d.items() :
            dd[key].append(value)
    print("dd",dd["Drive VAR"][0])

    systemList = dict(dd)
    systemKey = list(systemList.keys())
    print("system key",systemKey)

# Drive Fix
    systemFinal = []
    driveFix = []
    for item in dd["Drive FIX"] :
        driveFix.append(item[0])
    print("item0",driveFix)

    driveFixList = defaultdict(list)
    for drive in driveFix :
        for key, value in drive.items() :
            driveFixList[key].append(value)
    print("group",driveFixList)
    driveFixFinal = [{"Drive FIX" : dict(driveFixList)}]
    systemFinal.append(driveFixFinal[0])

# Drive Var
    driveVar = []
    for item in dd["Drive VAR"] :
        driveVar.append(item[0])
    # print(driveVar)

    driveVarList = defaultdict(list)
    for drive in driveVar :
        for key, value in drive.items() :
            driveVarList[key].append(value)
    # print(driveVarList)
    driveVarFinal = [{"Drive VAR" : dict(driveVarList)}]
    systemFinal.append(driveVarFinal[0])
    # print("final ",systemFinal)

#HSA FIX
    hsaFix = []
    for item in dd["HSA FIX"] :
        hsaFix.append(item[0])
    # print(hsaFix)

    hsaFixList = defaultdict(list)
    for drive in hsaFix :
        for key, value in drive.items() :
            hsaFixList[key].append(value)
    # print(driveVarList)
    hsaFixFinal = [{"HSA FIX" : dict(hsaFixList)}]
    systemFinal.append(hsaFixFinal[0])

#HSA VAR
    hsaVar = []
    for item in dd["HSA VAR"] :
        hsaVar.append(item)
    # print(hsaVar)

    # hsaFixList = defaultdict(list)
    # for drive in hsaFix :
    #     for key, value in drive.items() :
    #         hsaFixList[key].append(value)
    # print(driveVarList)
    hsaVarFinal = [{"HSA VAR" : hsaVar}]
    systemFinal.append(hsaVarFinal[0])


#Slider FIX
    sliderFix = []
    for item in dd["Slider FIX"] :
        sliderFix.append(item[0])
    # print(sliderFix)

    sliderFixList = defaultdict(list)
    for drive in sliderFix :
        for key, value in drive.items() :
            sliderFixList[key].append(value)
    # print(driveVarList)
    sliderFixFinal = [{"Slider FIX" : dict(sliderFixList)}]
    systemFinal.append(sliderFixFinal[0])

#Slider VAR
    sliderVar = []
    for item in dd["Slider VAR"] :
        sliderVar.append(item[0])
    # print(sliderVar)

    sliderVarList = defaultdict(list)
    for drive in sliderVar :
        for key, value in drive.items() :
            sliderVarList[key].append(value)
    # print(driveVarList)
    sliderVarFinal = [{"Slider VAR" : dict(sliderVarList)}]
    systemFinal.append(sliderVarFinal[0])

    print("final ",systemFinal)

#Total value
    totalDict = defaultdict(list)

    for v in totalAll :
        for key, value in v.items() :
            totalDict[key].append(value)
    print("vvvvvvv",totalDict)

    # systemList = dict(dd)
    # systemKey = list(systemList.keys())
    # print("system key",systemKey)
####

    avgAll = []
    for i in range(len(j)) :
        avg = []
        for name, value in consumption.items():
            if name == 'fix drive' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))
            if name == 'var drive' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))
            if name == 'common drive' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))
            if name == 'fix hsa' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))
            if name == 'var hsa' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))
            if name == 'common hsa' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))
            if name == 'fix silder' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))
            if name == 'var slider' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))
            if name == 'common slider' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))
            if name == 'total seagate' :
                formatAvg = (value[i]/j[i]) * 100
                avg.append(float("{:.2f}".format(formatAvg)))

        avgAll.append(avg)

    #print("average ", avgAll)
    #print("len ", len(avgAll))

    avgAllList = {}

    for i in range(len(avgAll)) :
        avgAllList[i] = {}
        avgAllList[i]["index"] = avgAll[i]
    # print("zzzzzzzzzzzzzzzzzzzzzzz",avgAllList)

    #print("series ",series_list)

    allDate_list = ["Date"]
    for datelist in dates_dic:
         allDate_list.append(dates_dic[datelist])

    # print("all date ", allDate_list)
    
    series_object = []
    for arrList in sorted (object_dic.keys()):
        # print(arrList)
        series_object.append(object_dic[arrList])

    series_object.append(allDate_list)
    series_object.append(avgAllList)
    series_object.append(systemFinal)
    series_object.append(dict(totalDict))

        

    return HttpResponse(
        json.dumps(series_object),
        content_type='application/javascript; charset=utf8')


def SelectOption(request) :
    
    server = 'localhost\SQLEXPRESS'
    database = 'ION'
    username = 'sa'
    password = 'sa1234'
    conn = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER="+server+";DATABASE="+database+";UID="+username+";PWD=" + password)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Operation WHERE (PointType = 'PME') ")
    result = cursor.fetchall()

    # print(dictResult)

    dictResult = {}
    nameDict = {}

    for data in result :
        
        systemFix = data.UnitName+" "+data.SystemName
        print("systemmm", systemFix)

        if data.Operation not in dictResult :
            dictResult[data.Operation] = {}    
        
        if systemFix not in dictResult[data.Operation] :
            dictResult[data.Operation][systemFix] = {}  
        
        if data.PointDescription not in dictResult[data.Operation ][systemFix] :
            dictResult[data.Operation][systemFix][data.PointDescription] = {}  

        dictResult[data.Operation][systemFix][data.PointDescription] = data.PointID

        nameDict[data.PointID] = data.PointDescription

    # print(dictResult)

    # print(nameDict)

    # summary_cursor = conn.cursor()
    # summary_cursor.execute("SELECT * FROM tblTrendAnalog ")
    # summary_result = summary_cursor.fetchall()
    # # print("summar_result",summary_result)

    # dictSummary = {}
    # SummaryList = []

    # for data in summary_result :
        
    #     # system = data.UnitName+" "+data.SystemName

    #     # print("data ",data.ActualValue)

    #     # if data.PointID not in dictSummary :
    #     dictSummary[data.PointID] = data.ActualValue  

    #     SummaryList.append(dictSummary)
        
        # if system not in dictSummary[data.Operation] :
        #     dictSummary[data.Operation][system] = {}  
        
        # if data.PointDescription not in dictSummary[data.Operation ][system] :
        #     dictSummary[data.Operation][system][data.PointDescription] = {}  

        # dictSummary[data.Operation][system][data.PointDescription] = data.ActualValue

        # # nameDict[data.PointID] = data.PointDescription

        # SummaryList.append(dictSummary)

# /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////and (PointID = '60' or or or )
    getValue = ConsumptionAnalysis.getValue
    print("Valueee", getValue)

    idList = []

    for point in getValue:
        # print("test ", point)
        idList.append(int(point))

    value_point = {}
    len_idList = len(idList)
    # print(idList[0])
    if (len_idList > 1) :
        for i in range(len(idList)):
            for key, value in nameDict.items() :
                if idList[i] == key :
                    value_point[key] = value
                t_tuple = tuple(idList)
                # print(t_tuple)
                selectedPoint = ("PointID in " + str(t_tuple) )
                PointID = selectedPoint
    # else :
    #     PointID = ("PointID = "+ str(idList[0]))
    
        
    # print(value_point)
    # print("1009 ",PointID)

    # print(str(PointID))

    graphDate1 = ConsumptionAnalysis.getgraphDate1
    graphDate2 = ConsumptionAnalysis.getgraphDate2

    # print(graphDate2)
        
    cursor_trend = conn.cursor()
    cursor_trend.execute("SELECT * FROM tblTrendAnalog WHERE "+PointID+" and PointDate >= '"+graphDate1+"' and PointDate <= '"+graphDate2+"' order by PointDate ASC")
    trend_result = cursor_trend.fetchall()

    # print(trend_result)

    # print("get value ", getValue)

    trend = {}
    trend_list = []
    date_list = []
    date_value = []
    date = {}

    for data in trend_result:

        date[data.PointDate] = (data.PointDate).strftime("%d %B")
        if (date not in date_list):
            date_list.append(date)


        trend = {}
        trend[data.PointID] = data.ActualValue
        trend_list.append(trend)

    # print("1044 ",date_list)
    print("trendlist ", trend_list)

    for key, value in date.items():
        date_value.append(value)

    # print("1051 ",date_value)


##########################################################################################################################################

    # print(trend_list)
    # print("1056 ",d)
    dd_list = []
    dd = defaultdict(list)
    for data in trend_list:
        for key, value in data.items():
            dd[key].append(value)

    dict_dd = dict(dd)

    final_dict = {}
    final_list = []
    for i in range(len(idList)) :
        for point, data in dict_dd.items() :
            for key, value in value_point.items() : 
                if idList[i] == point and idList[i] == key :
                    final_dict[key] = {}
                    final_dict[key]["name"] = value
                    final_dict[key]["data"] = data
                    final_list.append(final_dict)

    print("1072 ",final_list)
    dd_list.append(dict(dd))
    print(dd_list)

    dictResult["trend"] = final_list
    dictResult["date"] = date_value
    dictResult["system"] = ConsumptionAnalysis.getSystem
    # dictResult["summary"] = SummaryList
                                                                                                                                                                                                                                                                                                                                                                                                                 
    return HttpResponse(    
        json.dumps(dictResult),
        content_type='application/javascript; charset=utf8')

def PowerHistory(request) :

# EXample of Calling API
    # URL = "http://10.7.117.5/api/workweek"
    # PARAMS = {'range': 1, 'date1': '2020-07-01', 'date2': '2020-08-06'} 

    # # sending get request and saving the response as response object 
    # r = requests.get(url = URL, params = PARAMS)
    # # r = requests.get(url= URL)
    # data = r.json()

# ///////////////////Read excel
    # print(data) 
    # data = pd.ExcelFile(r'C:/Users/waris/OneDrive/Desktop/PowerHistory/Power History.xlsx')
    # df1 = pd.read_excel(data, 'Sheet4')
    # df1 = pd.read_excel (r'C:\Users\waris\OneDrive\Desktop\PowerHistory\Power History.xlsx', sheet_name='sheet4')
    # print("df1 ", df1)
    # print("os ", os.getcwd())

################################################################################################################################################


    server = 'localhost\SQLEXPRESS'
    database = 'PowerHistory'
    username = 'admin'
    password = 'admin1234'
    conn = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER="+server+";DATABASE="+database+";UID="+username+";PWD=" + password)
    cursor = conn.cursor()
    # cursor.execute("SELECT accID, Date, ColumnName, accValue FROM [PowerHistory].[dbo].[Accident] where [ColumnName] in ('PlaceCause', 'ImpactValue') Order by Date asc")
    # row = cursor.fetchall()

# //////////////////////////# THIS IS FOR CREATE TABLE AND  ETC.///////////////////////////////////////////////////////////////////////////////
    
    # cursor.execute("CREATE TABLE Accident (accID nvarchar(20), Date nvarchar(150), ColumnName nvarchar(150), accValue nvarchar(1500)) ")
    # conn.commit()

    # cursor.execute("CREATE TABLE accident (accID nvarchar(20), ColumnName nvarchar(100), Value nvarchar(1500)) ")
    # conn.commit()

    # cursor.execute("CREATE TABLE Test (accID nvarchar(20), ColumnName nvarchar(100), Value nvarchar(1500)) ")
    # conn.commit()

    # cursor.execute("SELECT accID, ID, Value FROM AccidentData WHERE accID = '261' and ID = '6' ")
    # # conn.commit()

    # cursor.execute("CREATE TABLE Detail (ID nvarchar(20), detailID nvarchar(20), DetailColumn nvarchar(100), DetailValue nvarchar(1500)) ")
    # conn.commit()

    # cursor.execute("ALTER TABLE Accident ADD InsertTime nvarchar(150) ")
    # conn.commit()

# THIS IS FOR INSERT DATA TO SQL
    for i in range(321) :
        getIDvalue = int(df1['ID'].values[i])
        getDatevalue = df1['Date'].values[i]
        # getTimevalue = df1['Time'].values[i]
        # getDetailID = df1['detailID'].values[i]

        # getDuration = df1['Duration'].values[i]
        # getVoltage = df1['Voltage'].values[i]
        # getSag = df1['Sag'].values[i]
        getImpact = df1['Impact'].values[i]
        getImpactProduction = df1['Impact Production'].values[i]
        getRootCause = df1['Root cause'].values[i]
        getPlaceCause = df1['PlaceCause'].values[i]
        getImpactValue = int(df1['ImpactValue'].values[i])

        # getIDvalue = int(df1['ID'].values[i])
        # getDetailID = int(df1['detailID'].values[i])
        # getTime = (df1['Time'].values[i])
        # getDuration = (df1['Duration'].values[i])
        # getVoltage = (df1['Voltage'].values[i])
        # getSag = (df1['Sag'].values[i])

        InsertTime = "2020-09-29"
        InsertBy = "WarisaraP"

        ColumnName = "ImpactValue"

        # cursor.execute("INSERT INTO Detail (ID, detailID, DetailColumn, DetailValue) VALUES ('"+str(getIDvalue)+"','"+str(getDetailID)+"','"+ColumnName+"','"+str(getSag)+"') ")
        # conn.commit()

        # cursor.execute("INSERT INTO Accident (accID, Date, ColumnName, accValue) VALUES ('"+str(getIDvalue)+"','"+str(getDatevalue)+"','"+ColumnName+"','"+str(getImpactValue)+"') ")
        # conn.commit()

        # cursor.execute("INSERT INTO Accident (accID, InsertBy, InsertTime ) VALUES ('"+str(getIDvalue)+"','"+str(InsertBy)+"','"+str(InsertTime)+"') ")
        # conn.commit()

        # cursor.execute("SELECT accID, ID, Value FROM AccidentData WHERE accID = '261' and ID = '6' ")
        # conn.commit()

    # insertImage = "CREATE TABLE Database1([image name] varchar(20), [image] varbinary(max))"
    # cursor.execute(insertImage)
    # conn.commit()

# Get value from modal-form
    if "detail" in request.POST:
        # print("resquest post",request.POST)
        formDict = dict(request.POST)
        print("form dict ",formDict)

        cursor.execute("SELECT accID FROM Accident order by accID asc")
        getID = cursor.fetchall()
        print("ID", type(getID))
        
        ID = max([int(row[0]) for row in getID]) + 1 #Get MAX ID from SQL
        print("max",ID)
        
# Insert Data to Accident table

        getColumn = ["PlaceCause","ImpactValue","ImpactProduction","Impact","RootCause"]
        # getValue = [formDict['PlaceCause'][0],formDict['ImpactValue'][0],formDict['ImpactProduction'][0],formDict['Impact'][0],formDict['RootCause'][0],formDict['InsertBy'][0]]
        t = time.localtime()

        if formDict['RootCause'][0] == "" :
            formDict['RootCause'][0] = "-"
            getValue = [formDict['PlaceCause'][0],formDict['ImpactValue'][0],formDict['ImpactProduction'][0],formDict['Impact'][0],formDict['RootCause'][0],formDict['InsertBy'][0]]
        else :
            getValue = [formDict['PlaceCause'][0],formDict['ImpactValue'][0],formDict['ImpactProduction'][0],formDict['Impact'][0],formDict['RootCause'][0],formDict['InsertBy'][0]]
        
        print("getValue",getValue)

        for i in range(len(getColumn)): 
            getID = ID
            getDate = formDict['Date']
            getTime = time.strftime("%H:%M:%S", t)
            print("get id", getID)
            print("getDate", type(getDate[0]))
            cursor.execute("INSERT INTO Accident (accID, Date, ColumnName, accValue, InsertBy, InsertTime) VALUES ('"
                                    +str(getID)+"','"
                                    +str(getDate[0])+"','"
                                    +str(getColumn[i])+"','"
                                    +str(getValue[i])+"','"
                                    +str(formDict['InsertBy'][0])+"','"
                                    +str(getTime)+"') ")
            conn.commit()

# Insert Data to Detail Table for detailID = 1

        filename = request.FILES['files1'] #already read file
        # imgName = request.FILES['picture1']
        print("filename ",type(filename))
        # This would save the file. Now to read simply use the normal way to read files in Python
        img_extension = os.path.splitext(filename.name)[1]
        name = os.path.splitext(filename.name)[0]
        # fileName = os.path.splitext(filename.name)[0]
        
        print("img extension", img_extension)

        if img_extension == ".jpeg" or img_extension == ".jpg" or img_extension == ".png":
            image_folder = 'statics/storage/' 
            if not os.path.exists(image_folder):
                os.mkdir(image_folder)
            imageTuple = (image_folder, name , img_extension)

            img_save_path = ''.join(imageTuple)
            print("typeeeee", img_save_path)
            with open(img_save_path, 'wb+') as f:
                for chunk in filename.chunks():
                    f.write(chunk)

            file_name = "No file"
            img_name = img_save_path

            getValueCheck = [formDict['duration1'][0],formDict['time1'][0],formDict['voltage1'][0],formDict['sag1'][0],file_name,img_name]
        else :
            
            image_folder = 'statics/storage/' 
            if not os.path.exists(image_folder):
                os.mkdir(image_folder)
            imageTuple = (image_folder, name , img_extension)

            img_save_path = ''.join(imageTuple)
            print("typeeeee", img_save_path)
            with open(img_save_path, 'wb+') as f:
                for chunk in filename.chunks():
                    f.write(chunk)

            file_name = img_save_path
            img_name = "No Image"

            getValueCheck = [formDict['duration1'][0],formDict['time1'][0],formDict['voltage1'][0],formDict['sag1'][0],file_name,img_name]


        getDetailColumn = ["Duration","Time","Voltage","Sag", "Files", "Image"]
        
        getDetailValue = []
        for data in getValueCheck:
            if data == "" :
                data = "-"
                getDetailValue.append(data)
            else:
                getDetailValue.append(data)

        print("getDetailValue",getDetailValue)

        for i in range(len(getDetailColumn)):
            dID = ID
            detailID = 1

            cursor.execute("INSERT INTO Detail (ID, detailID, DetailColumn, DetailValue) VALUES ('"
                                    +str(dID)+"','"
                                    +str(detailID)+"','"
                                    +getDetailColumn[i]+"','"
                                    +str(getDetailValue[i])+"') ")
            conn.commit()

# Insert Data to Detail Table for detailID = 2
        getValueCheck2 = [formDict['duration2'][0],formDict['time2'][0],formDict['voltage2'][0],formDict['sag2'][0]]

        
        if all(data == "" for data in getValueCheck2) == False :
            getDetailValue2 = []
            for data in getValueCheck2:
                if data == "" :
                    data = "-"
                    getDetailValue2.append(data)
                else:
                    getDetailValue2.append(data)
            
            for i in range(len(getDetailColumn)):
                dID = ID
                detailID = 2

                cursor.execute("INSERT INTO Detail (ID, detailID, DetailColumn, DetailValue) VALUES ('"
                                        +str(dID)+"','"
                                        +str(detailID)+"','"
                                        +getDetailColumn[i]+"','"
                                        +str(getDetailValue2[i])+"') ")
                conn.commit()
        else :
            getDetailValue2 = getValueCheck2

        # print("getDetailValue2",getDetailValue2)

# Insert Data to Detail Table for detailID = 3
        getValueCheck3 = [formDict['duration3'][0],formDict['time3'][0],formDict['voltage3'][0],formDict['sag3'][0]]
   
        if all(data == "" for data in getValueCheck3) == False :
            getDetailValue3 = []
            for data in getValueCheck3:
                if data == "" :
                    data = "-"
                    getDetailValue3.append(data)
                else:
                    getDetailValue3.append(data)
            
            for i in range(len(getDetailColumn)):
                dID = ID
                detailID = 3

                cursor.execute("INSERT INTO Detail (ID, detailID, DetailColumn, DetailValue) VALUES ('"
                                        +str(dID)+"','"
                                        +str(detailID)+"','"
                                        +getDetailColumn[i]+"','"
                                        +str(getDetailValue3[i])+"') ")
                conn.commit()
        else :
            getDetailValue3 = getValueCheck3
    
        # print("getDetailValue2",getDetailValue2)

# Insert Data to Detail Table for detailID = 3
        getValueCheck4 = [formDict['duration4'][0],formDict['time4'][0],formDict['voltage4'][0],formDict['sag4'][0]]
   
        if all(data == "" for data in getValueCheck4) == False :
            getDetailValue4 = []
            for data in getValueCheck4:
                if data == "" :
                    data = "-"
                    getDetailValue4.append(data)
                else:
                    getDetailValue4.append(data)
            
            for i in range(len(getDetailColumn)):
                dID = ID
                detailID = 4

                cursor.execute("INSERT INTO Detail (ID, detailID, DetailColumn, DetailValue) VALUES ('"
                                        +str(dID)+"','"
                                        +str(detailID)+"','"
                                        +getDetailColumn[i]+"','"
                                        +str(getDetailValue4[i])+"') ")
                conn.commit()
        else :
            getDetailValue4 = getValueCheck4


# Render to Website
    return render(request, 'dashboard/powerhistory.html')


def PowerHistoryData (request) :

    server = 'localhost\SQLEXPRESS'
    database = 'PowerHistory'
    username = 'sa'
    password = 'sa1234'
    conn = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER="+server+";DATABASE="+database+";UID="+username+";PWD=" + password)

# ///////////////////////////////////////////// SUMMARY ///////////////////////////////////////////////////////////
    # //////// SUMMARY
    cursor = conn.cursor()
    cursor.execute("SELECT accID, Date, ColumnName, accValue FROM [PowerHistory].[dbo].[Accident] where [ColumnName] in ('PlaceCause', 'ImpactValue') Order by Date asc")
    row = cursor.fetchall()

    dataList = []
    dataDict = {}

    checkID = []
    dateList = []

    for data in row :
        dataID = data.accID
        dataDate = data.Date[:4]
        dataColumn = data.ColumnName
        dataValue = data.accValue

        if dataID not in checkID :
            checkID.append(dataID)

        if dataDate not in dateList :
            dateList.append(dataDate)

        dataDict['Summary'] = {}
        dataDict['Summary']['ID'] = dataID
        dataDict['Summary']['Date'] = dataDate
        dataDict['Summary']['Column'] = dataColumn
        dataDict['Summary']['Value'] = dataValue
        dataList.append(dataDict['Summary'])

    # print("data list ",len(dataList))
    print(dateList)

    listPlaceCause = []
    listImpactValue = []
    for i in range(len(dataList)):
        if dataList[i]['Column'] == 'PlaceCause' :
            listPlaceCause.append(dataList[i])

        if dataList[i]['Column'] == 'ImpactValue' :
            listImpactValue.append(dataList[i])

    # print(len(listPlaceCause))

    test = []
    test2 = []
    for j in range(len(dateList)) :
        for i in range(len(listPlaceCause)) :
            if listPlaceCause[i]['ID'] == listImpactValue[i]['ID'] :
                    # print(listPlaceCause[i]['Date'])
                if listPlaceCause[i]['Date'] == dateList[j] :
                    # print(listPlaceCause[i]['Date'])
                    testList = [listPlaceCause[i]['Value'], listImpactValue[i]['Value'],listPlaceCause[i]['ID']]
                        # print("test list ", (testList))
                    if testList[1] == '1' :
                        testDict = {}
                        testDict[listPlaceCause[i]['Date']] = testList
                        test.append(testDict)
                    else :
                        test2Dict = {}
                        test2Dict[listPlaceCause[i]['Date']] = testList
                        test2.append(test2Dict)
                            # print(testDict[dateList[j]])

    # print("test list ", (test))
    # print("test list 2", (test2))
    totalImpact = len(test)
    # print(dateList[9])
    # print("testtt ", len(test))

# ///////// Start of Impact ////////// #
    resImpact = dict()
    for data in test :
        for datalist in data :
            if datalist in resImpact :
                resImpact[datalist] += [(data[datalist])]
            else :
                resImpact[datalist] = [data[datalist]]
    # print("ressssssssss",res)

    keyList = []
    for key in resImpact.keys() :
        keyList.append(key)

    internal = []
    listTest = []
    for i in range(len(keyList)) :
        test = len(resImpact[keyList[i]])
        # print("res keylist ",res[keyList[i]])
        listTest.append(test)
    # print("list testtttt ",listTest)
    
    testRest = dict()
    for key in resImpact :
        testRest[key] = []
        for val in resImpact[key] :
            testRest[key].append(val)

# /////// End of Impacted //////////

# ///////// Start of UnImpact (NOT USE)/////////

    # resImpact = dict()
    #     for data in test :
    #         for datalist in data :
    #             if datalist in resImpact :
    #                 resImpact[datalist] += [(data[datalist])]
    #             else :
    #                 resImpact[datalist] = [data[datalist]]
    #     # print("ressssssssss",res)

    #     keyList = []
    #     for key in resImpact.keys() :
    #         keyList.append(key)

    #     internal = []
    #     listTest = []
    #     for i in range(len(keyList)) :
    #         test = len(resImpact[keyList[i]])
    #         # print("res keylist ",res[keyList[i]])
    #         listTest.append(test)
    #     print("list testtttt ",listTest)
        
    #     testRest = dict()
    #     for key in resImpact :
    #         testRest[key] = []
    #         for val in resImpact[key] :
    #             testRest[key].append(val)

# /////// End of UnImpacted //////////

    placeCause = {}
    for key in testRest :
        for i in range(len(testRest[key])) :
            # print("test rest 2011 ",testRest[key][i][0])
            if testRest[key][i][0] == 'Internal' :
                placeCause = {}
                placeCause[key] = testRest[key][i][0]
                internal.append(placeCause)  ## INTERNAL DICT

    internalList = defaultdict(list)
    for i in range(len(internal)) :
        for key, value in internal[i].items() :
            internalList[key].append(value)
    dictInternal = dict(internalList)

    countList = []
    for i in range(len(keyList)) :
        # # if key in dictInternal :
        if keyList[i] in dictInternal :
            testttt = len(dictInternal.get(keyList[i]))
            countList.append(testttt)
        else :
            countList.append(0)

    totalInternal = len(internal)
    
    # ////// External /////////
    externalList = []
    for i in range(len(countList)) :
        externalValue = listTest[i] - countList[i]
        externalList.append(externalValue)

    totalExternal = totalImpact - totalInternal

# /////////////////////////////////////////////////////////////////
    # print("year list ",keyList)
    # print("internal list", countList)
    # print("Total impact ", listTest)
    # print("external list ",externalList)
    # print("totalExternal",totalExternal)
    # print("totalInternal",totalInternal) 
    # print("totalImpact",totalImpact)
# ///////////////////////////////////////////////////////////////////////

    # ///////// Detail
    # //////// accident
    accident = conn.cursor()
    accident.execute("SELECT * FROM [PowerHistory].[dbo].[Accident] inner join [PowerHistory].[dbo].[ColumnName] on [ColumnName].[ColumnName] = [Accident].[ColumnName] Order by Date asc")
    accidentResult = accident.fetchall()
    # print(accidentResult)

    accidentDict = {}
    accidentList = []
    listID = []

    testttDict = {}

    for data in accidentResult :

        getId = int(data.accID)
        if getId not in listID :
            listID.append(getId)

        testttDict = [{data.ColumnName : data.accValue, "columnID" : data.ColumnID}]
        accidentDict = {}
        accidentDict[data.Date[:4]] = [
            {"accID" : data.accID, "Value" : testttDict, "Date" : data.Date[:10]}]
        accidentList.append(accidentDict)

    print(len(accidentResult))
    print(max(listID))

    listAccident = defaultdict(list)
    for i in range(len(accidentList)) :
        for key, value in accidentList[i].items() :
            listAccident[key].append(value)
    dictAccident = dict(listAccident)

# //////// detail
    detail = conn.cursor()
    detail.execute("SELECT * FROM [PowerHistory].[dbo].[Detail] inner join [PowerHistory].[dbo].[ColumnName] on [ColumnName].[ColumnName] = [Detail].[DetailColumn] order by [ID] asc")
    detailResult = detail.fetchall()

    detailDict = {}
    detailList = []
    detailID = []

    valueDict = {}

    for data in detailResult :

        getId = int(data.ID)
        if getId not in detailID :
            detailID.append(getId)

        valueDict = [{data.DetailColumn : data.DetailValue, "columnID" : data.ColumnID, "detailID" : int(data.detailID) }]
        detailDict = {}
        detailDict[data.ID] = [{"accID": data.ID, "Value" : valueDict}]
        detailList.append(detailDict)

    # print(len(accidentResult))
    # print(max(listID))

    listDetail = defaultdict(list)
    for i in range(len(detailList)) :
        for key, value in detailList[i].items() :
            listDetail[key].append(value)
    dictDetail = dict(listDetail)

    # print(detailResult)

# for detail in detailResult :


    dataDict['Summary'] = {}
    dataDict['Summary']['Year'] = dateList
    dataDict['Summary']['InternalList'] = countList
    dataDict['Summary']['ExternalList'] = externalList
    dataDict['Summary']['totalInternal'] = totalInternal
    dataDict['Summary']['totalExternal'] = totalExternal
    dataDict['Summary']['totalImpact'] = listTest
    dataDict['Summary']['total'] = totalImpact

    dataDict['Accident'] = {}
    dataDict['Accident'] = dictAccident

    dataDict['Detail'] = {}
    dataDict['Detail'] = dictDetail

    return HttpResponse(
        json.dumps(dataDict),
        content_type='application/javascript; charset=utf8')


def Test(request) :
    if request.method == "POST":
        img = request.FILES['avatar']
        img_extension = os.path.splitext(img.name)[1]

        user_folder = 'statics/profile/'
        if not os.path.exists(user_folder):
            os.mkdir(user_folder)

        imageTuple = user_folder, 'avatar', img_extension
        img_save_path = ''.join(imageTuple) 
        with open(img_save_path, 'wb+') as f:
            for chunk in img.chunks():
                f.write(chunk)

    return render(request, 'dashboard/test.html')