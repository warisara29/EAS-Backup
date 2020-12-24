import pyodbc
from json import encoder, JSONDecoder, JSONEncoder
import json
import decimal
import collections
# Some other example server values are
# server = 'localhost\sqlexpress' # for a named instance
# server = 'myserver,port' # to specify an alternate port


#create table
#cursor.execute('DROP TABLE IF EXISTS series') #check if there is already had data table delete it
#cursor.execute('create table series (name TEXT, age Integer)')
#conn.commit()

#insert data to table
#cursor.execute('insert into data(name, age)values(?,?)', ('Dora', 17))
#conn.commit()

#select data from table

    #print("data from table are" , row)




server = 'localhost\SQLEXPRESS' 
database = 'ION' 
username = 'sa' 
password = 'sa1234' 
conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
cursor=conn.cursor()
date = '2020-08-05'
date2 = '2020-08-05'
cursor.execute("select tblPoint.PointID, tblPoint.PointName, tblPoint.UnitName, tblPoint.Operation, tblPoint.PointType, tblTrendAnalog.ActualValue, tblTrendAnalog.PointDate from tblPoint inner join tblTrendAnalog on tblPoint.PointID = tblTrendAnalog.PointID where tblPoint.PointType='PRIMARY' and tblTrendAnalog.PointDate >= '"+date+"' and tblTrendAnalog.PointDate <= '"+date2+"' ")
result = cursor.fetchall()

y = len(result)
print(y)


    
data_list = []

for data in result:
    test = data.PointDate
    #print(test)
    timeStamp = test.strftime("%Y-%m-%d")
    #print(timeStamp)
    t = (data.PointID, data.PointName, data.UnitName, data.Operation, data.PointType, timeStamp, data.ActualValue)
    data_list.append(t)

j = json.dumps(data_list)
#print (j)

object_list = []
for data in result:
    d = collections.OrderedDict()
    test = data.PointDate
    #print(test)
    timeStamp = test.strftime("%Y-%m-%d")
    #print(timeStamp)
    d[data.PointID]['ID'] = data.PointID
    d[data.PointID]['PointName'] = data.PointName
    d[data.PointID]['UnitName'] = data.UnitName
    d[data.PointID]['Operation'] = data.Operation
    d[data.PointID]['Type'] = data.PointType
    d[data.PointID]['Date'] = timeStamp
    d[data.PointID]['ActualValue'] = data.ActualValue
    object_list.append(d)

    print(d)

    # for dataName in object_list :
    #     d = dataName.PointName
    #     print(d)

#j = json.dumps(object_list)
#object_file = 'datajoin_object.json'
#f = open(object_file, j,'w')
#print (f)

#print(object_list)
conn.close()