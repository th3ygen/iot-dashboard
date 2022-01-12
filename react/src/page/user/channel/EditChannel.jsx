import { useState, useRef, useEffect } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import Tippy from "@tippyjs/react";

import PageHeader from "components/PageHeader.component";

import styles from "styles/user/channel/AddChannel.module.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";

function AddChannelPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const [user, setUser] = useOutletContext();

	const [fields, setFields] = useState([]);

	const channelTitleInput = useRef();
	const channelDescriptionInput = useRef();
	const fieldNameInput = useRef();
	const dataTypeInput = useRef();

	const color = {
		string: "rgb(103, 180, 14)",
		number: "rgb(14, 105, 180)",
		boolean: "rgb(161, 14, 180)",
	};

	const addField = () => {
		if (fieldNameInput.current.value.length > 0) {
			if (fields.indexOf(fieldNameInput.current.value) === -1) {
				const newFields = [...fields];
				newFields.push({
					label: fieldNameInput.current.value,
					dataType: dataTypeInput.current.value,
				});
				setFields(newFields);

				fieldNameInput.current.value = "";
			}
		}
	};

	const removeField = (field) => {
		const newFields = [...fields];
		newFields.splice(newFields.indexOf(field), 1);
		setFields(newFields);
	};

	const updateChannel = async () => {
		const request = await fetch(
			"http://localhost:8080/api/channel/update/" + location.state.id,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					auth: user.token,
				},
				body: JSON.stringify({
					title: channelTitleInput.current.value,
					description: channelDescriptionInput.current.value,
					fields: fields,
				}),
			}
		);

		if (request.status === 200) {
			navigate("/user/channels", { replace: true });
		}
	};

	const deleteChannel = async () => {
		const request = await fetch(
			"http://localhost:8080/api/channel/delete/" +
				location.state.id,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					auth: user.token,
				},
			}
		);

		if (request.status === 200) {
			navigate("/user/channels", { replace: true });
		}
	};

	const updateTypeColor = () => {
		const type = dataTypeInput.current.value;

		dataTypeInput.current.style.backgroundColor = color[type];
	};

	useEffect(() => {
		updateTypeColor();
	}, []);

	useEffect(() => {
		(async () => {
			if (location.state.id && user.token) {
				const request = await fetch(
					"http://localhost:8080/api/channel/id/" + location.state.id,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							auth: user.token,
						},
					}
				);

				if (request.status === 200) {
					const { channel } = await request.json();

					channelTitleInput.current.value = channel.title;
					channelDescriptionInput.current.value = channel.description;
					setFields(channel.fields);

					console.log(channel.fields);
				}
			}
		})();
	}, [location.state.id, user.token]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Edit channel"
				brief="Edit your channel to your needs"
				navs={[
					{
						name: "Channels",
						path: "/user/channels",
						icon: "FaStream",
					},
				]}
			/>
			<div className={styles.content}>
				<div className={styles.form}>
					<div className={styles.item}>
						<label>Channel title</label>
						<input type="text" ref={channelTitleInput} />
					</div>
					<div className={styles.item}>
						<label>Channel description</label>
						<input type="text" ref={channelDescriptionInput} />
					</div>
					<div className={styles.item}>
						<label>Fields</label>
						<div className={styles.group}>
							<div className={styles.item}>
								<label>All fields</label>
								<div className={styles.list}>
									{fields.map((field, i) => (
										<Tippy
											key={i}
											content="Click to remove"
											delay={[500, 0]}
											duration={[100, 100]}
											animation="scale"
											inertia="true"
										>
											<div
												className={styles.li}
												onClick={() =>
													removeField(field)
												}
											>
												<div
													className={styles.num}
													style={{
														background:
															color[
																field.dataType
															],
													}}
												>
													{i + 1}
												</div>
												<div className={styles.name}>
													{field.label}
												</div>
											</div>
										</Tippy>
									))}
								</div>
							</div>
							<div className={styles.item}>
								<label>Field name</label>
								<div className={styles.ingroup}>
									<select
										onChange={updateTypeColor}
										ref={dataTypeInput}
									>
										<option value="string">String</option>
										<option value="number">Number</option>
										<option value="boolean">Boolean</option>
									</select>
									<input
										type="text"
										ref={fieldNameInput}
										maxLength={10}
										placeholder="Enter a any variable name to add a field"
										onKeyPress={(e) => {
											if (e.key === "Enter") {
												addField();
											}
										}}
									/>
									<div
										className={styles.button}
										onClick={addField}
									>
										Add
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={`${styles.item} ${styles.addBtn}`}>
						<div className="neon-btn btn-red" onClick={deleteChannel}>
							<FaTrashAlt />
							<span>Delete channel</span>
						</div>
						<div className="neon-btn" onClick={updateChannel}>
							<FaPlus /> <span>Update channel</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddChannelPage;
