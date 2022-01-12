import { useState, useRef, useEffect } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Tippy from "@tippyjs/react";

import PageHeader from "components/PageHeader.component";

import styles from "styles/user/channel/AddChannel.module.scss";
import exStyles from "styles/user/channel/Filters.module.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";

function AddChannelPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const titleRef = useRef();
	const descriptionRef = useRef();

	const [user, setUser] = useOutletContext();

	const [channel, setChannel] = useState({});
	const [fields, setFields] = useState([]);
	const [filters, setFilters] = useState([]);

	const color = {
		string: "rgb(103, 180, 14)",
		number: "rgb(14, 105, 180)",
		boolean: "rgb(161, 14, 180)",
	};

	const assignFilter = async () => {
		const selects = document.querySelectorAll("select.filter-select");

		const newFilters = [];
		selects.forEach((select) => {
			const filter = {
				field: select.dataset.label,
				filterId: select.value,
			};

			newFilters.push(filter);
		});

		const req = await fetch(
			"http://localhost:8080/api/channel/assignFilters",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					auth: user.token,
				},
				body: JSON.stringify({
					id: location.state.id,
					filters: newFilters,
				}),
			}
		);

		if (req.status === 200) {
			navigate("/user/channels", { replace: true });
		}
	};

	useEffect(() => {
		if (location.state.id && user.token) {
			(async () => {
				let request, response;

				request = await fetch(
					"http://localhost:8080/api/filter/owned",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							auth: user.token,
						},
					}
				);

				if (request.status === 200) {
					response = await request.json();

					setFilters(
						response.map((filter) => ({
							id: filter._id,
							label: filter.label,
							fields: filter.fields,
						}))
					);
				}

				request = await fetch(
					"http://localhost:8080/api/channel/id/" + location.state.id,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							auth: user.token,
						},
					}
				);

				if (request.status === 200) {
					const { channel: ch } = await request.json();

					titleRef.current.value = ch.title;
					descriptionRef.current.value = ch.description;

					setFields(
						ch.fields.map((field) => ({
							label: field.label,
							type: field.dataType,
							filterId: field.filterId || null,
						}))
					);

					setChannel(ch);
				}
			})();
		}
	}, [location.state.id, user.token]);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Channel filters"
				brief="Pipe your data stream through your custom filters"
				navs={[
					{
						name: "Channels",
						path: "/user/channels",
						icon: "FaStream",
					},
				]}
			/>
			<div className={styles.content}>
				<div className={styles.form}>
					<div className={styles.item}>
						<label>Channel title</label>
						<input type="text" ref={titleRef} disabled />
					</div>
					<div className={styles.item}>
						<label>Channel description</label>
						<input type="text" ref={descriptionRef} disabled />
					</div>
					<div className={styles.item}>
						<label>Assign filters</label>
						<div className={styles.group}>
							<div className={styles.item}>
								{fields.map((field, index) => (
									<div key={index} className={styles.keys}>
										<div className={styles.item}>
											<label
												className={exStyles.type}
												style={{
													background:
														color[field.type],
												}}
											>
												<span>{field.type}</span>
												<span>{field.label}</span>
											</label>
											<select
												className="filter-select"
												data-label={field.label}
												defaultValue={field.filterId || ""}
											>
												<option value="">None</option>
												{filters.map((filter, i) => (
													<option
														key={i}
														value={filter.id}
													>
														{filter.label} [
														{filter.fields &&
															filter.fields.join(
																","
															)}
														]
													</option>
												))}
											</select>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className={`${styles.item} ${styles.addBtn}`}>
						<div className="neon-btn" onClick={assignFilter}>
							<FaPlus /> <span>Assign</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddChannelPage;
