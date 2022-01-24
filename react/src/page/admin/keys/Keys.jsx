import { useState, useEffect, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import PageHeader from "components/PageHeader.component";
import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";

import styles from "styles/user/apiKey/ApiKeys.module.scss";

function AddApiKeyForm() {
	const navigate = useNavigate();

	const [user, setUser] = useOutletContext();

	const apiKeyLabel = useRef(null);

	const createApiKey = async () => {
		const request = await fetch("http://localhost:8080/api/key/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				auth: user.token,
			},
			body: JSON.stringify({
				label: apiKeyLabel.current.value,
			}),
		});

		if (request.status === 200) {
			navigate(0);
		}
	};

	return (
		<div className={styles.form}>
			<div className={styles.header}>Creating a new API key</div>
			<div className={styles.content}>
				<div className={styles.row}>
					<div className={styles.label}>API key name</div>
				</div>
				<div className={styles.row}>
					<div className={styles.row}>
						<div className={styles.input}>
							<input
								type="text"
								placeholder="A label name for the API key"
								ref={apiKeyLabel}
							/>
						</div>
						<div className={styles.button} onClick={createApiKey}>
							Create
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function KeysPage() {
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
						name: "Add API key",
						path: "/user/apiKeys/add",
						icon: "FaPlus",
						popup: true,
						popupContent: <AddApiKeyForm />,
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

export default KeysPage;
