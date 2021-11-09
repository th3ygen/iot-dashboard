import React, { Component } from 'react';

import {
	Button
} from "@mui/material";

import styles from "./styles/Keys.module.scss";
import exStyles from "../../shared/styles/common.module.scss";

class Filters extends Component {
    render() {
        return (
            <div>
				<div className={exStyles.header}>
					<div className={exStyles.text}>
						<div className={exStyles.title}>Filters</div>
						<div className={exStyles.subtitle}>
							Pipe your data into a customizable calculation on real-time
						</div>
					</div>
					<div className={styles.actions}>
					</div>
				</div>
				<div className={exStyles.body}>
					<div className={exStyles.empty}>
						<div className={exStyles.graphic}></div>
						<div className={exStyles.text}>
							You didn't create filter yet...
						</div>
						<Button variant="contained" className={exStyles['btn-add']}>Create a filter</Button>
					</div>
                </div>
            </div>
        );
    }
}

export default Filters;