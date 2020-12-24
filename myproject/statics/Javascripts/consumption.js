var selectAr = [];

$('#week1').hide()
$('#week2').hide()

$('#month1').hide()
$('#month2').hide()

$('#year').hide()


// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/consumptionData/",
    dataType: "json",
    success: function (data) {
      getData = data;
      //obj = JSON.parse(getData)
      //console.log("obj ",obj)
      getValue = [];
      for (i = 0; i < getData.length; i++) {
        if (getData[i].name) {
          name = getData[i].name;
          value = getData[i].data;
          getValue.push(name, value);
        }
        // getDataList = data.data
      }

      console.log("dataaaaaaaaa", data[12])
      getDate = getData[10];

      getIndex = getData[11];

      getSummary = getData[12]
      getTotalValue = getData[13]
      console.log("index ", getIndex);

      console.log("get data ", getData);
      console.log("get name ", getValue);
      console.log("get date ", getDate);
      console.log("getTotalValue", getTotalValue)

      GetData(getData, getValue, getDate, getIndex, getSummary, getTotalValue);
    },

  });

  // get index of select choices
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/SelectOption/",
    dataType: "json",
    success: function (index) {
      //console.log(index);
      //console.log("indexxxxxxx",Object.values(index["trend"][0]))

      selectAr = index;

      series = Object.values(index["trend"][0])
      console.log(series)
      date = index["date"]
      system = index["system"]
      // test = index["Slider"]["FIX CHILLER"]

      //console.log("57 ", series)

      //console.log("selectAr", selectAr["Drive"])

      for (const [key, value] of Object.entries(index)) {
        if (key == "date" || key == "system" || key == "trend" || key == "Seagate") {

        } else {
          $('.chosen-value-operation').append("<option value='" + key + "'>" + key + "</option>")
        }
      }

      checkData(series, date, system)
    },
  });

  $('.chosen-value-operation').select2({
    placeholder: 'Select Operation',
    theme: "classic"
  });

  $('.chosen-value-systems').select2({
    placeholder: 'Select System',
    theme: "classic"
  });

  $('.chosen-value-point').select2({
    placeholder: 'Select Utility',
    theme: "classic"
  });

  $('.chosen-value-fullpoint').select2({
    placeholder: 'Select Point',
    theme: "classic"
  });

  $('.chosen-date').select2({
    placeholder: 'Select Type',
    theme: "classic"
  })

  $('.month1').select2('close')
  // ({
  //   placeholder: 'Select Type',
  //   theme: "classic"
  // })

  $('.month2').select2({
    placeholder: 'Select Type',
    theme: "classic"
  })
});

