import React, { Component } from "react";

/* import Grid from "@material-ui/core/Grid"; */

import Gridstack from "../../components/Gridstack.component";
import Box from "../../components/Box.component";

import styles from "./styles/Dashboard.module.scss";

class Dashboard extends Component {
	render() {
		return (
			<div>
                <Gridstack>
                    <Box className={styles.test}>Test 1</Box>
                    <Box className={styles.test}>Test 2</Box>
                </Gridstack>
				{/* <Grid container spacing={2}>
					<Grid item xs={6}>
						<Box className={styles.test}>Test</Box>
					</Grid>
					<Grid item xs={6}>
						<Box className={styles.test}>Test</Box>
					</Grid>
				</Grid> */}
			</div>
		);
	}
}

export default Dashboard;
