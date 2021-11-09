import React, { Component } from 'react';

import {
	Button
} from "@mui/material";

import styles from "./styles/Keys.module.scss";
import exStyles from "../../shared/styles/common.module.scss";

class Devices extends Component {
    render() {
        return (
            <div>
				<div className={exStyles.header}>
					<div className={exStyles.text}>
						<div className={exStyles.title}>Devices</div>
						<div className={exStyles.subtitle}>
							Monitor your device conditions at one place, it's easy
						</div>
					</div>
					<div className={styles.actions}>
					</div>
				</div>
				<div className={exStyles.body}>
					<div className={exStyles.empty}>
						<div className={exStyles.graphic}></div>
						<div className={exStyles.text}>
							You didn't add any device yet...
						</div>
						<Button variant="contained" className={exStyles['btn-add']}>Add device</Button>
					</div>
                </div>
            </div>
        );
    }
}

export default Devices;