function GetData(getData, getValue, getDate, getIndex, getSummary, getTotalValue) {
  // console.log("function ", getDate.length);
  // console.log("name ", getData[0].data);
  // console.log("function get index ", getIndex[1].index);
  // console.log("aaaa ", getIndex.length);

  percentList = [];
  len = getDate.length - 1;

  for (percent = 0; percent < len; percent++) {
    //console.log("errrrr ", getIndex[percent].index);
    indexPercent = getIndex[percent].index;
    //console.log("len percent ", len(indexPercent))
    percentList.push(indexPercent);
  }

  head_name = [];
  for (i = 0; i < getDate.length; i++) {
    //console.log(i);
    if (head_name.indexOf(getDate[i]) === -1) {
      head_name.push(getDate[i]);
    }
  }
  console.log("head name ", head_name);

  var table = document.createElement("table");
  table.setAttribute("id", "main-table");
  table.setAttribute("class", "main-table");

  var tr = table.insertRow(-1);

  for (i = 0; i < head_name.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = head_name[i];
    th.colSpan = 2;

    tr.appendChild(th);
  }

  var powerList = ["Opration Name"];
  for (i = 0; i < head_name.length - 1; i++) {
    powerList.push("Used (kW)");
    powerList.push("Percent (%)");
  }

  tr = table.insertRow(1);
  for (power = 0; power < powerList.length; power++) {
    var insertPower = tr.insertCell();
    if (power == 0) {
      insertPower.colSpan = 2;
    }
    insertPower.innerHTML = powerList[power];
  }

  for (i = 0; i < getData.length; i++) {
    var name_value = getData[i].name;
    if (name_value) {
      //console.log("get data ",getData[i].name, " ",getData[i].data)
      var loop = getData[i].data;
      var sort_loop = loop.slice();
      var loop_list = [];
      loop_list.push(getData[i].name);
      //loop_list.push(" ")
      for (j = 0; j < sort_loop.length; j++) {
        if (sort_loop[j + 1] == sort_loop[j]) {
          loop_list.push(sort_loop[j]);
        } else {
          loop_list.push(sort_loop[j]);
          //loop_list.push(percentList[0][0])
        }
        loop_list.push(percentList[j][i] + "%");
      }

      tr = table.insertRow();
      for (k = 0; k < loop_list.length; k++) {
        var insertData = tr.insertCell();
        if (k == 0) {
          insertData.colSpan = 2;
        }
        insertData.innerHTML = loop_list[k];
      }
    }
  }

  var showTable = document.getElementById("table-scroll");
  showTable.innerHTML = "";
  showTable.appendChild(table);

  $("tr")
    .not(":first")
    .hover(
      function () {
        $(this).css("background", "#567ad5");
      },
      function () {
        $(this).css("background", "");
      }
    );

  console.log("summary222", getSummary)

  //plot table th
  for (i = 0; i < getDate.length; i++) {
    $("#th-date").append('<th id="header" scope="col" colspan = 2>' + getDate[i] + '</th>')
  }


  for (i = 0; i < getSummary.length; i++) {
    system = Object.keys(getSummary[i])
    $("#ul-tab").append('<li class="nav-item"><a class="nav-link" href="#" value="' + system + '">' + system + '</a></li>')
    getSummary[i][system]["pointname"] = [... new Set(getSummary[i][system]["pointname"])]
    console.log(getSummary[i][system]["pointname"])
  }
  // console.log("output value", outputValue)

  // plot power and used
  $("#sub-th").append('<th id="first-column" scope="row" colspan = 2></th>')
  for (i = 1; i < getDate.length; i++) {
    $("#sub-th").append('<td id="unit" scope="col">Used (kW)</td>')
    $("#sub-th").append('<td id="unit" scope="col">Percent (%)</td>')
  }

  //set drive Fix เป็นค่าเริ่มต้น
  $("#ul-tab li").first().addClass("active")
  for (j = 0; j < Object.keys(getTotalValue).length; j++) {
    if (Object.keys(getTotalValue)[j] == 'Drive FIX') {
      // console.log(Object.keys(getTotalValue['Drive FIX']))
      for (i = 0; i < getSummary.length; i++) {
        if (Object.keys(getSummary[i]) == 'Drive FIX') {
          getSummary[i]['Drive FIX']["pointname"].push("Other")
          getSummary[i]['Drive FIX']["pointname"].push("Total")
          getKey = Object.keys(getSummary[i]['Drive FIX'])
          getKey.shift()
          for (k = 0; k < getTotalValue['Drive FIX'].length; k++) {
            // console.log(getKey)
            if ((getKey[k]) == Object.keys(getTotalValue['Drive FIX'][k])) {
              var result = getSummary[i]['Drive FIX'][getKey[k]].map(function (x) {
                return parseInt(x, 10);
              });
              var sumValue = result.reduce((a, b) => a + b, 0)
              var other = Object.values(getTotalValue['Drive FIX'][k])[0] - sumValue
              console.log(other)
              getSummary[i]['Drive FIX'][getKey[k]] = result
              getSummary[i]['Drive FIX'][getKey[k]].push(other)
              getSummary[i]['Drive FIX'][getKey[k]].push(Object.values(getTotalValue['Drive FIX'][k])[0])
              getSummary[i]['Drive FIX'][getKey[k]] = [... new Set(getSummary[i]['Drive FIX'][getKey[k]])]

              var percent = getSummary[i]['Drive FIX'][getKey[k]].map(function (x) {
                return parseFloat(((x / Object.values(getTotalValue['Drive FIX'][k])[0]) * 100).toFixed(2)) +"%";
              });
              console.log(percent)
              getSummary[i]['Drive FIX'][getKey[k] + "Percent"] = percent
              // getSummary[i]['Drive FIX'].push([{
              //   percent : percent
              // }])
            }
          }
          getSummary[i]['Drive FIX']["pointname"] = [... new Set(getSummary[i]['Drive FIX']["pointname"])]
          driveSet = getSummary[i]['Drive FIX']["pointname"]
        }
      }
    }
  }
  driveSummary = driveSet
  // console.log(getSummary)

  var valueList = []
  var pointname = []
  for (i = 0; i < getSummary.length; i++) {
    // console.log(getSummary[i])
    $.each(getSummary[i], function (key, value) {
      // console.log(key)
      // console.log("462",href)
      if ('Drive FIX' == key) {
        console.log(getSummary[i][key])
        var sortObject = Object.fromEntries(Object.entries(getSummary[i][key]).sort())
        console.log(sortObject)

        $.each(sortObject, function (key, value) {
          if (key == 'pointname') {
            pointname.push(value)
          } else {
            valueList.push(value)
          }
        })
      }
    })
  }

  var rows = valueList;
  // console.log(rows[0])
  var result = [];
  for (var i = 0; i < rows[0].length; i++) {
    result[i] = new Array(rows[0].length).fill();

    for (var j = 0; j < rows.length; j++) {
      result[i][j] = rows[j][i]; // Here is the fixed column access using the outter index i.
    }
  }
  // console.log(result.length)


  // var resultF = result.filter(x => x !== undefined)
  for (i = 0; i < result.length; i++) {
    result[i] = result[i].filter(x => x !== undefined)
  }
  // console.log(result)

  $('#pointname tr').remove()
  // console.log(result)
  var resultFinal = result
  var table = $('#pointname');
  var row, cell;
  for (var i = 0; i < pointname[0].length; i++) {
    // $('#pointname').append('<tr><td colspan=2>'+pointname[0][i]+'</td></tr>')
    row = $('<tr />');
    row.id = "contOp";
    table.append(row);
    firstChild = $('<td colspan=2>' + pointname[0][i] + '</td>')
    row.append(firstChild)
    for (var j = 0; j < resultFinal[i].length; j++) {
      //firstChild =  $('<td>'+pointname[0][i]+'</td>')
      cell = $('<td>' + resultFinal[i][j] + '</td>')
      // row.append(firstChild)
      row.append(cell);
    }
  }
  // if user click
  var href;
  var driveSummary;
  var driveList;
  $('ul.nav li a').click(function (event) {
    $('#pointname tr').remove()
    //event.preventDefault();
    href = $(event.target).text();
    console.log("href", href)
    if (href == 'Drive FIX') {
      $('li a').removeClass("active");
      $(this).addClass("active");
      for (j = 0; j < Object.keys(getTotalValue).length; j++) {
        if (Object.keys(getTotalValue)[j] == 'Drive FIX') {
          // console.log(Object.keys(getTotalValue['Drive FIX']))
          for (i = 0; i < getSummary.length; i++) {
            if (Object.keys(getSummary[i]) == 'Drive FIX') {
              getSummary[i]['Drive FIX']["pointname"].push("Other")
              getSummary[i]['Drive FIX']["pointname"].push("Total")
              getKey = Object.keys(getSummary[i]['Drive FIX'])
              getKey.shift()
              for (k = 0; k < getTotalValue['Drive FIX'].length; k++) {
                // console.log(getKey)
                if ((getKey[k]) == Object.keys(getTotalValue['Drive FIX'][k])) {
                  var result = getSummary[i]['Drive FIX'][getKey[k]].map(function (x) {
                    return parseInt(x, 10);
                  });
                  var sumValue = result.reduce((a, b) => a + b, 0)
                  var other = Object.values(getTotalValue['Drive FIX'][k])[0] - sumValue
                  console.log(other)
                  getSummary[i]['Drive FIX'][getKey[k]] = result
                  getSummary[i]['Drive FIX'][getKey[k]].push(other)
                  getSummary[i]['Drive FIX'][getKey[k]].push(Object.values(getTotalValue['Drive FIX'][k])[0])
                  getSummary[i]['Drive FIX'][getKey[k]] = [... new Set(getSummary[i]['Drive FIX'][getKey[k]])]

                  var percent = getSummary[i]['Drive FIX'][getKey[k]].map(function (x) {
                    return parseFloat(((x / Object.values(getTotalValue['Drive FIX'][k])[0]) * 100).toFixed(2)) +"%";
                  });
                  console.log(percent)
                  getSummary[i]['Drive FIX'][getKey[k] + "Percent"] = percent
                  // getSummary[i]['Drive FIX'].push([{
                  //   percent : percent
                  // }])
                }
              }
              getSummary[i]['Drive FIX']["pointname"] = [... new Set(getSummary[i]['Drive FIX']["pointname"])]
              driveSet = getSummary[i]['Drive FIX']["pointname"]
            }
          }
        }
      }
      driveSummary = driveSet
      console.log(getSummary)
    } else if (href == 'Drive VAR') {
      $('li a').removeClass("active");
      $(this).addClass("active");
      for (j = 0; j < Object.keys(getTotalValue).length; j++) {
        if (Object.keys(getTotalValue)[j] == 'Drive VAR') {
          console.log(Object.keys(getTotalValue['Drive VAR']))
          for (i = 0; i < getSummary.length; i++) {
            if (Object.keys(getSummary[i]) == 'Drive VAR') {
              getSummary[i]['Drive VAR']["pointname"].push("Other")
              getSummary[i]['Drive VAR']["pointname"].push("Total")
              getKey = Object.keys(getSummary[i]['Drive VAR'])
              getKey.shift()
              for (k = 0; k < getTotalValue['Drive VAR'].length; k++) {
                console.log(getKey)
                if ((getKey[k]) == Object.keys(getTotalValue['Drive VAR'][k])) {
                  var result = getSummary[i]['Drive VAR'][getKey[k]].map(function (x) {
                    return parseInt(x, 10);
                  });
                  var sumValue = result.reduce((a, b) => a + b, 0)
                  var other = Object.values(getTotalValue['Drive VAR'][k])[0] - sumValue
                  console.log(other)
                  getSummary[i]['Drive VAR'][getKey[k]] = result
                  getSummary[i]['Drive VAR'][getKey[k]].push(other)
                  getSummary[i]['Drive VAR'][getKey[k]].push(Object.values(getTotalValue['Drive VAR'][k])[0])
                  getSummary[i]['Drive VAR'][getKey[k]] = [... new Set(getSummary[i]['Drive VAR'][getKey[k]])]

                  var percent = getSummary[i]['Drive VAR'][getKey[k]].map(function (x) {
                    return parseFloat(((x / Object.values(getTotalValue['Drive VAR'][k])[0]) * 100).toFixed(2))+"%";
                  });
                  console.log(percent)
                  getSummary[i]['Drive VAR'][getKey[k] + "Percent"] = percent
                }
              }
              getSummary[i]['Drive VAR']["pointname"] = [... new Set(getSummary[i]['Drive VAR']["pointname"])]
            }
          }
        }
      }
    } else if (href == 'HSA FIX') {
      $('li a').removeClass("active");
      $(this).addClass("active");
      for (j = 0; j < Object.keys(getTotalValue).length; j++) {
        if (Object.keys(getTotalValue)[j] == 'HSA FIX') {
          console.log(Object.keys(getTotalValue['HSA FIX']))
          for (i = 0; i < getSummary.length; i++) {
            if (Object.keys(getSummary[i]) == 'HSA FIX') {
              getSummary[i]['HSA FIX']["pointname"].push("Other")
              getSummary[i]['HSA FIX']["pointname"].push("Total")
              getKey = Object.keys(getSummary[i]['HSA FIX'])
              getKey.shift()
              for (k = 0; k < getTotalValue['HSA FIX'].length; k++) {
                console.log(getKey)
                if ((getKey[k]) == Object.keys(getTotalValue['HSA FIX'][k])) {
                  var result = getSummary[i]['HSA FIX'][getKey[k]].map(function (x) {
                    return parseInt(x, 10);
                  });
                  var sumValue = result.reduce((a, b) => a + b, 0)
                  var other = Object.values(getTotalValue['HSA FIX'][k])[0] - sumValue
                  console.log(other)
                  getSummary[i]['HSA FIX'][getKey[k]] = result
                  getSummary[i]['HSA FIX'][getKey[k]].push(other)
                  getSummary[i]['HSA FIX'][getKey[k]].push(Object.values(getTotalValue['HSA FIX'][k])[0])
                  getSummary[i]['HSA FIX'][getKey[k]] = [... new Set(getSummary[i]['HSA FIX'][getKey[k]])]

                  var percent = getSummary[i]['HSA FIX'][getKey[k]].map(function (x) {
                    return parseFloat(((x / Object.values(getTotalValue['HSA FIX'][k])[0]) * 100).toFixed(2)) +"%";
                  });
                  console.log(percent)
                  getSummary[i]['HSA FIX'][getKey[k] + "Percent"] = percent
                }
              }
              getSummary[i]['HSA FIX']["pointname"] = [... new Set(getSummary[i]['HSA FIX']["pointname"])]
            }
          }
        }
      }
    } else if (href == 'HSA VAR') {
      $('li a').removeClass("active");
      $(this).addClass("active");
      hsaVarvalue = ["Total"]
      hsaVarList = ["Bldg.1A & Bldg.2A"]
      console.log("eeeee", getTotalValue['HSA VAR'])
      $.each(getTotalValue['HSA VAR'], function(key,value){
        console.log(value)
        hsaVarList.push(Object.values(value)[0], "100%")
        hsaVarvalue.push(Object.values(value)[0], "100%")
      })
      console.log("hsa var", hsaVarList)
      hsaVarList = [hsaVarList]
      hsaVarvalue = [hsaVarvalue]

      var table = document.getElementById('pointname')
      var row = {}
      var cell = {}
      hsaVarList.forEach(function(rowData){
        row = table.insertRow(-1)
        rowData.forEach(function(cellData){
          cell = row.insertCell()
          cell.textContent = cellData
        })
      })
      var row2 = {}
      var cell2 = {}
      hsaVarvalue.forEach(function(rowD){
        row2 = table.insertRow(-1)
        rowD.forEach(function(cellD){
          cell2 = row2.insertCell()
          cell2.textContent = cellD
        })
      })
      
      // $('#pointname td:first[colspan=2]')
      $('#pointname').append(row)
      $('#pointname').append(row2)

      $('#pointname td:first').attr('colspan',2)
      $('#pointname tr:last td:first').attr('colspan',2)
      

      // $('#pointname').append('<tr></tr>')
      // var row = $('tr />')
      // for (i=0; i < hsaVarList.length; i++) {
      //   row.append('<td>'+hsaVarList[i]+'</td>')
      // }
      // $('#pointname').append(row)

    } else if (href == 'Slider FIX') {
      $('li a').removeClass("active");
      $(this).addClass("active");
      for (j = 0; j < Object.keys(getTotalValue).length; j++) {
        if (Object.keys(getTotalValue)[j] == 'Slider FIX') {
          console.log(Object.keys(getTotalValue['Slider FIX']))
          for (i = 0; i < getSummary.length; i++) {
            if (Object.keys(getSummary[i]) == 'Slider FIX') {
              getSummary[i]['Slider FIX']["pointname"].push("Other")
              getSummary[i]['Slider FIX']["pointname"].push("Total")
              getKey = Object.keys(getSummary[i]['Slider FIX'])
              getKey.shift()
              for (k = 0; k < getTotalValue['Slider FIX'].length; k++) {
                console.log(getKey)
                if ((getKey[k]) == Object.keys(getTotalValue['Slider FIX'][k])) {
                  var result = getSummary[i]['Slider FIX'][getKey[k]].map(function (x) {
                    return parseInt(x, 10);
                  });
                  var sumValue = result.reduce((a, b) => a + b, 0)
                  var other = Object.values(getTotalValue['Slider FIX'][k])[0] - sumValue
                  console.log(other)
                  getSummary[i]['Slider FIX'][getKey[k]] = result
                  getSummary[i]['Slider FIX'][getKey[k]].push(other)
                  getSummary[i]['Slider FIX'][getKey[k]].push(Object.values(getTotalValue['Slider FIX'][k])[0])
                  getSummary[i]['Slider FIX'][getKey[k]] = [... new Set(getSummary[i]['Slider FIX'][getKey[k]])]

                  var percent = getSummary[i]['Slider FIX'][getKey[k]].map(function (x) {
                    return parseFloat(((x / Object.values(getTotalValue['Slider FIX'][k])[0]) * 100).toFixed(2)) +"%";
                  });
                  console.log(percent)
                  getSummary[i]['Slider FIX'][getKey[k] + "Percent"] = percent
                }
              }
              getSummary[i]['Slider FIX']["pointname"] = [... new Set(getSummary[i]['Slider FIX']["pointname"])]
            }
          }
        }
      }
    } else if (href == 'Slider VAR') {
      $('li a').removeClass("active");
      $(this).addClass("active");
      for (j = 0; j < Object.keys(getTotalValue).length; j++) {
        if (Object.keys(getTotalValue)[j] == 'Slider VAR') {
          console.log(Object.keys(getTotalValue['Slider VAR']))
          for (i = 0; i < getSummary.length; i++) {
            if (Object.keys(getSummary[i]) == 'Slider VAR') {
              getSummary[i]['Slider VAR']["pointname"].push("Bldg.1")
              getSummary[i]['Slider VAR']["pointname"].push("Total")
              getKey = Object.keys(getSummary[i]['Slider VAR'])
              getKey.shift()
              for (k = 0; k < getTotalValue['Slider VAR'].length; k++) {
                // console.log(getKey)
                if ((getKey[k]) == Object.keys(getTotalValue['Slider VAR'][k])) {
                  var result = getSummary[i]['Slider VAR'][getKey[k]].map(function (x) {
                    return parseInt(x, 10);
                  });
                  var sumValue = result.reduce((a, b) => a + b, 0)
                  var other = Object.values(getTotalValue['Slider VAR'][k])[0] - sumValue
                  console.log(other)
                  getSummary[i]['Slider VAR'][getKey[k]] = result
                  getSummary[i]['Slider VAR'][getKey[k]].push(other)
                  getSummary[i]['Slider VAR'][getKey[k]].push(Object.values(getTotalValue['Slider VAR'][k])[0])
                  getSummary[i]['Slider VAR'][getKey[k]] = [... new Set(getSummary[i]['Slider VAR'][getKey[k]])]

                  var percent = getSummary[i]['Slider VAR'][getKey[k]].map(function (x) {
                    return parseFloat(((x / Object.values(getTotalValue['Slider VAR'][k])[0]) * 100).toFixed(2)) +"%";
                  });
                  console.log(percent)
                  getSummary[i]['Slider VAR'][getKey[k] + "Percent"] = percent
                }
              }
              getSummary[i]['Slider VAR']["pointname"] = [... new Set(getSummary[i]['Slider VAR']["pointname"])]
            }
          }
        }
      }
    }

    var valueList = []
    var pointname = []
    for (i = 0; i < getSummary.length; i++) {
      // console.log(getSummary[i])
      $.each(getSummary[i], function (key, value) {
        // console.log(key)
        // console.log("462",href)
        if (href == key) {
          console.log(getSummary[i][key])
          var sortObject = Object.fromEntries(Object.entries(getSummary[i][key]).sort())
          console.log(sortObject)

          $.each(sortObject, function (key, value) {
            if (key == 'pointname') {
              pointname.push(value)
            } else {
              valueList.push(value)
            }
          })
        }
      })
    }

    var rows = valueList;
    console.log(rows[0])
    var result = [];
    for (var i = 0; i < rows[0].length; i++) {
      result[i] = new Array(rows[0].length).fill();

      for (var j = 0; j < rows.length; j++) {
        result[i][j] = rows[j][i]; // Here is the fixed column access using the outter index i.
      }
    }
    console.log(result.length)


    // var resultF = result.filter(x => x !== undefined)
    for (i = 0; i < result.length; i++) {
      result[i] = result[i].filter(x => x !== undefined)
    }
    console.log(result)

    console.log(result)
    var resultFinal = result
    var table = $('#pointname');
    var row, cell;
    for (var i = 0; i < pointname[0].length; i++) {
      // $('#pointname').append('<tr><td colspan=2>'+pointname[0][i]+'</td></tr>')
      row = $('<tr />');
      table.append(row);
      firstChild = $('<td colspan=2>' + pointname[0][i] + '</td>')
      row.append(firstChild)
      for (var j = 0; j < resultFinal[i].length; j++) {
        //firstChild =  $('<td>'+pointname[0][i]+'</td>')
        cell = $('<td>' + resultFinal[i][j] + '</td>')
        // row.append(firstChild)
        row.append(cell);
      }
    }
  })
  console.log(getSummary)
}

