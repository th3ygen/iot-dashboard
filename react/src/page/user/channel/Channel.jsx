import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import PageHeader from "components/PageHeader.component";
import Table from "components/Table.component";
import NumberWidget from "components/NumberWidget.component";

import styles from "styles/user/channel/Channel.module.scss";

function ChannelPage() {
    const navigate = useNavigate();

	const [user, setUser] = useOutletContext();

	const [channels, setChannels] = useState([]);

	useEffect(() => {
		(async () => {
			if (user.token) {
				const request = await fetch(
					"http://localhost:8080/api/channel/owned",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							auth: user.token,
						},
					}
				);

				if (request.status === 200) {
					const response = await request.json();

					if (response.channels) {
						let rows = [];

						response.channels.forEach((channel) => {
							// get simple date from updateAt
							// dd/mm/yyyy
							const date = new Date(channel.updatedAt);
							const dateString = `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;

							rows.push([
								channel._id,
								channel.title,
								channel.fields.length,
								channel.uniqueId,
								dateString,
							]);
						});

						setChannels(rows);
					}
				}
			}
		})();
	}, [user]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Channel"
				brief="Easily manage your channel, providing a path for your data stream"
				navs={[
					{
						name: "Add channel",
						path: "/user/channels/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
				{/* <div className={styles.widget}>
					<NumberWidget
						title="Total channels"
						value="1,234"
						label="ch"
					/>

					<NumberWidget
						title="Most active"
						value="Channel #2"
						label="ch"
						style={{ fontSize: "18px" }}
					/>

					<NumberWidget
						title="Least active"
						value="Channel #1"
						label="ch"
						style={{ fontSize: "18px" }}
					/>
				</div>
 */}
				<Table
					title="Manage channels"
					headers={[
						"Channel",
						"Total fields",
						"Unique ID",
						"Last update",
					]}
					items={channels}
					colWidthPercent={["30%", "10%", "20%", "10%"]}
					centered={[false, true, false, true]}
					actions={[
						{
							icon: "FaEdit",
							tooltip: "Edit",
							callback: async (n) => {
								navigate('/user/channels/edit', { replace: true, state: { id: n }});
							},
						},
						{
							tooltip: "Manage filters",
							icon: "FaFilter",
							callback: async (n) => {
								navigate('/user/channels/filters', { replace: true, state: { id: n }});
							},
						},
						{
							icon: "FaEye",
							tooltip: "View",
							callback: (n) => {
								navigate('/user/channels/view', { replace: true, state: { id: n }});
							},
						},
						{
							tooltip: "Manage API key",
                            callback: (n) => {
                                navigate('/user/channels/key', { replace: true, state: { id: n } });
                            },
                            icon: "FaKey"
						},
					]}
				/>
			</div>
		</div>
	);
}

export default ChannelPage;
