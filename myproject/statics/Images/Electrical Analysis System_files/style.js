var chartPie;
var chartColumn;

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/db/",
    dataType: "json",
    success: function (data) {
      getData = JSON.parse(data.data);
      getDate = data.date;
      console.log(getData);
      console.log(getDate);
      plotColumnChart(getData, getDate);
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
      //console.log(getPieData)

      plotPieChart(getPieData);
      //console.log("log ", getJson(getData));

      document.getElementById("date1").value = date1
      document.getElementById("date2").value = date2
    },
    error: function () {
      alert("Error occured");
    },
  });
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

function plotPieChart(dataPie) {
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
      tooltip: {
        backgroundColor: null,
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        style: {
          padding: 0
        },
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b><br/>Used: {point.y} kW",
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
          showInLegend: true,
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

    // function (chart) {
    //   console.log(chart);

    //   $(chart.series[0].data).each(function (i, e) {
    //     console.log(chart);

    //     e.legendItem.on("click", function (event) {
    //       var XYZ = $("#container-column").highcharts(),
    //         series = XYZ.get(XYZ.options.id);
    //       var legendItem = e.index;
    //       console.log("e", e);
    //       console.log("click", legendItem);
    //       //get corresponding series
    //       console.log("series", series);
    //       console.log("XYZ", XYZ);

    //       if (XYZ.legend.allItems[legendItem].visible == true) {
    //         XYZ.legend.allItems[legendItem].hide();
    //       } else {
    //         XYZ.legend.allItems[legendItem].show();
    //       }

    //       // if (series) {
    //       //   if (this.visible) {
    //       //     series.hide();
    //       //   } else {
    //       //     series.show();
    //       //   }
    //       // }

    //       // event.stopPropagation();

    //       $(chart.series).each(function (j, f) {
    //         $(this.data).each(function (k, z) {
    //           if (z.name == legendItem) {
    //             if (z.visible) {
    //               z.setVisible(false);
    //             } else {
    //               z.setVisible(true);
    //             }
    //           }
    //         });
    //       });
    //     });
    //   });
    // }
  );
}

/************ high chart for column chart ************/
function plotColumnChart(data, date) {
  console.log(data);
  console.log(date);
  columnChart = new Highcharts.chart(
    "container-column", {
    chart: {
      type: "column",
    },
    title: {
      text: "COMPARISON SEAGATE CONSUMPTION",
    },
    xAxis: {
      categories: date,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total consumption",
      },
      plotLines: [{
        color: '#14bf4d',
        width: 5,
        value: 50000,
      }],
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal} kW",
      backgroundColor: null,
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      style: {
        padding: 0
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
      series: {
        events: {
          legendItemClick: function (event) {
            console.log("event is ",event.target)
            var XYZ = $('#container-pie').highcharts(),
              series = XYZ.get(XYZ.legend.allItems); //get corresponding series
              console.log("series is ",series)

            if (series) {
              if (this.visible) {
                series.hide();
              } else {
                series.show();
              }
            }
          }
        }
      }
    },
    series: data,
  },
    // function (chart) {
    //   console.log(chart);

    //   $(chart.series[0].data).each(function (i, e) {
    //     console.log(chart);

    //     e.legend.on("click", function (event) {
    //       var XYZ = $("#container-pie").highcharts(),
    //         series = XYZ.get(XYZ.options.id);
    //       var legendItem = e.index;
    //       console.log("e", e);
    //       console.log("click", legendItem);
    //       //get corresponding series
    //       console.log("series", series);
    //       console.log("XYZ", XYZ);

    //       if (XYZ.legend.allItems[legendItem].visible == true) {
    //         XYZ.legend.allItems[legendItem].hide();
    //       } else {
    //         XYZ.legend.allItems[legendItem].show();
    //       }

    //       // if (series) {
    //       //   if (this.visible) {
    //       //     series.hide();
    //       //   } else {
    //       //     series.show();
    //       //   }
    //       // }

    //       // event.stopPropagation();

    //       $(chart.series).each(function (j, f) {
    //         $(this.data).each(function (k, z) {
    //           if (z.name == legendItem) {
    //             if (z.visible) {
    //               z.setVisible(false);
    //             } else {
    //               z.setVisible(true);
    //             }
    //           }
    //         });
    //       });
    //     });
    //   });
    // }
  );
}

// $(function () {
//   $("#container-column").highcharts({
//     chart: {
//       type: "column",
//     },
//     title: {
//       text: "COMPARISON SEAGATE CONSUMPTION",
//     },
//     xAxis: {
//       categories: [],
//     },
//     plotOptions: {
//       // column: {
//       //   stacking: "normal",
//       //   dataLabels: {
//       //     enabled: false,
//       //   },
//       // },
//       series: {
//         events: {
//           legendItemClick: function (event) {
//             var XYZ = $("#container-pie").highcharts(),
//               series = XYZ.get(this.options.name); //get corresponding series

//             if (series) {
//               if (this.visible) {
//                 series.hide();
//               } else {
//                 series.show();
//               }
//             }
//           },
//         },
//       },
//     },
//     legend: {
//       enabled: false,
//     },
//     series: [
//       {
//         name: "someId",
//         data: [
//           29.9,
//           71.5,
//           106.4,
//           129.2,
//           144.0,
//           176.0,
//           135.6,
//           148.5,
//           216.4,
//           194.1,
//           95.6,
//           54.4,
//         ],
//       },
//       {
//         name: "someId",
//         data: [
//           29.9,
//           71.5,
//           106.4,
//           129.2,
//           144.0,
//           176.0,
//           135.6,
//           148.5,
//           216.4,
//           194.1,
//           95.6,
//           54.4,
//         ],
//       },
//     ],
//   });
//   $("#container-pie").highcharts({
//     chart: {
//       type: "column",
//     },
//     title: {
//       text: "COMPARISON SEAGATE CONSUMPTION",
//     },
//     xAxis: {
//       categories: [],
//     },

//     plotOptions: {
//       series: {
//         events: {
//           legendItemClick: function (event) {
//             var XYZ = $("#container-column").highcharts(),
//               series = XYZ.get(this.options.name); //get corresponding series

//             if (series) {
//               if (this.visible) {
//                 series.hide();
//               } else {
//                 series.show();
//               }
//             }
//           },
//         },
//       },
//       showInLegend: true,
//     },
//     legend: {
//       enabled: true,
//     },
//     series: [
//       {
//         name: "someId",
//         data: [
//           29.9,
//           71.5,
//           106.4,
//           129.2,
//           144.0,
//           176.0,
//           135.6,
//           148.5,
//           216.4,
//           194.1,
//           95.6,
//           54.4,
//         ],
//       },
//       {
//         name: "someId",
//         data: [
//           29.9,
//           71.5,
//           106.4,
//           129.2,
//           144.0,
//           176.0,
//           135.6,
//           148.5,
//           216.4,
//           194.1,
//           95.6,
//           54.4,
//         ],
//       },
//     ],
//   });
// });