const inputField = document.querySelector(".chosen-value-systems");
const dropdown = document.querySelector(".value-list-systems");
const dropdownArray = document.querySelectorAll("li");
console.log(typeof dropdownArray); ``
dropdown.classList.add("open");
inputField.focus(); // Demo purposes only
let valueArray = [];
dropdownArray.forEach((item) => {
  valueArray.push(item.textContent);
});

const closeDropdown = () => {
  dropdown.classList.remove("open");
};

inputField.addEventListener("input", () => {
  dropdown.classList.add("open");
  let inputValue = inputField.value.toLowerCase();
  let valueSubstring;
  if (inputValue.length > 0) {
    for (let j = 0; j < valueArray.length; j++) {
      if (
        !(
          inputValue.substring(0, inputValue.length) ===
          valueArray[j].substring(0, inputValue.length).toLowerCase()
        )
      ) {
        dropdownArray[j].classList.add("closed");
      } else {
        dropdownArray[j].classList.remove("closed");
      }
    }
  } else {
    for (let i = 0; i < dropdownArray.length; i++) {
      dropdownArray[i].classList.remove("closed");
    }
  }
});

dropdownArray.forEach((item) => {
  item.addEventListener("click", (evt) => {
    inputField.value = item.textContent;
    dropdownArray.forEach((dropdown) => {
      dropdown.classList.add("closed");
    });
  });
});

