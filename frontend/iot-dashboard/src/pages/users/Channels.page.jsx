import React, { Component, createRef } from "react";

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
} from "@material-ui/icons";

import styles from "./styles/Channels.module.scss";
import exStyles from "../../shared/styles/common.module.scss";
class Channels extends Component {
	constructor(props) {
		super(props);

		this.state = {
			test: 'test',
			channels: [1],
			formCreate: {
				open: false,
				page: 0,
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

		this.formCreateContent = [
			{
				title: "Unique ID",
				content: (
					<div className={styles["vert-form"]}>
						<TextField
							className={styles["input-text"]}
							label={"Channel ID"}
							placeholder={"Pick an ID"}
							// ref={this.channelId}
							value={ this.state.formCreate.payload.id }
							onChange={e => this.inputChange('id', e.target.value)}
						/>
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
								Next
							</Button>
						</div>
					</div>
				),
			},
			{
				title: "Details",
				content: (
					<div className={styles["vert-form"]}>
						<TextField
							className={styles["input-text"]}
							label={"Title"}
							ref={this.channelTitle}
							value={this.state.formCreate.payload.title}
						/>
						<TextField
							className={styles["input-text"]}
							label={"Description"}
							ref={this.channelDesc}
							value={this.state.formCreate.payload.description}
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
								Next
							</Button>
						</div>
					</div>
				),
			},
			{
				title: "Data fields",
				content: (
					<div className={styles["vert-form"]}>
						<TextField
							className={styles["input-text"]}
							label={"Name"}
							ref={this.channelField}
							value={this.state.formCreate.payload.field}
						/>
						<TextField
							className={styles["input-text"]}
							label={"Description"}
							ref={this.channelFieldDesc}
							value={this.state.formCreate.payload.fieldDesc}
						></TextField>

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
								startIcon={<SubmitIcon />}
								onClick={this.nextPageCreate}
							>
								Create
							</Button>
						</div>
					</div>
				),
			},
		];

		this.loadChannels();
	}

	inputChange(name, value) {
		let state = this.state;

		console.log(name, value);

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

	loadChannels() {}

	prevPageCreate() {
		if (this.state.formCreate.page > 0) {
			let state = this.state;

			state = {
				...state,
				formCreate: {
					...state.formCreate,
					page: state.formCreate.page - 1,
				},
			};

			this.setState({
				...state,
			});
		}
	}

	nextPageCreate() {
		let state = this.state;

		state = {
			...state,
			formCreate: {
				...state.formCreate,
				page: state.formCreate.page + 1,
			},
		};

		this.setState({
			...state,
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
							{this.formCreateContent.map((item, x) => (
								<Step key={x}>
									<StepLabel
										className={styles["stepper-label"]}
									>
										{item.title}
									</StepLabel>
									<StepContent>
										<div>{item.content}</div>
									</StepContent>
								</Step>
							))}
						</Stepper>
					</Backdrop>
					<div className={styles["channels-container"]}>
						{this.state.channels.length === 0 ? (
							<div className={styles["empty"]}>
								No channel found
							</div>
						) : (
							<div style={{ padding: 10 }}>
								{Array(2)
									.fill(0)
									.map((x, i) => (
										<Accordion
											key={i}
											className={styles.accordion}
										>
											<AccordionSummary
												expandIcon={<ExpandIcon />}
												id={1}
											>
												<Typography>Test #1</Typography>
											</AccordionSummary>
											<AccordionDetails>
												Lorem ipsum dolor sit amet
												consectetur adipisicing elit.
												Vero, ea?
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
