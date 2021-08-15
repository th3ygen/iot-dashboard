import React, { Component } from "react";

import { Paper, InputBase, IconButton } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

import styles from "./styles/Browse.module.scss";
import exStyles from "../../shared/styles/common.module.scss";

import { Sync as RefreshIcon, Search as SearchIcon } from "@material-ui/icons";

import LineChart from "../../components/visualize/LineChart.component";

class Browse extends Component {
	constructor(props) {
		super(props);

		this.columns = [
			{
				field: "id",
				headerName: "ID",
				sortable: false,
				width: 100,
				headerClassName: "table-header",
			},
			{
				field: "channel",
				headerName: "Channel",
				sortable: false,
				width: 150,
				headerClassName: "table-header",
			},
			{
				field: "field",
				headerName: "Field",
				sortable: false,
				width: 150,
				headerClassName: "table-header",
			},
			{
				field: "value",
				headerName: "Value",
				width: 200,
				headerClassName: "table-header",
			},
			{
				field: "timestamp",
				headerName: "Timestamp",
				width: 200,
				headerClassName: "table-header",
			},
		];

		this.state = {
			table: [],
			data: [],
		};

		this.addData = this.addData.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	async loadData(channelId) {
		return await (
			await fetch("https://localhost:8080/data/get?id=edel")
		).json();
	}

	async addData(id, channel, field, value, timestamp) {
		let table = JSON.parse(JSON.stringify(this.state.table));
		table.push({ id, channel, field, value, timestamp });

		await this.setState({
			table,
		});
	}

	async componentDidMount() {
		const { data } = await this.loadData();

		let x = 0;
		for (const d of data) {
			await this.addData(
				x++,
				d.channelId,
				d.fieldName,
				d.value,
				new Date(d.createdAt).getTime()
			);
		}

		this.setState({
			data
		});
	}

	render() {
		return (
			<div>
				<div className={exStyles.header}>
					<div className={exStyles.text}>
						<div className={exStyles.title}>Browse your data</div>
						<div className={exStyles.subtitle}>
							Add, edit, or delete your data accordingly
						</div>
					</div>

					<div className={exStyles.actions}>
						<Paper className={styles.input}>
							<InputBase placeholder={"Search data"}></InputBase>
							<IconButton>
								<SearchIcon />
							</IconButton>
						</Paper>
						<IconButton className={styles.button}>
							<RefreshIcon />
						</IconButton>
					</div>
				</div>
				<div className={exStyles.body}>
					<Paper>
						<LineChart
							channelId={'edel'}
							realtime={true}
							interval={1000}
						/>
					</Paper>
					<Paper className={styles.table} elevation={3}>
						<DataGrid
							rows={this.state.table}
							columns={this.columns}
							pageSize={5}
							checkboxSelection
							disableSelectionOnClick
						></DataGrid>
					</Paper>
				</div>
			</div>
		);
	}
}

export default Browse;
