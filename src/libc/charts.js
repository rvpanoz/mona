import $ from 'jquery';
import moment from 'moment';
import ChartJS from 'chart.js';

var charts = {
  generateChart(ctx, type, data, opts) {
    var data = null;

    if(!type) {
      type = 'line';
    }

    var chart = Chart(ctx, {
      type: type,
      data: data,
      options: null
    });


    switch(opts.type) {
      case "line":
      data = {
        labels: moment.months(),
        datasets: [{
          label: "My First dataset",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartData,
          spanGaps: false,
        }]
      };

      break;
    }

    return new chart();
  }
}

module.exports = charts;
