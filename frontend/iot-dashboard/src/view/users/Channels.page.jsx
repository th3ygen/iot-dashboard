import React, { Component, createRef, isValidElement } from "react";

import {
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Backdrop,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	TextField,
} from "@material-ui/core";
import {
	Add as AddIcon,
	ExpandMore as ExpandIcon,
	NavigateNext as NextIcon,
	NavigateBefore as PrevIcon,
	Check as SubmitIcon,
} from "@mui/icons-material";

import styles from "./styles/Channels.module.scss";
import exStyles from "../../shared/styles/common.module.scss";
class Channels extends Component {
	constructor(props) {
		super(props);

		this.state = {
			test: 'test',
			channels: [],
			formCreate: {
				open: false,
				page: 0,
				nextText: 'Next',
				payload: {
					id: "test",
					title: "",
					description: "",
					field: "",
					fieldDesc: "",
				},
			},
		};

		this.inputChange = this.inputChange.bind(this);

		this.loadChannels = this.loadChannels.bind(this);
		this.createChannel = this.createChannel.bind(this);

		this.nextPageCreate = this.nextPageCreate.bind(this);
		this.showFormCreate = this.showFormCreate.bind(this);
		this.closeFormCreate = this.closeFormCreate.bind(this);
		this.loadChannels = this.loadChannels.bind(this);
		this.prevPageCreate = this.prevPageCreate.bind(this);

		/* DOM refs */
		this.channelId = createRef();
		this.channelTitle = createRef();
		this.channelDesc = createRef();
		this.channelField = createRef();
		this.channelFieldDesc = createRef();

		this.channelImg = createRef();

		this.loadChannels();
	}

	inputChange(name, value) {
		let state = this.state;

		state = {
			...state,
			formCreate: {
				...state.formCreate,
				payload: {
					...state.formCreate.payload,
					[name]: value
				}
			}
		};

		this.setState({
			...state
		});
	}

	async loadChannels() {
		const req = await fetch('https://localhost:8080/channel/owned', {
			method: 'GET',
			headers: {
				auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiQyYiQwNyRiRFFBVy85dFdzcUx6aVNEOTlMbVJ1YjRUQ2wyaUFTUGhGdVF5NjU2THZLTTh6ekFYUEJqQyJ9.gkZJprNP2M3tEWUAIGvp4vrwe1d3ABZZpSHLgKaA_y8'
			},
		});

		const { channels } = await req.json();

		this.setState({
			...this.state,
			channels
		});
	}

