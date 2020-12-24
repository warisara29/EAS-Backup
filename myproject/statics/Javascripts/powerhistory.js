$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/PowerHistoryData/",
    dataType: "json",
    success: function (data) {
      getData = data;
      console.log(getData);
      summary = data.Summary;
      accident = data.Accident;
      detail = data.Detail;
      console.log("detail1", detail);
      Summary(summary);
      flucOveryear(summary, accident, detail);
      moreDetail(accident, detail);
      Detail(detail);
    },
  });
});

// Summary function is almost Perfectly Splendid!!
function Summary(summary) {
  console.log("summary", summary);
  var Year = summary["Year"];
  var InternalList = summary["InternalList"];
  var ExternalList = summary["ExternalList"];
  var totalImpact = summary["totalImpact"];

  sumOverall = [
    "Summary",
    summary["totalInternal"],
    summary["totalExternal"],
    summary["total"],
  ];
  thList = ["Year", "Internal", "External", "Total"];

  Year.push("Sum");
  InternalList.push(0, summary["totalInternal"]);
  ExternalList.push(0, summary["totalExternal"]);
  totalImpact.push(0, summary["total"]);

  // console.log(summary["Year"])
  // console.log(InternalList)
  // console.log(ExternalList)
  // console.log(totalImpact)
  // console.log(sumOverall)

  dataJson = [];
  for (i = 0; i < Year.length; i++) {
    dataJson.push({
      year: Year[i],
      internal: InternalList[i],
      external: ExternalList[i],
      total: totalImpact[i],
    });
  }

  console.log(dataJson);

  var summary_data = "";
  $.each(dataJson, function (key, value) {
    summary_data += "<tr>";
    summary_data += '<td id="year">' + value.year + "</td>";
    summary_data += "<td>" + value.internal + "</td>";
    summary_data += "<td>" + value.external + "</td>";
    summary_data += "<td>" + value.total + "</td>";
    summary_data += "</tr>";
  });

  $("#summary_table").append(summary_data);
  // $('#summary_table').DataTable({
  //   "searching": true, // false to disable search (or any other option)
  //   "paging": false,
  //   "info": false
  // });
}

