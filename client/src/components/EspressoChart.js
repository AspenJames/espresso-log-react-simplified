import React, { Component } from 'react';
const CanvasJSReact = require('../lib/canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class EspressoChart extends Component {
  render() {

    const options = {
      animationEnabled: true,
      title: {
        text: "Espresso Recipes"
      },
      axisY: {
        title: "Units",
        includeZero: false
      },
      toolTip: {
        shared: true
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
      }
      ]
    }
    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    )
  }
}

export default EspressoChart;
