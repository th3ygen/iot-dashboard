import { useState } from "react";

import { Paper, InputBase, IconButton } from "@material-ui/core";
import { Sync as RefreshIcon, Search as SearchIcon } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";

import LineChart from "components/visualize/LineChart.component";

import styles from "styles/user/Browse.module.scss";
import exStyles from "styles/common.module.scss";

function BrowsePage() {
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
						<IconButton className={styles["btn-search"]}>
							<SearchIcon />
						</IconButton>
					</Paper>
					<IconButton className={styles.button}>
						<RefreshIcon />
					</IconButton>
				</div>
			</div>
			<div className={exStyles.body}>
				{/* <Paper>
					<LineChart
						channelId={"edel"}
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
				</Paper> */}
			</div>
		</div>
	);
}

export default BrowsePage;
