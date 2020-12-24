var chartPie;
var chartColumn;

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/db/",
    dataType: "json",
    success: function (data) {
      workweek = data.workweek
      console.log(workweek)
      workweek_value = data.workweek_value
      console.log(workweek_value)
      // getData = JSON.parse(data.data);
      // getDate = data.date;
      // plotLine = data.plotLine;

      // getReportDate1 = data.sumDate.date1;
      // getReportDate2 = data.sumDate.date2;

      // $("#report").text(
      //   "Report Summary from " + getReportDate1 + " to " + getReportDate2
      // );

      // console.log(getData);
      // console.log(getDate);
      // console.log("plotline is ", plotLine);
      plotColumnChart(workweek, workweek_value);
      console.log("complete");
      //console.log("log ", getJson(getData));
    },
    error: function () {
      alert("Error occured");
    },
  });
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/dbPie/",
    dataType: "json",
    success: function (dataPie) {
      getPieData = dataPie;
      getValue = dataPie[7].allValue;
      getCommon = dataPie[7].common;
      getFix = dataPie[7].fix;
      getVar = dataPie[7].var;

      $("#overall").text(getValue + " kW.");
      $("#common").text(getCommon + " kW.");
      $("#fix").text(getFix + " kW.");
      $("#var").text(getVar + " kW.");

      console.log("get pie", getPieData);
      console.log("get value", getValue);
      console.log("get value", getCommon);
      console.log("get value", getFix);
      console.log("get value", getVar);

      plotPieChart(getPieData, getValue);
      //console.log("log ", getJson(getData));
    },
    error: function () {
      alert("Error occured");
    },
  });

  $('#chosen-date1').select2({
    placeholder: 'Select Type',
    theme: "classic"
  })
});

// /************ high chart for pie chart ************/
// Radialize the colors
// Arcolors = [
//   "#11A624",
//   "#E15105",
//   "#1711A6",
//   "#E9B90D",
//   "#2550CB",
//   "#E9E90D",
//   "#25A7CB",
// ];

// ArcolorsStop = [
//   "#A3F2AC",
//   "#F0BB9F",
//   "#A7A5D3",
//   "#F2E2A9",
//   "#A1B5EC",
//   "#F8F8B9",
//   "#A6E0F0",
// ];

function plotPieChart(dataPie, getValue) {
  chartPie = new Highcharts.chart(
    "container-pie",
    {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "F&V SEAGATE",
      },
      subtitle: {
        text: "Average overall " + getValue + " kW.",
      },
      tooltip: {
        backgroundColor: null,
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        style: {
          padding: 0,
        },
        pointFormat:
          "{series.name}: <b>{point.percentage:.1f}%</b><br/>Avg: {point.y} kW",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
          },
          showInLegend: false,
        },
      },
      series: [
        {
          name: "Shared",
          colorByPoint: true,
          data: dataPie,
        },
      ],
    },

    function (chart) {
      //console.log(chart);

      $(chart.series[0].data).each(function (i, e) {
        console.log(chart);

        e.legendItem.on("click", function (event) {
          var XYZ = $("#container-column").highcharts(),
            series = XYZ.get(XYZ.options.id);
          var legendItem = e.index;
          //console.log("e", e);
          //console.log("click", legendItem);
          //get corresponding series
          // console.log("series", series);
          // console.log("XYZ", XYZ);

          if (XYZ.legend.allItems[legendItem].visible == true) {
            console.log(XYZ.legend.allItems[legendItem]);
            XYZ.legend.allItems[legendItem].hide();
          } else {
            XYZ.legend.allItems[legendItem].show();
          }

          // if (series) {
          //   if (this.visible) {
          //     series.hide();
          //   } else {
          //     series.show();
          //   }
          // }

          // // event.stopPropagation();

          // $(chart.series).each(function (j, f) {
          //   $(this.data).each(function (k, z) {
          //     if (z.name == legendItem) {
          //       if (z.visible) {
          //         z.setVisible(false);
          //       } else {
          //         z.setVisible(true);
          //       }
          //     }
          //   });
          // });
        });
      });
    }
  );
}

