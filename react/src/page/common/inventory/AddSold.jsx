import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaFileImport } from "react-icons/fa";
import PageHeader from "components/PageHeader.component";

import styles from "styles/common/inventory/AddItem.module.scss";
import exStyles from "styles/common/inventory/AddSold.module.scss";

function AddSold() {
	const location = useLocation();
	const navigate = useNavigate();

	const [item, setItem] = useState({});
	const [maxQnty, setMaxQnty] = useState(0);
	const [qnty, setQnty] = useState(0);

	const qntyInput = useRef(null);

	const addSold = async () => {
		const request = await fetch(
			"http://localhost:8080/api/inventory/sold/add",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					item_ID: location.state.id,
					quantity: qnty,
				}),
			}
		);

		if (request.status === 200) {
			alert("Item sold successfully");
			navigate("/user/inventory", { replace: true });
		} else {
			alert("Error selling item");
		}
	};

	useEffect(() => {
		let request;
		(async () => {
			if (location.state.id) {
				request = await fetch(
					"http://localhost:8080/api/inventory/item/id/" +
						location.state.id,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (request.status === 200) {
					let response = await request.json();

					const i = {
						"Item name": response.name,
						"Item quantity": response.quantity,
						"Item price": "RM" + response.unit_price,
						"Item barcode": response.barcode_ID,
						"Barcode encoding": response.barcode_encoding,
						"Item vendor": response.vendor_name,
					};

					setMaxQnty(response.quantity);
					setItem(i);
				}
			}
		})();
	}, []);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Add sold"
				brief="Add new sold item"
				navs={[
					{
						icon: "FaReply",
						name: "Manage inventory",
						path: "/user/inventory",
					},
				]}
			/>
			<div className={styles.form}>
				<div className={`${styles.col} ${styles.half}`}>
					<div className={styles.row}>
						<div className={styles.vendor}>
							{Object.keys(item).map((key, i) => (
								<div key={key} className={styles.item}>
									<div className={styles.key}>{key}</div>
									<div className={styles.value}>
										{item[key]}
										{i === 1 &&
											qnty > 0 &&
											qnty <= maxQnty && (
												<span
													className={
														exStyles.adjustVal
													}
												>{` -${qnty}`}</span>
											)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={`${styles.col} ${styles.half}`}>
					<div className={styles.row}>
						<div className={styles.label}>Quantity</div>
						<input
							className={`${styles.input} ${styles.noArrow}`}
							type="number"
							ref={qntyInput}
							max={maxQnty}
							onChange={() => setQnty(qntyInput.current.value)}
						/>
					</div>
				</div>
				<div className={`${styles.col} ${styles.full}`}>
					<div
						className={styles.row}
						style={{ alignItems: "flex-end" }}
					>
						<div className={styles.buttons}>
							<div className={styles.button} onClick={addSold}>
								<FaFileImport />
								Add
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddSold;
