import { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import PageHeader from "components/PageHeader.component";
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

function ApiKeysPage() {
	const navigate = useNavigate();

	const [user, setUser] = useOutletContext();
	const [keys, setKeys] = useState([]);
	const [renameForm, setRenameForm] = useState(false);
	const [renameId, setRenameId] = useState("");
	const renameInput = useRef(null);

	const rename = async () => {
		const id = renameId;
		const label = renameInput.current.value;

		const request = await fetch("http://localhost:8080/api/key/rename", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				auth: user.token,
			},
			body: JSON.stringify({
				id,
				label,
			}),
		});

		if (request.status === 200) {
			setRenameForm(false);
			setRenameId("");
			
			navigate(0);

			return true;
		}

		return false;
	};

	useEffect(() => {
		(async () => {
			if (user.token) {
				const request = await fetch(
					"http://localhost:8080/api/key/owned",
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

					if (response.keys) {
						let rows = [];

						response.forEach((key) => {
							// get simple date from createdAt
							const date = new Date(key.createdAt);
							const dateString = `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;

							rows.push([
								key.id,
								key.label || "UNNAMED:#888",
								key.pass,
								dateString,
							]);
						});

						setKeys(rows);
					}
				}
			}
		})();
	}, [user]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="API keys"
				brief="Manage your API keys"
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
					title="Manage API keys"
					headers={["Label", "API Key", "Created at"]}
					items={keys}
					colWidthPercent={["30%", "30%", "10%"]}
					actions={[
						{
							tooltip: "Rename",
							icon: "FaPen",
							callback: async (id) => {
								setRenameId(id);
								setRenameForm(true);
							},
						},
						{
							tooltip: "Delete",
							icon: "FaTrash",
							callback: async (id) => {
								const request = await fetch(
									"http://localhost:8080/api/key/delete/" +
										id,
									{
										method: "DELETE",
										headers: {
											"Content-Type": "application/json",
											auth: user.token,
										},
									}
								);

								if (request.status === 200) {
									setKeys(
										keys.filter((key) => key[0] !== id)
									);
								}
							},
						},
						{
							tooltip: "Copy API key",
							icon: "FaCopy",
							callback: (id) => {
								const row = keys.find((key) => key[0] === id);

								if (row) {
									navigator.clipboard.writeText(row[2]);
								}
							},
						},
					]}
				></Table>
			</div>

			<Popup open={renameForm} closeOnDocumentClick>
				<div className={styles.form}>
					<div className={styles.header}>Renaming an API key label</div>
					<div className={styles.content}>
						<div className={styles.row}>
							<div className={styles.label}>API key name</div>
						</div>
						<div className={styles.row}>
							<div className={styles.row}>
								<div className={styles.input}>
									<input
										type="text"
										placeholder="Enter a new label name"
										ref={renameInput}
									/>
								</div>
								<div
									className={styles.button}
									onClick={rename}
								>
									Rename
								</div>
							</div>
						</div>
					</div>
				</div>
			</Popup>
		</div>
	);
}

export default ApiKeysPage;