/************ high chart for column chart ************/
function plotColumnChart(workweek, workweek_value) {
  // console.log(data);
  // console.log(date);
  // console.log("plotline ", plotLine);
  columnChart = new Highcharts.chart(
    "container-column",
    {
      chart: {
        type: 'column'
      },
      title: {
        text: 'COMPARISON SEAGATE CONSUMPTION'
      },
      xAxis: {
        categories: workweek
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total consumption (kW)'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        // shared: true
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      series:  workweek_value
    },
    // {
    //   chart: {},
    //   title: {
    //     text: "COMPARISON SEAGATE CONSUMPTION",
    //   },
    //   xAxis: {
    //     categories: workweek,
    //   },
    //   yAxis: {
    //     min: 0,
    //     title: {
    //       text: "Total consumption (kW)",
    //     },
    //     // plotLines: [plotLine]
    //   },
    //   tooltip: {
    //     headerFormat: "<b>{point.x}</b><br/>",
    //     backgroundColor: "white",
    //     borderWidth: 0,
    //     shadow: false,
    //     useHTML: true,
    //     style: {
    //       padding: 0,
    //     },
    //   },
    //   plotOptions: {
    //     column: {
    //       stacking: "normal",
    //       dataLabels: {
    //         enabled: false,
    //       },
    //     },
    //     // series: {
    //     //   events: {
    //     //     legendItemClick: function (event) {
    //     //       var count = 0;
    //     //       if (event) {
    //     //         count = count + 1;
    //     //       }
    //     //       console.log("count click ", count);
    //     //       var legendIndexs = event.target.index;

    //     //       console.log("click ", legendIndexs);
    //     //       var XYZ = $("#container-pie").highcharts();
    //     //       // console.log("XYZ ", XYZ);

    //     //       // console.log("legend ", XYZ.series[0].data[legendIndexs]);

    //     //       // //
    //     //       // console.log("legend ", XYZ.series[0].data[legendIndexs]);

    //     //       if (XYZ.series[0].data[legendIndexs].visible) {
    //     //         XYZ.series[0].data[legendIndexs].setVisible(false);
    //     //       } else {
    //     //         XYZ.series[0].data[legendIndexs].setVisible(true);
    //     //       }

    //     //       var columnChart = $("#container-column").highcharts();
    //     //       // console.log("column chart ", columnChart)
    //     //       // console.log("column chart index ", columnChart.series[legendIndexs])
    //     //       // console.log("legend ", columnChart.series[legendIndexs].yData);
    //     //       // console.log("check status ",(columnChart.series[legendIndexs]).visible)
    //     //       var getYdata = columnChart.series[legendIndexs].yData;
    //     //       var lineData = columnChart.series[7].yData;

    //     //       console.log("line chart ", columnChart.series[7].yData);
    //     //       var test = lineData.length;
    //     //       console.log("test ", test);
    //     //       newV = [];

    //     //       console.log("check index legend ",columnChart.series[legendIndexs]);
    //     //       if (legendIndexs === 7) {

    //     //       } else {
    //     //         for (i = 0; i < test; i++) {
    //     //           if (columnChart.series[legendIndexs].visible) {
    //     //             var new_value = lineData[i] - getYdata[i];
    //     //             console.log("show new value ", new_value.toFixed(2));
    //     //             newV.push(parseFloat(new_value.toFixed(2)));
    //     //           } else {
    //     //             var new_value = lineData[i] + getYdata[i];
    //     //             console.log("hide new value ", new_value.toFixed(2));
    //     //             newV.push(parseFloat(new_value.toFixed(2)));
    //     //           }
    //     //         }
    //     //       }
    //     //       console.log("new ", newV);

    //     //       for (i = 0; i < test; i++) {
    //     //         var index = lineData.indexOf(lineData[i]);
    //     //         lineData[index] = newV[i];
    //     //       }
    //     //       columnChart.series[7].update({
    //     //         data: lineData,
    //     //       });
    //     //     },
    //     //   },
    //     // },
    //   },
    //   series: workweek_value,
    // },
    // function (column) {
    //   //console.log(chart);
    //   var XYZ = $("#container-column").highcharts()
    //   XYZ.series[7].update({ showInLegend: false })
    //   XYZ.series[7].update({color: '#00ff00'})

    //     //console.log("checkkkkkk",column);
    // }
  )
}