inputField.addEventListener("focus", () => {
  inputField.placeholder = "Type to filter";
  dropdown.classList.add("open");
  dropdownArray.forEach((dropdown) => {
    dropdown.classList.remove("closed");
  });
});

inputField.addEventListener("blur", () => {
  inputField.placeholder = "Select state";
  dropdown.classList.remove("open");
});

document.addEventListener("click", (evt) => {
  const isDropdown = dropdown.contains(evt.target);
  const isInput = inputField.contains(evt.target);
  if (!isDropdown && !isInput) {
    dropdown.classList.remove("open");
  }
});


function SelectOperation(selectObject) {
  var selected = selectObject.value;
  console.log("select operation ", selected);
  $(".chosen-value-systems").empty();
  for (const [key, value] of Object.entries(selectAr[selected])) {
    console.log("TEST TEST " + key);
    $('.chosen-value-systems').append("<option value='" + key + "'>" + key + "</option>")
  }
  //checkData(selected)
}

function SelectSystem(selectObject) {


  var operation = $("select.chosen-value-operation option:checked").val();
  var systems = $("select.chosen-value-systems option:checked").val();
  var selectedOperation = selectAr[operation]
  var selected = selectObject.value;
  console.log("select system ", selected);
  //$(".chosen-value-systems").empty();
  Utility = []
  for (const [key, value] of Object.entries(selectedOperation[systems])) {
    console.log("TEST TEST " + key);
    var utility = key.slice(0, 4)

    if (Utility.indexOf(utility) === -1) {
      $('.chosen-value-point').append("<option value='" + utility + "'>" + utility + "</option>")
      Utility.push(utility)
    }
  }
}

