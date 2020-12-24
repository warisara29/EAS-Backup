from datetime import datetime, date, timedelta

def dateRange(date1, date2):
    for n in range(int((date2 - date1).days)+1):
        yield date1 + timedelta(n)

date1 = ()
date2 = ()

if date1 and date2 :
    start_dt = date(date1)
    end_dt = date(date2)
    date_list = []
    for dt in dateRange(start_dt, end_dt):
        print(dt.strftime("%Y-%m-%d"))
        dateSet = dt.strftime("%Y-%m-%d")
        date_list.append(dateSet)
        
    #dateJ = json.dumps(date_list)

else :
    getdate1 = (date.today())
    getdate2 = (date.today())
    start_dt = (getdate1)
    end_dt = (getdate2)
    date_list = []
    for dt in dateRange(start_dt, end_dt):
        print(dt.strftime("%Y-%m-%d"))
        dateSet = dt.strftime("%Y-%m-%d")
        date_list.append(dateSet)
        print(date_list)