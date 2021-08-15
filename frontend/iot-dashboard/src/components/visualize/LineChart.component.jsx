import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import styles from "./LineChart.module.scss";

function am4theme_dark(target) {
	if (target instanceof am4charts.Axis) {
		/* target.background.fill = am4core.colors.rgb('#fff', 0); */
	}
}

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4theme_dark);

class LineChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data
		};

		this.setupChart = this.setupChart.bind(this);
		this.updateData = this.updateData.bind(this);
        this.requestData = this.requestData.bind(this);
	}

	componentDidMount() {
        this.setupChart();
        this.requestData();

        if (this.props.realtime && this.props.interval) {
            this.interval = setInterval(() => {
                this.requestData();
            }, this.props.interval);
        }
    }

	componentWillUnmount() {
		if (this.chart) {
			this.chart.dispose();
		}
	}

	setupChart() {
		let chart = am4core.create("chartdiv", am4charts.XYChart);

		chart.background.fill = "#222b36";

		/* let data = [];

		if (this.props.data.length > 0) {
			for (const d of this.props.data) {
				data.push({
					date: new Date(d.createdAt),
					name: "name",
					value: d.value,
				});
			}
		}

		chart.data = data; */

		let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.renderer.grid.template.location = 0;
		dateAxis.renderer.labels.template.fill = am4core.color("#fff");

		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.tooltip.disabled = true;
		valueAxis.renderer.minWidth = 35;
		valueAxis.renderer.labels.template.fill = am4core.color("#fff");

		let series = new am4charts.LineSeries();
		chart.series.push(series);
		series.dataFields.dateX = "date";
		series.dataFields.valueY = "value";
		series.stroke = "#66FCF1";

		series.tooltipText = "{valueY.value}";
		chart.cursor = new am4charts.XYCursor();

		let scrollbarX = new am4charts.XYChartScrollbar();

		chart.scrollbarX = scrollbarX;

		this.chart = chart;
	}

    async requestData() {
        const { data } = await (await fetch(`https://localhost:8080/data/get?id=${this.props.channelId}`)).json();

        this.updateData(data);
    }

	updateData(data) {
		if (this.chart && data.length > 0) {
            /* let p = this.chart.data; */

            if (this.chart.data.length > 0) {
                const current = JSON.parse(JSON.stringify(this.chart.data));

                const latest = current.sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime())[0];
                const latestIndex = data.findIndex(x => new Date(x.createdAt).getTime() === new Date(latest.date).getTime());
                
                
                data.splice(0, latestIndex + 1);
                
                if (data.length > 0) {
                    for (const d of data) {
                        this.chart.addData({
                            date: new Date(d.createdAt),
                            name: "name",
                            value: d.value,
                        });
                    }
                }
            } else {
                for (const d of data) {
                    this.chart.addData({
                        date: new Date(d.createdAt),
                        name: "name",
                        value: d.value,
                    });
                }
            }
            
            /* this.chart.data = p; */
        }
	}

	componentDidUpdate(prev) {
		if (prev.data !== this.props.data) {
			/* this.updateData(this.props.data); */
		}
	}

	render() {
		return (
			<div
				id="chartdiv"
				style={{ width: "100%", height: "500px", marginBottom: 20 }}
			></div>
		);
	}
}

export default LineChart;
