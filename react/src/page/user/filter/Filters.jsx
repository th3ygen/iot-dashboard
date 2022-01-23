import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import PageHeader from "components/PageHeader.component";
import Table from "components/Table.component";

import styles from "styles/user/filter/Filters.module.scss";

function FiltersPage() {
	const navigate = useNavigate();

	const [user, setUser] = useOutletContext();

	const [filters, setFilters] = useState([]);
    const [refresh, setRefresh] = useState(false);

	useEffect(() => {
        if (!user.token) {
            return;
        }

		(async () => {
			let request, response;

            console.log('refresh');

			request = await fetch("http://localhost:8080/api/filter/owned", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					auth: user.token,
				},
			});

			if (request.status === 200) {
				response = await request.json();

				setFilters(
					response.map((filter) => {
						const date = new Date(filter.createdAt);
						const dateString = `${date.getDate()}/${
							date.getMonth() + 1
						}/${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}`;

						return [
							filter._id,
							filter.label,
							filter.fields.length,
							dateString,
						];
					})
				);
			}
		})();
	}, [user.token, refresh]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Filters"
				brief="Manage your filters"
				navs={[
					{
						name: "Add filter",
						path: "/user/filters/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
				<Table
					title="Manage filters"
					headers={["Filter", "Total fields", "Last update"]}
					items={filters || []}
					colWidthPercent={["30%", "10%", "10%"]}
					actions={[
						{
							tooltip: "Edit",
							icon: "FaEdit",
							callback: (id) => {
								navigate("/user/filters/edit/", {
									replace: true,
									state: { id },
								});
							},
						},
						{
							tooltip: "Delete",
							icon: "FaTrash",
							callback: async (id) => {
								try {
									const req = await fetch(
										"http://localhost:8080/api/filter/delete/" +
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
                                        setRefresh(!refresh);
                                    }
								} catch (e) {
									console.log(e);
								}
							},
						},
					]}
				></Table>
			</div>
		</div>
	);
}

export default FiltersPage;
