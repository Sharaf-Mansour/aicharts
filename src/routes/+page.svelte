<div class="chart" bind:this={chartdiv}></div>
<style>
.chart {
    width: 100%;
    height: 500px;
}
</style>

<script>
    export let data;
import { onMount } from "svelte";
import * as am5 from "@amcharts/amcharts5?client";
import * as am5xy from "@amcharts/amcharts5/xy?client";
let chartdiv;
//console.log(data.message);

onMount(() => {
  const timeSeries = rows.map((row) => {
      const [time, K] = row.split(",");
      return { time: new Date(time), K: parseFloat(K) };
    });
  // Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let root = am5.Root.new(chartdiv);
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX:true
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none"
}));
cursor.lineY.set("visible", false);

var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.2,
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan:"zoom"
  })  
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "K",
  valueXField: "time",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

console.log(data.message);
// Set data
series.data.setAll(data.message);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
});
</script>