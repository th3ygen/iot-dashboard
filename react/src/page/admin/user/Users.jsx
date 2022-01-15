import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import PageHeader from "components/PageHeader.component";
import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";

import styles from "styles/user/webhook/Webhooks.module.scss";

function UsersPage() {
	const navigate = useNavigate();
	const [user, setUser] = useOutletContext();

	const [users, setUsers] = useState([]);

	useEffect(() => {
		(async () => {
			if (user.token) {
				const req = await fetch("http://localhost:8080/api/auth/list", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						auth: user.token,
					},
				});

				if (req.status === 200) {
					const res = await req.json();

					console.log(res);

					setUsers(
						res.map((user) => {
							// convert createdAt to a date string
							// dd/mm/yyyy
							const date = new Date(user.createdAt);
							const dateString = `${date.getDate()}/${
								date.getMonth() + 1
							}/${date.getFullYear()}`;

							return [
								user._id,
								user.username,
								user.email,
								user.title || "Guest",
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
				title="Users"
				brief="Manage the users, delete, edit, and create new users"
				navs={[
					{
						name: "Create user",
						path: "/user/webhooks/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
				<Table
					title="Users"
					headers={["Username", "email", "Occupation", "Created at"]}
					colWidthPercent={["20%", "20%", "10%", "10%"]}
					centered={[false, false, false, false]}
					items={users}
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
								try {
									const req = await fetch(
										"http://localhost:8080/api/auth/delete/" +
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
                                        setUsers(users.filter((user) => user[0] !== id));
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
