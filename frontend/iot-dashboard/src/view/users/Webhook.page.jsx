import React, { Component } from 'react';

import {
	Button
} from "@mui/material";

import styles from "./styles/Keys.module.scss";
import exStyles from "../../shared/styles/common.module.scss";

class Webhook extends Component {
    render() {
        return (
            <div>
				<div className={exStyles.header}>
					<div className={exStyles.text}>
						<div className={exStyles.title}>Webhook</div>
						<div className={exStyles.subtitle}>
							Provide your external app with real-time event of your data
						</div>
					</div>
					<div className={styles.actions}>
					</div>
				</div>
				<div className={exStyles.body}>
					<div className={exStyles.empty}>
						<div className={exStyles.graphic}></div>
						<div className={exStyles.text}>
							You didn't create any webhook yet...
						</div>
						<Button variant="contained" className={exStyles['btn-add']}>Create webhook</Button>
					</div>
                </div>
            </div>
        );
    }
}

export default Webhook;