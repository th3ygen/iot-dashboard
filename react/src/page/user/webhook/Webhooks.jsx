import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import PageHeader from "components/PageHeader.component";
import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";

import styles from "styles/user/webhook/Webhooks.module.scss";

function WebhooksPage() {
	const navigate = useNavigate();
	const [user, setUser] = useOutletContext();

	const [webhooks, setWebhooks] = useState([]);

	useEffect(() => {
		(async () => {
			let req, res;
			try {
				if (user.token) {
					req = await fetch(
						"http://localhost:8080/api/webhook/owned",
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								auth: user.token,
							},
						}
					);

					if (req.status === 200) {
						res = await req.json();

						console.log(res);

						setWebhooks(
							res.map((webhook) => [
								webhook._id,
								webhook.label,
								webhook.trigger,
								webhook.lastStatus || "",
								webhook.lastRequestMessage || "",
								`${
									webhook.active ? "Active" : "Inactive"
								}:#FFF`,
							])
						);
					}
				}
			} catch (e) {
				console.error(e);
			}
		})();
	}, [user.token]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Webhooks"
				brief="Manage your webhooks, links to any external services with ease"
				navs={[
					{
						name: "Add webhook",
						path: "/user/webhooks/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
				<Table
					title="Manage webhooks"
					headers={[
						"Label",
						"Trigger",
						"Req. status",
						"Req. message",
						"Status",
					]}
					colWidthPercent={["20%", "10%", "10%", "20%", "10%"]}
					centered={[false, false, true, false, false]}
					items={webhooks}
					actions={[
						{
							tooltip: "Edit",
							icon: "FaEdit",
							callback: async (id) => {
								navigate("/user/webhooks/edit", {
									state: { id },
								});
							},
						},
						{
							tooltip: "Delete",
							icon: "FaTrash",
							callback: async (id) => {
								let req, res;
								try {
									if (user.token) {
										req = await fetch(
											"http://localhost:8080/api/webhook/delete/" +
												id,
											{
												method: "DELETE",
												headers: {
													"Content-Type":
														"application/json",
													auth: user.token,
												},
											}
										);

										if (req.status === 200) {
											res = await req.json();

											setWebhooks(
												webhooks.filter(
													(webhook) =>
														webhook[0] !== id
												)
											);
										}
									}
								} catch (e) {
									console.error(e);
								}
							},
						},
						{
							tooltip: "Activate/Deactivate",
							icon: "FaExchangeAlt",
							callback: async (id) => {
								try {
									let res, req;
									res = await fetch(
										"http://localhost:8080/api/webhook/toggle/" +
											id,
										{
											method: "POST",
											headers: {
												"Content-Type":
													"application/json",
												auth: user.token,
											},
										}
									);

									if (res.status === 200) {
										req = await fetch(
											"http://localhost:8080/api/webhook/owned",
											{
												method: "GET",
												headers: {
													"Content-Type":
														"application/json",
													auth: user.token,
												},
											}
										);

										if (req.status === 200) {
											res = await req.json();

											setWebhooks(
												res.map((webhook) => [
													webhook._id,
													webhook.label,
													webhook.trigger,
													webhook.lastStatus || "",
													webhook.lastRequestMessage || "",
													`${
														webhook.active
															? "Active"
															: "Inactive"
													}:#FFF`,
												])
											);
										}
									}
								} catch (e) {
									console.error(e);
								}
							},
						},
					]}
				/>
			</div>
		</div>
	);
}

export default WebhooksPage;