// FlucOvaerYear, there are many bugs! (1) if not refresh the detail value will append (2) cannot display second , third, fourth detailID
function flucOveryear(summary, accident, detail) {
  console.log("detail", detail);
  var yearList = summary["Year"];
  var x = document.getElementById("detailData");
  var keyList = [];
  console.log(accident);
  $("#detailText").hide();
  $("#detailData").hide();
  $("#summary_table").on("click", "#year", function () {
    var year = $(this).text();
    if (year == "Sum") {
    } else {
      $("#textDetail").html("Korat power fluctuation of FY" + year);
      $("#detailText").show();
      $("#detailData").show();
    }
    console.log(accident);
    $.each(accident, function (key, value) {
      // console.log(key)
      if (year == key) {
        var combinedArray = [];
        for (i = 0; i < accident[year].length; i++) {
          combinedArray.push(accident[year][i][0]);
        }
        console.log("combine array", combinedArray);

        var output = [];
        combinedArray.forEach(function (item) {
          var existing = output.filter(function (v, i) {
            return v.accID == item.accID;
          });
          // console.log("existing",existing)
          if (existing.length) {
            var existingIndex = output.indexOf(existing[0]);
            output[existingIndex].Value = output[existingIndex].Value.concat(
              item.Value
            );
          } else {
            if (typeof item.Value == "string") item.Value = [item.Value];
            output.push(item);
          }
        });
        console.log("outputtttt babay!!!", output);

        //make output to be unique value here Dont forget to change the output variable

        columnIDList = [];
        for (i = 0; i < output.length; i++) {
          // console.log(output[i]["Value"][0]["columnID"])
          for (j = 0; j < output[i]["Value"].length; j++) {
            if (columnIDList.includes(output[i]["Value"][j]["columnID"])) {
            } else {
              columnIDList.push(output[i]["Value"][j]["columnID"]);
            }
          }
        }
        console.log(columnIDList.sort());

        var columnIDSort = columnIDList.sort();
        for (i = 0; i < output.length; i++) {
          arr = output[i]["Value"];
          sortArr = arr.sort(function (a, b) {
            return (
              columnIDSort.indexOf(a.columnID) -
              columnIDSort.indexOf(b.columnID)
            );
          });
          // console.log("i sort output ",sortArr)
        }
        // console.log(output[0]["Date"])

        // console.log("detail0",detail["1"])
        detailList = [];
        $.each(detail, function (key, value) {
          // detailList.push(detail[key])
          for (i = 0; i < detail[key].length; i++) {
            var combinedDetail = [].concat(detail[key][i]);
            detailList.push(combinedDetail);
          }
        });
        // console.log(detailList)
        detailObject = [];
        for (i = 0; i < detailList.length; i++) {
          detailObject.push(detailList[i][0]);
        }
        console.log(detailObject);
        var mergeDetail = [];
        detailObject.forEach(function (item) {
          var mergeValue = mergeDetail.filter(function (v, i) {
            return v.accID == item.accID;
          });
          if (mergeValue.length) {
            var mergeValueIndex = mergeDetail.indexOf(mergeValue[0]);
            mergeDetail[mergeValueIndex].Value = mergeDetail[
              mergeValueIndex
            ].Value.concat(item.Value);
          } else {
            if (typeof item.Value == "string") item.Value = [item.Value];
            mergeDetail.push(item);
          }
        });
        console.log("merge detail 0", mergeDetail[0]["Value"]);

        //var uniqueDetailList = []
        for (i = 0; i < mergeDetail.length; i++) {
          var uniqueDetail = mergeDetail[i]["Value"].filter(function (
            value,
            index,
            self
          ) {
            return self.indexOf(value) === index;
          });
          mergeDetail[i]["Value"] = uniqueDetail;
        }
        console.log("mergeDetail", mergeDetail);

        columnIDList = [];
        for (i = 0; i < mergeDetail.length; i++) {
          // console.log(output[i]["Value"][0]["columnID"])
          for (j = 0; j < mergeDetail[i]["Value"].length; j++) {
            if (columnIDList.includes(mergeDetail[i]["Value"][j]["columnID"])) {
            } else {
              columnIDList.push(mergeDetail[i]["Value"][j]["columnID"]);
            }
          }
        }
        // console.log("detailIDList",detailIDList)

        // get Unique value of detail
        detailIDList = [];
        for (i = 0; i < mergeDetail.length; i++) {
          // console.log(output[i]["Value"][0]["columnID"])
          for (j = 0; j < mergeDetail[i]["Value"].length; j++) {
            if (detailIDList.includes(mergeDetail[i]["Value"][j]["detailID"])) {
            } else {
              detailIDList.push(mergeDetail[i]["Value"][j]["detailID"]);
            }
          }
        }
        console.log("detailIDList", detailIDList);

        // parse INT
        var detailIDInt = detailIDList.map(function (x) {
          return parseInt(x, 10);
        });

        console.log("detailIDInt", detailIDInt);

        // sort column list by column ID
        var columnIDSort = columnIDList.sort();
        console.log("columnIDSort", columnIDSort);

        // sort detail column list
        var detailIDSort = detailIDInt.sort();
        console.log("detailIDSort", detailIDSort);

        // sort ID by column ID
        for (i = 0; i < mergeDetail.length; i++) {
          arr = mergeDetail[i]["Value"];
          sortID = arr.sort(function (a, b) {
            return (
              columnIDSort.indexOf(a.columnID) -
              columnIDSort.indexOf(b.columnID)
            );
          });
        }
        // console.log("mergeDetail",mergeDetail)

        // sort detail ID by detail column ID
        for (i = 0; i < mergeDetail.length; i++) {
          arr = mergeDetail[i]["Value"];
          sortID = arr.sort(function (a, b) {
            return (
              detailIDSort.indexOf(a.columnID) -
              detailIDSort.indexOf(b.columnID)
            );
          });
          // console.log("i sort output ",sortID)
        }
        console.log("mergeDetail", mergeDetail);

        // concat accident and detail
        var mergeAccDetail = output.concat(mergeDetail);
        console.log("mergeAccDetail", mergeAccDetail);

        // merge detail that have same ID
        var mergeAccDetailList = [];
        mergeAccDetail.forEach(function (item) {
          var combinedValue = mergeAccDetailList.filter(function (v, i) {
            return v.accID == item.accID;
          });
          if (combinedValue.length) {
            var valueIndex = mergeAccDetailList.indexOf(combinedValue[0]);
            mergeAccDetailList[valueIndex].Value = mergeAccDetailList[
              valueIndex
            ].Value.concat(item.Value);
          } else {
            if (typeof item.Value == "string") item.Value = [item.Value];
            mergeAccDetailList.push(item);
          }
        });
        console.log("mergeAccDetailList", mergeAccDetailList);

        // final dict for create JSON
        finalAccDetailList = [];
        for (i = 0; i < output.length; i++) {
          finalAccDetailList.push(mergeAccDetailList[i]);
        }
        console.log("finalAccDetailList", finalAccDetailList);

        for (i = 0; i < finalAccDetailList.length; i++) {
          var UniqueAcc = finalAccDetailList[i]["Value"].filter(
            (value, index, valueArr) => valueArr.indexOf(value) === index
          );
          finalAccDetailList[i]["Value"] = UniqueAcc;
          finalAccDetailList[i]["Value"].sort((a, b) =>
            a.columnID > b.columnID ? 1 : b.columnID > a.columnID ? -1 : 0
          );
        }
        // console.log("UniqueFinal", finalAccDetailList[25]["Value"][0]);

        for (i = 0; i < finalAccDetailList.length; i++) {
          var UniqueDetailAcc = finalAccDetailList[i]["Value"].filter(
            (value, index, valueArr) => valueArr.indexOf(value) === index
          );
          finalAccDetailList[i]["Value"] = UniqueDetailAcc;
          finalAccDetailList[i]["Value"].sort((a, b) =>
            a.detailID > b.detailID ? 1 : b.detailID > a.detailID ? -1 : 0
          );
        }
        //console.log("UniqueFinal", finalAccDetailList[25]["Value"][0]);

        // Create Json File
        outputJson = [];
        test = [];

        for (data = 0; data < finalAccDetailList.length; data++) {
          var date = finalAccDetailList[data]["Date"];
          var accID = finalAccDetailList[data]["accID"];
          var Impact;
          var ImpactProduction;
          var RootCause;
          var Time;
          var Duration;
          var Voltage;
          var Sag;
          var File;
          var image;
          if (finalAccDetailList[data]["accID"] <= 343) {
            for (i = 0; i < finalAccDetailList[data]["Value"].length; i++) {
              $.each(finalAccDetailList[data]["Value"][i], function (key, value) {
                var checkKey = Object.keys(finalAccDetailList[data]["Value"][i]);
                if (checkKey[0] == "Impact") {
                  Impact = finalAccDetailList[data]["Value"][i][checkKey[0]];
                  // console.log("impacttttt", Impact)
                } else if (checkKey[0] == "ImpactProduction") {
                  ImpactProduction =
                    finalAccDetailList[data]["Value"][i][checkKey[0]];
                } else if (checkKey[0] == "RootCause") {
                  RootCause = finalAccDetailList[data]["Value"][i][checkKey[0]];
                } else if (checkKey[0] == "Time") {
                  Time = finalAccDetailList[data]["Value"][i][checkKey[0]]
                } else if (checkKey[0] == "Duration") {
                  Duration = finalAccDetailList[data]["Value"][i][checkKey[0]]
                } else if (checkKey[0] == "Voltage") {
                  Voltage = (
                    finalAccDetailList[data]["Value"][i][checkKey[0]] * 1
                  ).toFixed(2)
                } else if (checkKey[0] == "Sag") {
                  Sag = (
                    finalAccDetailList[data]["Value"][i][checkKey[0]] * 1
                  ).toFixed(2)
                } else if (checkKey[0] == "Files") {
                  Duration = finalAccDetailList[data]["Value"][i][checkKey[0]]
                } else if (checkKey[0] == "Image") {
                  Duration = finalAccDetailList[data]["Value"][i][checkKey[0]]
                }
              });
            }
            outputJson.push({
              Date: date,
              Impact: Impact,
              ImpactProduction: ImpactProduction,
              RootCause: RootCause,
              Time: Time,
              Duration: Duration,
              Voltage: Voltage,
              Sag: Sag,
              File: "No file",
              Image: "No image",
              ID: accID,
            });
          } else {
            for (i = 0; i < finalAccDetailList[data]["Value"].length; i++) {
              $.each(finalAccDetailList[data]["Value"][i], function (key, value) {
                var checkKey = Object.keys(finalAccDetailList[data]["Value"][i]);
                if (checkKey[0] == "Impact") {
                  Impact = finalAccDetailList[data]["Value"][i][checkKey[0]];
                  // console.log("impacttttt", Impact)
                } else if (checkKey[0] == "ImpactProduction") {
                  ImpactProduction =
                    finalAccDetailList[data]["Value"][i][checkKey[0]];
                } else if (checkKey[0] == "RootCause") {
                  RootCause = finalAccDetailList[data]["Value"][i][checkKey[0]];
                } else if (checkKey[0] == "Time") {
                  Time = finalAccDetailList[data]["Value"][i][checkKey[0]]
                } else if (checkKey[0] == "Duration") {
                  Duration = finalAccDetailList[data]["Value"][i][checkKey[0]]
                } else if (checkKey[0] == "Voltage") {
                  Voltage = (
                    finalAccDetailList[data]["Value"][i][checkKey[0]] * 1
                  ).toFixed(2)
                } else if (checkKey[0] == "Sag") {
                  Sag = (
                    finalAccDetailList[data]["Value"][i][checkKey[0]] * 1
                  ).toFixed(2)
                } else if (checkKey[0] == "Files") {
                  File = finalAccDetailList[data]["Value"][i][checkKey[0]]
                } else if (checkKey[0] == "Image") {
                  image = finalAccDetailList[data]["Value"][i][checkKey[0]]
                }
              });
            }
            outputJson.push({
              Date: date,
              Impact: Impact,
              ImpactProduction: ImpactProduction,
              RootCause: RootCause,
              Time: Time,
              Duration: Duration,
              Voltage: Voltage,
              Sag: Sag,
              File: File,
              Image: image,
              ID: accID,
            });
          }
        }

        console.log("test", test);
        console.log("outputJson", outputJson);
        var detail_data;
        $("#detail_table td").remove();
        $.each(outputJson, function (key, value) {
          // console.log("value time ",value.Time)
          if (value.ID <= 343) {
            detail_data += "<tr id='main-row'class='table-primary'>";
            detail_data += '<td id="dateValue" class="dateValue" onclick="moreDetail(this)">' + value.Date + "</td>";
            detail_data += "<td>" + value.Time + "</td>";
            detail_data += "<td>" + value.Duration + "</td>";
            detail_data += "<td>" + value.Voltage + "</td>";
            detail_data += "<td>" + value.Sag + "</td>";
            detail_data += "<td>" + value.Impact + "</td>";
            detail_data += "<td>" + value.ImpactProduction + "</td>";
            detail_data += "<td>" + value.RootCause + "</td>";
            detail_data += "<td>" + " No Files" + "</td>";
            detail_data += "<td>" + "No Image" + "</td>";
            detail_data += "</tr>";
          } else {
            if (typeof value.Image === 'undefined') {
              image = "No Image";
            } else {
              var imageFile = value.Image.slice(16);
              var image = '<br><br><img class="img-thumbnail" style="width : 200px; height : 200px" src="http://127.0.0.1:8000/static/storage/' + imageFile + '"></img>';
              // var image = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">View Image</button>'
              // $('#img-modal').append('<img class="img-thumbnail" src="http://127.0.0.1:8000/static/storage/' + imageFile + '"></img>')
            }

            if (typeof value.File === 'undefined') {
              files = "No File";
            } else {
              var filename = value.File.slice(16);
              var file = "http://127.0.0.1:8000/static/storage/" + filename + " ";
              files = "<a href='" + file + "' download>dowload file</a>";
            }

            detail_data += "<tr id='main-row'class='table-primary'>";
            detail_data += '<td id="dateValue" class="dateValue" onclick="moreDetail(this)">' + value.Date + "</td>";
            detail_data += "<td>" + value.Time + "</td>";
            detail_data += "<td>" + value.Duration + "</td>";
            detail_data += "<td>" + value.Voltage + "</td>";
            detail_data += "<td>" + value.Sag + "</td>";
            detail_data += "<td>" + value.Impact + "</td>";
            detail_data += "<td>" + value.ImpactProduction + "</td>";
            detail_data += "<td>" + value.RootCause + "</td>";
            detail_data += "<td>" + files + "</td>";
            detail_data += "<td>" + image + "</td>";
            detail_data += "</tr>";
            // detail_data += '<tr id="childRow" class="table-light" style="display:none;">';
            // detail_data += '<td id="childColumn" colspan="4" style="padding-left : 20px; height: 300px;">' + 
            //               "<br>Time : " + value.Time +
            //               "<br><br>Duration : " + value.Duration +
            //               "<br><br>Voltage : " + value.Voltage +
            //               "<br><br>Sag : " + value.Sag + " %" +
            //               "<br><br>Files : " + files +
            //               "<br><br>Image : " + image + 
            //               '<br><br><button id="closeDetail" type="button" class="btn btn-info" onclick="closeDetail(this)">close</button>' + "</td>";
            // detail_data += "</tr>";
          }
        });
        $("#detail_table").append(detail_data);
      }
    });
  });
}

