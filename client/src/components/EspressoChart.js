import React, { Component } from 'react';
import { withRouter } from 'react-router';
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

  onClick = espressoId => {
    // redirect to /coffees/${originId]/${espressoId}
    this.props.history.push(`/coffees/${this.props.originId}/espressos/${espressoId}`);
  }

  render() {
    // this takes passed in espressos array, takes last `limit` elements
    // this.props.limit is passed in from input in parent component, Coffee.js
    let espressoData = this.props.espressos.slice(-this.props.limit)

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
        name: "dose (grams)",
        showInLegend: true,
        dataPoints: espressoData.map(esp => {
          return ({y: esp.dose, label: esp.id, click: () => this.onClick(esp.id)})
        })
      },
      {
        type: "spline",
        name: "yield (grams)",
        showInLegend: true,
        dataPoints: espressoData.map(esp => {
          return ({ y: esp.yield, label: esp.id, click: () => this.onClick(esp.id)})
        })
      },
      {
        type: "spline",
        name: "time (seconds)",
        showInLegend: true,
        dataPoints: espressoData.map(esp => {
          return ({ y: esp.time, label: esp.id, click: () => this.onClick(esp.id)})
        })
      },
      {
        type: "spline",
        name: "Days Off Roast",
        showInLegend: true,
        visible: false,
        dataPoints: espressoData.map(esp => {
          return ({ y: esp.days_off_roast, label: esp.id, click: () => this.onClick(esp.id)})
        })
      },
      {
        type: "spline",
        name: "notes",
        showInLegend: false,
        dataPoints: espressoData.map(esp => {
          return ({ y: esp.notes, label: esp.id })
        })
      }
      ]
    }

    return (
      <div id='espressoChart' style={{display: 'block'}} >
        <CanvasJSChart options={options} onRef={ref => this.chart = ref} />
      </div>
    )
  }
}

export default withRouter(EspressoChart);
