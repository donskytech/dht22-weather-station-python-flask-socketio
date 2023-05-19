tabLinks = document.querySelectorAll(".nav-link");

tabLinks.forEach(function (tab) {
  tab.addEventListener("click", function (e) {
    console.log(e.target.dataset.tabNumber);
  });
});

var temperatureHistoryDiv1 = document.getElementById("temperature-history-1");
var humidityHistoryDiv1 = document.getElementById("humidity-history-1");

var temperatureGaugeDiv1 = document.getElementById("temperature-gauge-1");
var humidityGaugeDiv1 = document.getElementById("humidity-gauge-1");

var graphConfig = {
  displayModeBar: false,
  responsive: true,
};

// History Data
var temperatureTrace = {
  x: [],
  y: [],
  name: "Temperature",
  mode: "lines+markers",
  type: "line",
};
var humidityTrace = {
  x: [],
  y: [],
  name: "Humidity",
  mode: "lines+markers",
  type: "line",
};

var temperatureLayout = {
  autosize: false,
  title: {
    text: "Temperature",
  },
  font: {
    size: 14,
    color: "#7f7f7f",
  },
  colorway: ["#B22222"],
  width: 320,
  height: 260,
  margin: { t: 30, b: 20, l: 30, r: 20, pad: 0 },
};
var humidityLayout = {
  autosize: false,
  title: {
    text: "Humidity",
  },
  font: {
    size: 14,
    color: "#7f7f7f",
  },
  colorway: ["#00008B"],
  width: 320,
  height: 260,
  margin: { t: 30, b: 20, l: 30, r: 20, pad: 0 },
};
var config = { responsive: true };

Plotly.newPlot(
  temperatureHistoryDiv1,
  [temperatureTrace],
  temperatureLayout,
  graphConfig
);
Plotly.newPlot(
  humidityHistoryDiv1,
  [humidityTrace],
  humidityLayout,
  graphConfig
);

// Gauge Data
var temperatureData = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "Temperature" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 30 },
    gauge: {
      axis: { range: [null, 50] },
      steps: [
        { range: [0, 20], color: "lightgray" },
        { range: [20, 30], color: "gray" },
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 30,
      },
    },
  },
];

var humidityData = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "Humidity" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 50 },
    gauge: {
      axis: { range: [null, 100] },
      steps: [
        { range: [0, 20], color: "lightgray" },
        { range: [20, 30], color: "gray" },
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 30,
      },
    },
  },
];

var layout = { width: 320, height: 250, margin: { t: 0, b: 0, l: 0, r: 0 } };

Plotly.newPlot(temperatureGaugeDiv1, temperatureData, layout, graphConfig);
Plotly.newPlot(humidityGaugeDiv1, humidityData, layout, graphConfig);

// Temperature
let newTempXArray = [];
let newTempYArray = [];
// Humidity
let newHumidityXArray = [];
let newHumidityYArray = [];

// The maximum number of data points displayed on our scatter/line graph
let MAX_GRAPH_POINTS = 12;
let ctr = 0;

function updateBoxes(temperature, humidity) {
  let temperatureDiv = document.getElementById("temperature");
  let humidityDiv = document.getElementById("humidity");

  temperatureDiv.innerHTML = temperature + " C";
  humidityDiv.innerHTML = humidity + " %";
}

function updateGauge(temperature, humidity) {
  var temperature_update = {
    value: temperature,
  };
  var humidity_update = {
    value: humidity,
  };

  Plotly.update(temperatureGaugeDiv1, temperature_update);
  Plotly.update(humidityGaugeDiv1, humidity_update);
}

function updateCharts(lineChartDiv, xArray, yArray, sensorRead) {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  if (xArray.length >= MAX_GRAPH_POINTS) {
    xArray.shift();
  }
  if (yArray.length >= MAX_GRAPH_POINTS) {
    yArray.shift();
  }
  xArray.push(ctr++);
  yArray.push(sensorRead);

  var data_update = {
    x: [xArray],
    y: [yArray],
  };

  Plotly.update(lineChartDiv, data_update);
}

function updateSensorReadings(jsonResponse) {
  let temperature = jsonResponse.temperature.toFixed(2);
  let humidity = jsonResponse.humidity.toFixed(2);

  updateBoxes(temperature, humidity);

  updateGauge(temperature, humidity);

  // Update Temperature Line Chart
  updateCharts(
    temperatureHistoryDiv1,
    newTempXArray,
    newTempYArray,
    temperature
  );
  // Update Humidity Line Chart
  updateCharts(
    humidityHistoryDiv1,
    newHumidityXArray,
    newHumidityYArray,
    humidity
  );
}
/*
  SocketIO Code
*/
//   var socket = io.connect("http://" + document.domain + ":" + location.port);
var socket = io.connect();

//receive details from server
socket.on("updateSensorData", function (msg) {
  var sensorReadings = JSON.parse(msg);
  updateSensorReadings(sensorReadings);
});
