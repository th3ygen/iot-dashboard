import { useLocation, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSubscription, useMqttState } from "mqtt-react-hooks";

import PageHeader from "components/PageHeader.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import FolderCard from "components/FolderCard";

import styles from "styles/user/channel/View.module.scss";
import {
	FaClock,
	FaEye,
	FaEyeSlash,
	FaPaperPlane,
	FaTrashAlt,
} from "react-icons/fa";

function ViewChannel() {
	const location = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useOutletContext();
	const { message, connectionStatus } = useSubscription(
		"iot-dash/+/+/update"
	);

	const [fields, setFields] = useState([]);
	const [data, setData] = useState({});
	const [log, setLog] = useState([]);
	const [visible, setVisible] = useState(false);
	const [channel, setChannel] = useState({});
	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState([]);
	const [totalComments, setTotalComments] = useState(0);
	const [totalViews, setTotalViews] = useState(0);
	const [id, setId] = useState("");

	const commentRef = useRef();
	const logRef = useRef({});

	const deleteComment = async (id) => {
		try {
			const req = await fetch(
				"http://localhost:8080/api/channel/comment/" + id,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						auth: user.token,
					},
				}
			);

			if (req.status === 200) {
				// refresh the page using react router
				navigate(0);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const addComment = async () => {
		try {
			const commentText = commentRef.current.value;

			if (commentText.length > 0) {
				const req = await fetch(
					"http://localhost:8080/api/channel/comment/" +
						location.state.id,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							auth: user.token,
						},
						body: JSON.stringify({
							comment: commentText,
						}),
					}
				);

				if (req.status === 200) {
					// refresh the page using react router
					navigate(0);

					// smooth scroll to bottom
					commentRef.scrollTop = commentRef.scrollHeight;
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const toggleVisibility = async () => {
		try {
			let res, req;

			req = await fetch(
				"http://localhost:8080/api/channel/visibility/" +
					location.state.id,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						auth: user.token,
					},
					body: JSON.stringify({
						flag: !visible,
					}),
				}
			);

			console.log(req);

			if (req.status === 200) {
				setVisible(!visible);
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		try {
			if (connectionStatus === "Connected" && id !== "") {
				if (message) {
					const topic = message.topic.split("/");
					const body = JSON.parse(message.message);

					if (topic[1] === id) {
						const newData = { ...data };
						if (newData[topic[2]]) {
							newData[topic[2]].push(body);
						} else {
							newData[topic[2]] = [body];
						}

						const newLog = [...log];

						// convert data.date to date string
						// hh:mm:ss, Month DD
						const dateStr = new Date(body.date).toLocaleString();
						const date = dateStr.split(",")[0];
						const month = dateStr.split(",")[1];

						newLog.push([
							body.channel,
							body.field,
							body.value,
							`${date}, ${month}`,
						]);

						setLog(newLog);

						setData(newData);
					}
				}
			}
		} catch (e) {
			console.log(e);
		}
	}, [message, connectionStatus, id]);

	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [log]);

	useEffect(() => {
		// smooth scroll to top
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		(async () => {
			if (location.state.id) {
				let req, res;

				req = await fetch(
					"http://localhost:8080/api/channel/fields/data/" +
						location.state.id,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (req.status === 200) {
					res = await req.json();

					setId(res.id);
					setData(res.data);
					setFields(Object.keys(res.data));
				}

				req = await fetch(
					"http://localhost:8080/api/channel/visibility/" +
						location.state.id,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (req.status === 200) {
					res = await req.json();

					setVisible(res.flag);
				}
			}
		})();
	}, [location.state.id]);

	useEffect(() => {
		(async () => {
			if (location.state.id) {
				let req, res;
				let tViews = 0;
				let ownerId = "";

				req = await fetch(
					`http://localhost:8080/api/channel/public/${location.state.id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (req.status === 200) {
					res = await req.json();

					tViews = res.views || 0;

					ownerId = res.ownerId;
					setChannel(res);
				}

				req = await fetch(
					"http://localhost:8080/api/channel/likes/" +
						location.state.id,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (req.status === 200) {
					res = await req.json();

					setLikes(res.totalLikes);
				}

				if (req.status === 200) {
					setTotalViews(tViews + 1);
				}

				req = await fetch(
					"http://localhost:8080/api/channel/comments/" +
						location.state.id,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (req.status === 200) {
					res = await req.json();

					setTotalComments(res.length);
					setComments(
						res.map((c) => {
							// change the createdAt to date string
							// hh:mm am/pm, Month DD
							// example = "12:00 pm, Jan 01"
							const date = new Date(c.createdAt);
							const time = date.toLocaleTimeString();
							const month = date.toLocaleString("default", {
								month: "short",
							});
							const day = date.getDate();

							return {
								...c,
								createdAt: `${time}, ${month} ${day}`,
								isOwner: c.commentor._id === ownerId,
							};
						})
					);
				}
			}
		})();
	}, [location.state.id]);

	return (
		<div className="container">
			<PageHeader
				title="View Channel"
				brief="View your channel"
				navs={[
					{
						name: "Channels",
						path: "/user/channels",
						icon: "FaStream",
					},
				]}
			/>
			<div className={styles.content}>
				<FolderCard title="Channel information">
					<div className={styles.info}>
						<div className={styles.col}>
							<div className={styles.item}>
								<div className={styles.label}>Channel name</div>
								<div className={styles.value}>
									{channel.title}
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>Owner</div>
								<div className={styles.value}>
									{channel.owner && channel.owner.username}
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>Total fields</div>
								<div className={styles.value}>
									{(channel.fields &&
										channel.fields.length) ||
										0}
								</div>
							</div>
						</div>
						<div className={styles.col}>
							<div className={styles.item}>
								<div className={styles.label}>Data per day</div>
								<div className={styles.value}>
									{channel.dataPerDay || 0}
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>Views</div>
								<div className={styles.value}>{totalViews}</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>Likes</div>
								<div className={styles.value}>{likes}</div>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.actions}>
								{(visible && (
									<div
										className="neon-btn"
										onClick={toggleVisibility}
									>
										<FaEyeSlash />
										Hide channel
									</div>
								)) || (
									<div
										className="neon-btn"
										onClick={toggleVisibility}
									>
										<FaEye />
										Unhide channel
									</div>
								)}
							</div>
						</div>
					</div>
				</FolderCard>

				<div className={styles.fields}>
					{fields.map((field, index) => (
						<div key={index}>
							<DateAxisLineChart
								title={field}
								label={`${field}${index}`}
								data={data[field]}
								height="250px"
								stepped={false}
							/>
						</div>
					))}
				</div>

				<FolderCard title="Live update">
					<div className={styles.log}>
						<div className={styles.headers}>
							<div className={styles.header}>Source</div>
							<div className={styles.header}>Field</div>
							<div className={styles.header}>Timestamp</div>
							<div className={styles.header}>Data</div>
						</div>
						<div className={styles.list} ref={logRef}>
							{log.map((item, index) => (
								<div className={styles.item} key={index}>
									<div className={styles.device}>
										{item[0]}
									</div>
									<div className={styles.data}>{item[1]}</div>
									<div className={styles.data}>{item[2]}</div>
									<div className={styles.data}>{item[3]}</div>
								</div>
							))}
						</div>
					</div>
				</FolderCard>
				<div className={styles.comments}>
					<div className={styles.list}>
						{comments.length === 0 && "No one commented yet..."}
						{comments.map((item, index) => (
							<div key={index} className={styles.comment}>
								<div className={styles.user}>
									<div className={styles.avatar}
									>
										{item.commentor.username[0]}
									</div>
									<div className={styles.name}>
										{(item.isOwner && 'You') || item.commentor.username}
									</div>
								</div>
								<div className={styles.content}>
									{item.comment}
								</div>
								<div className={styles.date}>
									<FaClock style={{ color: "#2179ff" }} />
									{item.createdAt}
								</div>
								<div
									className={`neon-btn ${styles.delete}`}
									onClick={() => deleteComment(item._id)}
								>
									<FaTrashAlt />
								</div>
							</div>
						))}
					</div>

					<div className={styles.input}>
						<div className={styles.label}>Write something...</div>
						<div className={styles.inputField}>
							<textarea ref={commentRef}></textarea>
						</div>
						<div className={styles.buttons}>
							<div className="neon-btn" onClick={addComment}>
								<FaPaperPlane />
								Comment
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewChannel;
