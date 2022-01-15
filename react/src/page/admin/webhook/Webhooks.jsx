import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import PageHeader from "components/PageHeader.component";
import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";

import styles from "styles/user/webhook/Webhooks.module.scss";

function UsersPage() {
	const navigate = useNavigate();
	const [user, setUser] = useOutletContext();

	const [webhooks, setWebhooks] = useState([]);

	useEffect(() => {
		(async () => {
			if (user.token) {
				const req = await fetch("http://localhost:8080/api/webhook/list", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						auth: user.token,
					},
				});

				if (req.status === 200) {
					const res = await req.json();

					console.log(res);

					setWebhooks(
						res.map((webhook) => {
							// convert createdAt to a date string
							// dd/mm/yyyy
							const date = new Date(webhook.createdAt);
							const dateString = `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;

							return [
								webhook._id,
								webhook.label,
								webhook.owner,
								dateString,
							];
						})
					);
				}
			}
		})();
	}, [user.token]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Webhooks"
				brief="Manage the webhooks, delete, or edit"
				navs={[
					{
						name: "Create webhook",
						path: "/user/webhooks/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
				<Table
					title="Webhooks"
					headers={["Webhook", "Owner", "Created at"]}
					colWidthPercent={["20%", "20%", "10%"]}
					centered={[false, false, false]}
					items={webhooks}
					actions={[
						{
							tooltip: "Edit",
							icon: "FaEdit",
							callback: async (id) => {
                                navigate('/admin/users/edit', { state: { id } });
                            },
						},
						{
							tooltip: "Delete",
							icon: "FaTrash",
							callback: async (id) => {
								
							},
						},
					]}
				/>
			</div>
		</div>
	);
}

export default UsersPage;
