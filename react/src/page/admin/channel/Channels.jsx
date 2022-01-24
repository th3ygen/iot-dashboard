import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import PageHeader from "components/PageHeader.component";
import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";

import styles from "styles/user/webhook/Webhooks.module.scss";

function UsersPage() {
	const navigate = useNavigate();
	const [user, setUser] = useOutletContext();

	const [channels, setChannels] = useState([]);

	useEffect(() => {
		(async () => {
			if (user.token) {
				const req = await fetch("http://localhost:8080/api/channel/list", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						auth: user.token,
					},
				});

				if (req.status === 200) {
					const res = await req.json();

					setChannels(
						res.map((channel) => {
							// convert createdAt to a date string
							// dd/mm/yyyy
							const date = new Date(channel.createdAt);
							const dateString = `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;

							return [
								channel._id,
								channel.title,
								channel.owner,
								channel.fields.length,
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
				title="Channels"
				brief="Manage the channels, delete, edit, and create new channels"
				navs={[
					{
						name: "Create channel",
						path: "/admin/channels/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
				<Table
					title="Channels"
					headers={["Channel", "Owner", "Total fields", "Created at"]}
					colWidthPercent={["30%", "10%",  "10%", "10%"]}
					centered={[false, false, false, false]}
					items={channels}
					actions={[
						{
							tooltip: "Edit",
							icon: "FaEdit",
							callback: async (id) => {
                                navigate('/admin/channels/edit', { state: { id } });
                            },
						},
						{
							tooltip: "Delete",
							icon: "FaTrash",
							callback: async (id) => {
								try {
									const req = await fetch(
										"http://localhost:8080/api/channel/delete/"+id,
										{
											method: "DELETE",
											headers: {
												"Content-Type": "application/json",
												auth: user.token,
											},
										}
									);

									if (req.status === 200) {
										setChannels(channels.filter((channel) => channel[0] !== id));
									}
								} catch (e) {
									console.log(e);
								}
							},
						},
					]}
				/>
			</div>
		</div>
	);
}

export default UsersPage;
