$(function () {
  var chart;
  $(document).ready(function () {
    chart = new Highcharts.Chart(
      {
        chart: {
          renderTo: "container",
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
        },
        title: {
          text: "Browser market shares at a specific website, 2010",
        },
        tooltip: {
          formatter: function () {
            return "<b>" + this.point.name + "</b>: " + this.percentage + " %";
          },
        },
        legend: {
          enabled: true,
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            size: 100,
            dataLabels: {
              enabled: false,
            },
          },
        },
        series: [
          {
            type: "pie",
            name: "testname1",
            center: [70, 140],
            showInLegend: true,
            data: [
              ["Commerce", 33.0],
              ["Engineering", 32.3],
              {
                name: "Financial Services",
                y: 18.8,
                sliced: true,
                selected: true,
              },
              ["Logistics, Aviation & Shipping", 5.5],
              ["Seafood & Marine", 9.2],
              ["Corporate Services & others", 1.2],
            ],
          },
          {
            type: "pie",
            name: "testname2",
            center: [230, 140],
            showInLegend: true,
            data: [
              ["Commerce", 33.0],
              ["Engineering", 32.3],
              {
                name: "Financial Services",
                y: 18.8,
                sliced: true,
                selected: true,
              },
              ["Logistics, Aviation & Shipping", 5.5],
              ["Seafood & Marine", 9.2],
              ["Corporate Services & others", 1.2],
            ],
          },
        ],
      },
      function (chart) {
        $(chart.series[0].data).each(function (i, e) {
          e.legendItem.on("click", function (event) {
            var legendItem = e.name;

            event.stopPropagation();

            $(chart.series).each(function (j, f) {
              $(this.data).each(function (k, z) {
                if (z.name == legendItem) {
                  if (z.visible) {
                    z.setVisible(false);
                  } else {
                    z.setVisible(true);
                  }
                }
              });
            });
          });
        });
      }
    );
  });
});
