import React, { Component } from 'react';

import {
	Button,
	Card,
	InputLabel, Select, MenuItem, FormControl,
	IconButton,
	Icon
} from "@mui/material";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import styles from "./styles/Keys.module.scss";
import exStyles from "../../shared/styles/common.module.scss";

class Keys extends Component {
	constructor(props) {
		super(props);

		this.state = {
			keys: []
		};
	}

	async componentDidMount() {
		// load keys
		let keys = await fetch('https://localhost:8080/key/find', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'auth': localStorage.getItem('token')
			}
		});

		keys = await keys.json();

		this.setState({
			keys: Array(8).fill(keys[0])
		});
	}

	copyToClipboard(text) {
		const el = document.createElement('textarea');
		el.value = text;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	};

    render() {
        return (
            <div>
				<div className={exStyles.header}>
					<div className={exStyles.text}>
						<div className={exStyles.title}>Keys</div>
						<div className={exStyles.subtitle}>
							Collection of keys for authorizing your content and APIs
						</div>
					</div>
					<div className={styles.actions}>
					</div>
				</div>
				<div className={exStyles.body}>
					{this.state.keys.length > 0 ?
						(<div className={styles.keys}>
							{
								this.state.keys.map((key, index) => {
									return (
										<Card key={index} className={styles.key}>
											<div className={styles.header}>
												<div className={styles.name}>Test key name</div>
											</div>
											<div className={styles.body}>
												<div className={styles.pass}>
													<div className={styles.label}>API Key:</div>
													<div className={styles.value}>
														<div>{key.pass}</div>
														<div className={styles.copy}>
															<IconButton size="small" onClick={() => {
																this.copyToClipboard(key.pass);
															}}>
																<Icon>
																	<ContentCopyIcon />
																</Icon>
															</IconButton>
														</div>
													</div>
													
												</div>
												<div className={styles.bind}>
													<div className={styles.channel}>
														<div className={styles.label}>Channel:</div>
														<div className={styles.value}>
															<select>
																<option value="">No channel</option>
																<option value="">Channel 1</option>
																<option value="">Channel 2</option>
															</select>
														</div>
													</div>
													<div className={styles.role}>
														<div className={styles.label}>Role:</div>
														<div className={styles.value}>
															<select>
																<option value="">No role</option>
																<option value="">Read</option>
																<option value="">Write</option>
																<option value="">Read/Write</option>
															</select>
														</div>
													</div>
												</div>
											</div>
										</Card>
									);
								})
							}
						</div>)
						:
						<div className={exStyles.empty}>
							<div className={exStyles.graphic}></div>
							<div className={exStyles.text}>
								You didn't create any keys yet...
							</div>
							<Button variant="contained" className={exStyles['btn-add']}>Create key</Button>
						</div>
					}
					
                </div>
            </div>
        );
    }
}

export default Keys;