function SelectPoint(selectObject) {
  var point = $("select.chosen-value-point").val();
  var operation = $("select.chosen-value-operation option:checked").val();
  var systems = $("select.chosen-value-systems option:checked").val();
  var selected = selectObject.value;
  console.log("selected Point ", point);

  var selectedPoint = selectAr[operation][systems]
  console.log("select point ", point)

  //Pointlist = []
  $('.chosen-value-fullpoint').find("option").remove().end()
  for (const [key, value] of Object.entries(selectedPoint)) {

    for (i = 0; i < point.length; i++) {
      if ((key.indexOf(point[i])) !== -1) {
        console.log("testttttttt ", key)
        $('.chosen-value-fullpoint').append("<option value='" + value + "'>" + key + "</option>")
        //$('.chosen-value-fullpoint').append("<option value='"+key+"'>"+key+"</option>")
      }
    }
  }
}

function SelectFullPoint(selectObject) {
  var fullpoint = $("select.chosen-value-fullpoint").val();
  var point = $("select.chosen-value-point").val();
  var operation = $("select.chosen-value-operation option:checked").val();
  var systems = $("select.chosen-value-systems option:checked").val();
  var selected = selectObject.value;
  var selectedPoint = selectAr[operation][systems]
  console.log("selected Point ", fullpoint);

  valueList = []
  //$('.chosen-value-fullpoint').find("option").remove().end()
  for (const [key, value] of Object.entries(selectedPoint)) {
    for (i = 0; i < fullpoint.length; i++) {
      if (fullpoint[i] == key) {
        console.log("key " + key + " value " + value)
        valueList.push({
          "key": key,
          "value": value
        })
      }
    }
  }
  console.log(valueList)
  CheckValue(valueList)
  //return fullpoint
}

