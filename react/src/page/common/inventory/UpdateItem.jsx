/* 
    TODO Update item form
    TODO fetch item details
    TODO client validation
*/
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaFileImport, FaTrashAlt } from "react-icons/fa";
import BarcodeScanner from "javascript-barcode-reader";

import PageHeader from "components/PageHeader.component";

import styles from "styles/common/inventory/AddItem.module.scss";
import { useEffect } from "react";

function UpdateItem() {
	const location = useLocation();

	const [vendors, setVendors] = useState([]);
	const [vendor, setVendor] = useState({});

	const nameInput = useRef("");
	const unitPriceInput = useRef(0);
	const qntyInput = useRef(0);
	const barcodeNumInput = useRef("");
	const barcodeImage = useRef(null);
	const barcodeType = useRef("");
	const barcodeImageInput = useRef(null);
	const vendorIdInput = useRef("");

	const scan = async (flag) => {
		if (barcodeImageInput.current && barcodeImageInput.current.files[0]) {
			const reader = new FileReader();

			reader.onload = async (e) => {
				const image = new Image(reader.result);

				image.crossOrigin = "Anonymous";
				image.src = reader.result;

				barcodeImage.current.src = reader.result;

				image.onload = async () => {
					let code = "";
					if (flag) {
						const encodings = [
							"ean-13",
							"ean-8",
							"code-39",
							"code-93",
							"code-2of5",
							"codabar",
							"code-128",
						];
						try {
							// decode barcode using all types
							// find a barcode that is valid
							for await (let encoding of encodings) {
								code = await BarcodeScanner({
									image,
									barcode: encoding,
									options: {
										useAdaptiveThreshold: true,
									},
								});

								// check barcode using regex
								// the code should not contains any special characters
								// or white space, or blank
								// the code should atleast be 6 characters long
								if (code.match(/^[a-zA-Z0-9]{6,}$/)) {
									barcodeType.current.selectedIndex =
										encodings.indexOf(encoding);
									break;
								}

								code = "Unable to read barcode image";
							}
						} catch (e) {
							code = "Unable to read barcode image";
						}
					} else {
						try {
							code = await BarcodeScanner({
								image,
								barcode: barcodeType.current.value,
								options: {
									useAdaptiveThreshold: true,
								},
							});
						} catch (e) {
							code = "Unable to read barcode image";
						}
					}

					barcodeNumInput.current.value = code;
				};
			};

			reader.readAsDataURL(barcodeImageInput.current.files[0]);
		}
	};

	const selectVendor = (e) => {
		// find vendor by id

		let vendor;
		if (e.target) {
			vendor = Object.assign(
				{},
				vendors.find((v) => v._id === e.target.value)
			);
		} else {
			vendor = Object.assign({}, e);
		}

		delete vendor._id;
		delete vendor.__v;

		// replace key names
		// replace underscore with space
		// capitalize first letter
		Object.keys(vendor).forEach((key) => {
			vendor[
				key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
			] = vendor[key];
			delete vendor[key];
		});

		setVendor(vendor);
	};

	const loadData = async () => {
		let request = await fetch(
			"http://localhost:8080/api/vendors/list",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const v = await request.json();

		setVendors(v);

		if (location.state.id) {
			request = await fetch('http://localhost:8080/api/inventory/item/id/' + location.state.id);

			if (request.status === 200) {
				const item = await request.json();

				nameInput.current.value = item.name;
				unitPriceInput.current.value = item.unit_price;
				qntyInput.current.value = item.quantity;
				barcodeNumInput.current.value = item.barcode_ID;
				barcodeType.current.value = item.barcode_encoding;
				vendorIdInput.current.selectedIndex = v.findIndex(i => i._id === item.vendor_ID);

				selectVendor(v.find(i => i._id === item.vendor_ID));
			}
		}
	}

    useEffect(() => {
		loadData();
    }, []);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Update item"
				brief="Update item details"
				navs={[
					{
						icon: "FaReply",
						name: "Manage inventory",
						path: "/user/inventory",
					},
				]}
			/>
			<form className={styles.form}>
				<div className={`${styles.col} ${styles.half}`}>
					<div className={styles.row}>
						<div className={styles.label}>Vendor ID</div>
						<select
							className={styles.input}
							onChange={selectVendor}
							ref={vendorIdInput}
						>
							{vendors.map((v, i) => (
								<option key={v._id} value={v._id}>
									{v.company_name || `Vendor ${i + 1}`}
								</option>
							))}
						</select>
					</div>
					<div className={styles.row}>
						<div className={styles.vendor}>
							{Object.keys(vendor).map((key, i) => (
								<div key={key} className={styles.item}>
									<div className={styles.key}>{key}</div>
									<div className={styles.value}>
										{vendor[key]}
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Item name</div>
						<input
							className={styles.input}
							type="text"
							ref={nameInput}
						/>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Unit price (RM)</div>
						<input
							className={`${styles.input} ${styles.noArrow}`}
							type="number"
							step="0.01"
							ref={unitPriceInput}
						/>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Quantity</div>
						<input
							className={`${styles.input} ${styles.noArrow}`}
							type="number"
							ref={qntyInput}
						/>
					</div>
				</div>
				<div className={`${styles.col} ${styles.half}`}>
					<div className={styles.row}>
						<div className={styles.label}>Barcode number</div>
						<input
							className={styles.input}
							type="text"
							ref={barcodeNumInput}
						/>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Barcode encoding</div>
						<select
							className={styles.input}
							ref={barcodeType}
							onChange={() => scan(false)}
						>
							<option value="ean-13">EAN-13</option>
							<option value="ean-8">EAN-8</option>
							<option value="code-39">Code-39</option>
							<option value="code-93">Code-93</option>
							<option value="code-2of5">Code-2of5</option>
							<option value="codabar">Codabar</option>
							<option value="code-128">Code-128</option>
						</select>
					</div>
					<div className={styles.row}>
						<div className={styles.barcode}>
							<img
								ref={barcodeImage}
								src="/img/placeholder.png"
								alt="No barcode loaded"
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Barcode image</div>
						<input
							className={styles.input}
							type="file"
							accept="image/*"
							ref={barcodeImageInput}
							onChange={() => scan(true)}
						/>
					</div>
				</div>
				<div className={`${styles.col} ${styles.full}`}>
					<div
						className={styles.row}
						style={{ alignItems: "flex-end" }}
					>
						<div className={styles.buttons}>
							<div
								className={`${styles.button} ${styles.invert}`}
								onClick={loadData}
							>
								<FaTrashAlt />
								Reset
							</div>
							<div className={styles.button}>
								<FaFileImport />
								Update
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default UpdateItem;
