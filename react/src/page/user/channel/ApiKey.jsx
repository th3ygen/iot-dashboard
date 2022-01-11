import { useState, useRef, useEffect } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
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

	const titleRef = useRef();
	const descriptionRef = useRef();
	const writeKeyRef = useRef();
	const readKeyRef = useRef();

	const [user, setUser] = useOutletContext();

	const [keys, setKeys] = useState([]);
	const [channel, setChannel] = useState({});

	const updateKeys = async () => {
		const request = await fetch('http://localhost:8080/api/channel/updateKeys', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				auth: user.token,
			},
			body: JSON.stringify({
				id: location.state.id || channel.id,
				keys: {
					w: (keys[writeKeyRef.current.selectedIndex - 1] && keys[writeKeyRef.current.selectedIndex - 1].id) || null,
					r: (keys[readKeyRef.current.selectedIndex - 1] && keys[readKeyRef.current.selectedIndex - 1].id) || null,
				}
			}),
		});

		if (request.status === 200) {
			navigate('/user/channels', { replace: true });
		}
	};

	useEffect(() => {
		if (location.state.id && user.token) {
			(async () => {
				let request, response, list;

				request = await fetch("http://localhost:8080/api/key/owned", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						auth: user.token,
					},
				});

				if (request.status === 200) {
					list = await request.json();

					setKeys(list);
				}

				request = await fetch(
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
					response = await request.json();
				
					titleRef.current.value = response.channel.title;
					descriptionRef.current.value = response.channel.description;

					writeKeyRef.current.selectedIndex = 0;
					readKeyRef.current.selectedIndex = 0;

					if (response.channel.keys) {
						let w = list.findIndex(key => key.id === response.channel.keys.w);
						let r = list.findIndex(key => key.id === response.channel.keys.r);
						
						console.log(r, w);

						writeKeyRef.current.selectedIndex = (w !== -1) ? w + 1 : 0;
						readKeyRef.current.selectedIndex =  (r !== -1) ? r + 1 : 0;
					}

					setChannel(response.channel);
				}
			})();
		}
	}, [user.token]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Channel API keys"
				brief="Authorize your channel, restricts the access to only person with the API key."
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
						<input type="text" ref={titleRef} disabled/>
					</div>
					<div className={styles.item}>
						<label>Channel description</label>
						<input type="text" ref={descriptionRef} disabled/>
					</div>
					<div className={styles.item}>
						<label>API Keys</label>
						<div className={styles.group}>
							<div className={styles.item}>
								<div className={styles.keys}>
									<div className={styles.item}>
										<label>READ</label>
										<select name="" ref={readKeyRef}>
											<option value="">None</option>
											{keys.map((key) => (
												<option
													key={key.pass}
													value={key.pass}
												>
													{key.label} -> {key.id}
												</option>
											))}
										</select>
									</div>
									<div className={styles.item}>
										<label>WRITE</label>
										<select name="" ref={writeKeyRef}>
											<option value="">None</option>
											{keys.map((key) => (
												<option
													key={key.pass}
													value={key.pass}
												>
													{key.label} -> {key.id}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={`${styles.item} ${styles.addBtn}`}>
						<div className="neon-btn" onClick={updateKeys}>
							<FaPlus /> <span>Update</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddChannelPage;
