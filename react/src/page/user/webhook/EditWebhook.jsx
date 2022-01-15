import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import PageHeader from "components/PageHeader.component";
import { FaPlus } from "react-icons/fa";

import styles from "styles/user/webhook/AddWebhook.module.scss";

function AddWebhookPage() {
	const [user, setUser] = useOutletContext();

	const location = useLocation();
	const navigate = useNavigate();

    const [channels, setChannels] = useState([]);
    const [fields, setFields] = useState([]);

	const labelRef = useRef();
	const urlRef = useRef();
	const payloadRef = useRef();
	const channelRef = useRef();
	const triggerFieldRef = useRef();
	const triggerCompareRef = useRef();
	const triggerValueRef = useRef();

	const updateWebhook = async () => {
		try {
			let res, req;

			res = await fetch("http://localhost:8080/api/webhook/update/"+location.state.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					auth: user.token,
				},
				body: JSON.stringify({
					label: labelRef.current.value,
					url: urlRef.current.value,
					channelId: channelRef.current.value,
					payload: payloadRef.current.value,
					trigger: `${triggerFieldRef.current.value} ${triggerCompareRef.current.value} ${triggerValueRef.current.value}`,
				}),
			});

			if (res.status === 200) {
				req = await res.json();

				navigate("/user/webhooks");
			}
		} catch (e) {
			console.error(e);
		}
	};

	const onChannelSelect = () => {
		try {
            const channel = channels.find((channel) => channel.id === channelRef.current.value);

            setFields(channel.fields);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		(async () => {
			try {
                if (user.token) {
                    let res, req;

                    req = await fetch("http://localhost:8080/api/channel/owned", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            auth: user.token,
                        },
                    });

                    if (req.status === 200) {
                        res = await req.json();

                        setChannels(res.channels);
                        setFields(res.channels[0].fields);
                    }
                }
			} catch (e) {
				console.error(e);
			}
		})();
	}, [user.token]);

	useEffect(() => {
		(async () => {
			if (location.state.id) {
				try {
					let res, req;

					req = await fetch(`http://localhost:8080/api/webhook/get/${location.state.id}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							auth: user.token,
						},
					});

					if (req.status === 200) {
						res = await req.json();

						labelRef.current.value = res.label;
						urlRef.current.value = res.url;
						channelRef.current.value = res.channelId;
						payloadRef.current.value = res.payload;
						triggerFieldRef.current.value = res.trigger.split(" ")[0];
						triggerCompareRef.current.value = res.trigger.split(" ")[1];
						triggerValueRef.current.value = res.trigger.split(" ")[2];
					}
				} catch (e) {
					console.error(e);
				}
			}

		})();
	}, [location.state.id]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Edit webhook"
				brief="Edit your webhook anytime you want"
				navs={[
					{
						name: "Webhooks",
						path: "/user/webhooks",
						icon: "FaStream",
					},
				]}
			/>

			<div className={styles.content}>
				<div className={styles.form}>
					<div className={styles.item}>
						<label>Label</label>
						<input type="text" ref={labelRef} />
					</div>
					<div className={styles.item}>
						<label>URL</label>
						<input type="text" ref={urlRef} />
					</div>
					<div className={styles.item}>
						<label>Payload</label>
						<input type="text" ref={payloadRef} />
					</div>
					<div className={styles.item}>
						<label>Channel</label>
						<select ref={channelRef} onChange={onChannelSelect}>
							{channels.map((channel) => (
                                <option key={channel._id} value={channel._id}>
                                    {channel.title}
                                </option>
                            ))}
						</select>
					</div>
					<div className={styles.item}>
						<label>Trigger</label>
						<div className={styles.group}>
							<div className={styles.item}>
								<label>Field</label>
								<select ref={triggerFieldRef}>
									{fields.map((field) => (
                                        <option key={field._id} value={field._d}>
                                            {field.label}
                                        </option>
                                    ))}
								</select>
							</div>
							<div className={styles.item}>
								<label>Comparison operator</label>
								<select ref={triggerCompareRef}>
									<option value="==">equal to</option>
									<option value="!=">not equal to</option>
									<option value=">">greater than</option>
									<option value="<">less than</option>
									<option value=">=">
										greater than or equal to
									</option>
									<option value="<=">
										less than or equal to
									</option>
								</select>
							</div>
							<div className={styles.item}>
								<label>Value</label>
								<input type="number" ref={triggerValueRef} />
							</div>
						</div>
					</div>
					<div className={`${styles.item} ${styles.addBtn}`}>
						<div className="neon-btn" onClick={updateWebhook}>
							<FaPlus /> <span>Edit webhook</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddWebhookPage;