// function for display more detail (Time, Duration, etc). It is Perfectly Splendid!! || is it not used?
function moreDetail(element) {
  var row = element.parentNode.rowIndex + 1;
  console.log(row);
  // console.log($("#detail_table tr").eq(row).display)

  if ($("#detail_table tr").eq(row).hide()) {
    $("#detail_table tr").eq(row).show();
  }
}

// function for close more detail (Time, Duration, etc), It is Perfectly Splendid!!
function closeDetail(element) {
  var row = element.closest("tr").rowIndex;
  console.log("button", row);
  // document.getElementById("closeDetail").addEventListener("click", function(){
  //   console.log("click")
  $("#detail_table tr").eq(row).hide();
  // })
}

// function for hide detail table.It is Perfectly Splendid!!
function closeTable() {
  $("#detailText").hide();
  $("#detailData").hide();
}

// function for hide modal form.It is Perfectly Splendid!!
function DetailForm() {
  $(".modal-body form").hide();
}

function Search() {
  var inputkey, filter, table, tr, td, i, txtValue;
  inputkey = document.getElementById("inputSearch");
  filter = inputkey.value.toUpperCase();
  table = document.getElementById("detail_table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function exportTableToCSV(filename) {
  var csv = [];
  var rows = document.querySelectorAll("table tr");
  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);
    csv.push(row.join(","));
  }
  // Download CSV file
  downloadCSV(csv.join("\n"), filename);
}

function exportTableToCSV2(filename) {
  var csv = [];
  var rows = document.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    if (rows[i] / 2 == 1) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");
      for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);
      csv.push(row.join(","));
    }
  }
  // Download CSV file
  downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;
  // CSV file
  csvFile = new Blob([csv], { type: "text/csv" });
  // Download link
  downloadLink = document.createElement("a");
  // File name
  downloadLink.download = filename;
  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);
  // Hide download link
  downloadLink.style.display = "none";
  // Add the link to DOM
  document.body.appendChild(downloadLink);
  // Click download link
  downloadLink.click();
}