	async createChannel() {
		const {id, title, description, field, fieldDesc} = this.state.formCreate.payload;

		console.log({
			id, title, description, field, fieldDesc
		});
		const channel = await fetch("https://localhost:8080/channel/create", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiQyYiQwNyRiRFFBVy85dFdzcUx6aVNEOTlMbVJ1YjRUQ2wyaUFTUGhGdVF5NjU2THZLTTh6ekFYUEJqQyJ9.gkZJprNP2M3tEWUAIGvp4vrwe1d3ABZZpSHLgKaA_y8'
			},
			body: JSON.stringify({
				id, title, description, field, fieldDesc
			})
		});

		console.log(channel);
		if (channel.ok) {
			console.log(`create: ${channel}`);
		}
	}

	prevPageCreate() {
		if (this.state.formCreate.page > 0) {
			let state = this.state;

			if (state.formCreate.page === 0) {
				this.closeFormCreate();
			}

			let nextText = (state.formCreate.page === 1) ? 'Cancel' : state.formCreate.nextText;

			state = {
				...state,
				formCreate: {
					...state.formCreate,
					nextText,
					page: state.formCreate.page - 1,
				},
			};

			this.setState({
				...state,
			});
		}
	}

	async nextPageCreate() {
		let state = this.state;

		/* id validate */
		if (state.formCreate.page === 0) {
			if (state.formCreate.payload.id === '') return;
			const isIdValid = await fetch(`https://localhost:8080/channel/validateid?id=${this.state.formCreate.payload.id}`);

			if (!isIdValid.ok) {
				return console.log('invalid id');
			}
		}

		if (state.formCreate.page === 2) {
			await this.createChannel();
			window.location.reload();
		}

		let nextText = (state.formCreate.page === 0) ? 'Create' : state.formCreate.nextText;

		state = {
			...state,
			formCreate: {
				...state.formCreate,
				nextText,
				page: state.formCreate.page + 1,
			},
		};

		this.setState({
			...state
		});
	}

	showFormCreate() {
		let state = this.state;

		/* this.channelImg.current.style.backgroundImage = 'url(https://picsum.photos/200)' */

		state = {
			...state,
			formCreate: {
				...state.formCreate,
				open: true,
				page: 0,
				payload: {
					id: "",
					title: "",
					description: "",
					field: "",
					fieldDesc: "",
				},
			},
		};
		this.setState({
			...state,
		});
	}

	closeFormCreate() {
		let state = this.state;

		state = {
			...state,
			formCreate: {
				...state.formCreate,
				open: false,
			},
		};
		this.setState({
			...state,
		});
	}

	render() {
		return (
			<div>
				<div className={exStyles.header}>
					<div className={exStyles.text}>
						<div className={exStyles.title}>Data channels</div>
						<div className={exStyles.subtitle}>
							Group and label your data into channels as your
							preferences
						</div>
					</div>
					<div className={styles.actions}>
						<Button
							variant={"outlined"}
							startIcon={<AddIcon />}
							onClick={this.showFormCreate}
						>
							Add channel
						</Button>
					</div>
				</div>
				<div className={exStyles.body}>
					<Backdrop
						style={{ zIndex: 999 }}
						open={this.state.formCreate.open}
					>
						<Stepper
							className={styles.stepper}
							activeStep={this.state.formCreate.page}
							orientation={"vertical"}
						>
							<Step>
								<StepLabel
									className={styles["stepper-label"]}
								>
									Unique
								</StepLabel>
								<StepContent>
									<div>
										<div className={styles["vert-form"]}>
											<TextField
												className={styles["input-text"]}
												label={"Channel ID"}
												placeholder={"Pick an ID"}
												// ref={this.channelId}
												value={ this.state.formCreate.payload.id }
												onChange={e => this.inputChange('id', e.target.value)}
											/>
										</div>
									</div>
								</StepContent>
							</Step>
							<Step>
								<StepLabel
									className={styles["stepper-label"]}
								>
									Details
								</StepLabel>
								<StepContent>
									<div>
										<div className={styles["vert-form"]}>
											<TextField
												className={styles["input-text"]}
												label={"Title"}
												ref={this.channelTitle}
												value={this.state.formCreate.payload.title}
												onChange={e => this.inputChange('title', e.target.value)}
											/>
											<TextField
												className={styles["input-text"]}
												label={"Description"}
												ref={this.channelDesc}
												value={this.state.formCreate.payload.description}
												onChange={e => this.inputChange('description', e.target.value)}
											/>
											{/* <div
												ref={this.channelImg}
												style={{
													backgroundImage:
														"url(https://picsum.photos/200)",
													height: 200,
													width: 200,
												}}
											></div> */}

										</div>
									</div>
								</StepContent>
							</Step>

							{/* <Step>
								<StepLabel
									className={styles["stepper-label"]}
								>
									Data fields
								</StepLabel>
								<StepContent>
									<div>
										<div className={styles["vert-form"]}>
											<TextField
												className={styles["input-text"]}
												label={"Name"}
												ref={this.channelField}
												value={this.state.formCreate.payload.field}
												onChange={e => this.inputChange('field', e.target.value)}
											/>
											<TextField
												className={styles["input-text"]}
												label={"Description"}
												ref={this.channelFieldDesc}
												value={this.state.formCreate.payload.fieldDesc}
												onChange={e => this.inputChange('fieldDesc', e.target.value)}
											></TextField>
										</div>
									</div>
								</StepContent>
							</Step> */}
							<div className={styles["step-action"]}>
								<Button
									className={`${styles["step-button"]} ${styles["step-button-b"]}`}
									size={"small"}
									startIcon={<PrevIcon />}
									onClick={this.prevPageCreate}
								>
									Back
								</Button>
								<Button
									className={styles["step-button"]}
									size={"small"}
									startIcon={<NextIcon />}
									onClick={this.nextPageCreate}
								>
									{this.state.formCreate.nextText}
								</Button>
								{/* <Button
									className={styles["step-button"]}
									size={"small"}
									startIcon={<SubmitIcon />}
									onClick={this.nextPageCreate}
								>
									Create
								</Button> */}
							</div>
						</Stepper>
					</Backdrop>
					<div className={styles["channels-container"]}>
						{this.state.channels.length === 0 ? (
							<div className={styles["empty"]}>
								No channel found
							</div>
						) : (
							<div style={{ padding: 10 }}>
								{this.state.channels
									.map((x, i) => (
										<Accordion
											key={i}
											className={styles.accordion}
										>
											<AccordionSummary
												expandIcon={<ExpandIcon />}
												id={1}
											>
												<Typography className={styles['channel-title']}>{x.title} @{x.channelId}</Typography>
											</AccordionSummary>
											<AccordionDetails className={styles['channel-desc']}>
												{x.description}
											</AccordionDetails>
										</Accordion>
									))}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Channels;