function CheckValue(valueList) {
  var check = $(".chosen-value-fullpoint").val()
  var name = $(".chosen-value-fullpoint").option
  console.log(check)
  console.log("value list ", valueList)

  console.log(name)
  test = []
  for (value = 0; value < checkValue.length; value++) {
    //console.log(checkValue[value]["PointID"])

    for (i = 0; i < check.length; i++) {
      if (check[i] == checkValue[value]["PointID"]) {
        console.log(checkValue[value]["Value"])
        test.push({
          "name": check[i],
          "data": checkValue[value]["Value"]
        })
      }
    }
  }
  console.log(test)

}


function checkData(series, date, system) {
  console.log("series ", series);
  //console.log("system", selected_system);
  //console.log("date hhhhhhhhhhhhhhhhhhhhhh", SliderFix_utility_date[0])
  Highcharts.chart("container-chart", {
    chart: {
      type: "spline",
    },
    title: {
      text: "Consumption Analysis Graph of " + system,
    },

    yAxis: {
      title: {
        text: "Number of Used (kW)",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "",
      },
      categories: date,
    },

    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
    },
    tooltip: {
      useHTML: true,
      backgroundColor: '#ffffff',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    colors: ['#FFFFFF', '#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#FF00FF', '#008000', '#FE4365'],
    series: series,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
}

function Chosen_date() {
  var chosen_date = $(".chosen-date").val()
  console.log("Choseeeeeeen ", chosen_date)

  if (chosen_date == "Daily") {
    alert(chosen_date)
    $('#date1').show()
    $('#date2').show()
    $('#week1').hide()
    $('#week2').hide()
    $('#month1').hide()
    $('#month2').hide()
  } else if (chosen_date == "Weekly") {
    alert(chosen_date)
    $('#week1').show()
    $('#week2').show()
    $('#date1').hide()
    $('#date2').hide()
    $('#month1').hide()
    $('#month2').hide()

  } else if (chosen_date == "Monthly") {
    alert(chosen_date)
    $('#month1').show()
    $('#month2').show()
    $('#year').show()
    $('#date1').hide()
    $('#date2').hide()
    $('#week1').hide()
    $('#week2').hide()
  } else {

  }
}






