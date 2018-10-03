import React, { Component } from 'react';
const CanvasJSReact = require('../lib/canvasjs.react');
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class EspressoChart extends Component {

  toggleParameters = (e) => {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  render() {

    const options = {
      animationEnabled: true,
      title: {
        text: "Espresso Recipes"
      },
      subtitles: [{
        text: "Click legend to hide/unhide parameters, hover to view details."
      }],
      axisY: {
        title: "Units",
        includeZero: false
      },
      axisX: {
        title: "Espresso ID",
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleParameters
      },
      data: [{
        type: "spline",
        name: "dose",
        showInLegend: true,
        dataPoints: this.props.espressos.map(esp => {
          return ({y: esp.dose, label: esp.id})
        })
      },
      {
        type: "spline",
        name: "yield",
        showInLegend: true,
        dataPoints: this.props.espressos.map(esp => {
          return ({y: esp.yield, label: esp.id})
        })
      },
      {
        type: "spline",
        name: "time",
        showInLegend: true,
        dataPoints: this.props.espressos.map(esp => {
          return ({y: esp.time, label: esp.id})
        })
      },
      {
        type: "spline",
        name: "Days Off Roast",
        showInLegend: true,
        visible: false,
        dataPoints: this.props.espressos.map(esp => {
          return ({y: esp.days_off_roast, label: esp.id})
        })
      },
      {
        type: "spline",
        name: "notes",
        showInLegend: false,
        dataPoints: this.props.espressos.map(esp => {
          return ({ y: esp.notes, label: esp.id })
        })
      }
      ]
    }

    return (
      <div>
        <CanvasJSChart options={options} onRef={ref => this.chart = ref} />
      </div>
    )
  }
}

export default EspressoChart;
