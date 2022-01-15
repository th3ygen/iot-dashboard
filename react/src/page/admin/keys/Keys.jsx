import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import PageHeader from "components/PageHeader.component";
import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";

import styles from "styles/user/webhook/Webhooks.module.scss";

function UsersPage() {
	const navigate = useNavigate();
	const [user, setUser] = useOutletContext();

	const [keys, setKeys] = useState([]);

	useEffect(() => {
		(async () => {
			if (user.token) {
				const req = await fetch("http://localhost:8080/api/key/list", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						auth: user.token,
					},
				});

				if (req.status === 200) {
					const res = await req.json();

					console.log(res);

					setKeys(
						res.map((key) => {
							// convert createdAt to a date string
							// dd/mm/yyyy
							const date = new Date(key.createdAt);
							const dateString = `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;

							return [
								key._id,
								key.label,
								key.owner,
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
				title="API Keys"
				brief="Manage the keys, delete, edit, and create new API keys"
				navs={[
					{
						name: "Create API Key",
						path: "/user/webhooks/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
				<Table
					title="API Keys"
					headers={["API Key", "Owner", "Created at"]}
					colWidthPercent={["30%", "10%", "10%"]}
					centered={[false, false, false]}
					items={keys}
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
