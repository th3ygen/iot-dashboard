import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/shift-away.css';

import * as ReactIcons from "react-icons/fa";

import FolderCard from "components/FolderCard";

import styles from "styles/component/Table.module.scss";

function Table({ ...props }) {
	const [title, setTitle] = useState("");
	const [headers, setHeaders] = useState([]);
	const [items, setItems] = useState([]);
	const [colWidthPercent, setColWidthPercent] = useState([]);
	const [centered, setCentered] = useState([]);
	const [actions, setActions] = useState([]);

	const findByCol = (input, n) => {
		let res = [];
		let resIndexes = [];

		if (n.length) {
			for (let x of n) {
				res = [
					...res,
					...items.filter((item) => {
						const index = items.indexOf(item);
						if (resIndexes.indexOf(index) === -1) {
							if (
								item[x] &&
								item[x]
									.toLowerCase()
									.includes(input.toLowerCase())
							) {
								resIndexes.push(index);
								return item;
							}
						}
					}),
				];
			}

			if (res.length) {
				setItems(res);
			}
		}
	};

	const onSearch = (e) => {
		const input = e.target.value;
		if (input) {
			findByCol(input, props.filterCol || [1]);
		} else {
			setItems(props.items);
		}
	};

	const Icon = ({ name }) => {
		const TagName = ReactIcons[name];
		return !!TagName ? <TagName /> : <p>{name}</p>;
	};

	useEffect(() => {
		if (props.title) {
			setTitle(props.title);
		}

		if (props.items) {
			setItems(props.items);
		}

		if (props.headers) {
			setHeaders(props.headers);
		}

		if (props.colWidthPercent) {
			setColWidthPercent(props.colWidthPercent);
		}

		if (props.centered) {
			setCentered(props.centered);
		}

		if (props.actions) {
			setActions(props.actions);
		}
	}, [
		props.title,
		props.items,
		props.headers,
		props.colWidthPercent,
		props.centered,
		props.actions,
	]);

	return (
		<FolderCard className={styles.container} title={title}>
			<div className={styles.header}>
				<div className={styles.filters}>
					<div className={styles.filter}>
						<div className={styles.filter_content}>
							<input
								type="text"
								placeholder="Search item name"
								onChange={onSearch}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.table}>
				<div className={styles.cols}>
					<div className={styles.num}>#</div>
					<div
						className={styles.data}
						style={{
							width: `${
								actions
									? "calc(100% - 115px)"
									: "calc(100% - 50px)"
							}`,
						}}
					>
						{headers.map((item, index) => (
							<div
								className={styles.col}
								key={index}
								style={{
									flex: `1 1 ${colWidthPercent[index]}`,
									textAlign: `${
										centered[index] ? "center" : "start"
									}`,
								}}
							>
								{item}
							</div>
						))}
					</div>
					{actions && <div className={styles.col} style={{textAlign: "center"}}>Actions</div>}
				</div>
				<div className={styles.rows}>
					{items.map((i, x) => (
						<div className={styles.row} key={x}>
							<div className={styles.no} key={x}>
								{x + 1}
							</div>
							<div
								className={styles.data}
								style={{
									width: `${
										actions
											? "calc(100% - 115px)"
											: "calc(100% - 50px)"
									}`,
								}}
							>
								{i.slice(1, i.length).map((item, index) => (
									<div
										className={styles.value}
										key={index}
										style={{
											flex: `1 1 ${colWidthPercent[index]}`,
											justifyContent: `${
												centered[index]
													? "center"
													: "flex-start"
											}`,
										}}
									>
										<div
											style={{
												background: `${
													item
														.toString()
														.includes(":")
														? item.split(":")[1] +
														  "1A"
														: "initial"
												}`,
												border: `${
													item
														.toString()
														.includes(":")
														? "2px solid " +
														  item.split(":")[1]
														: "initial"
												}`,
												padding: `${
													item
														.toString()
														.includes(":")
														? "2px 10px"
														: "initial"
												}`,
												borderRadius: `${
													item
														.toString()
														.includes(":")
														? "5px"
														: "initial"
												}`,
											}}
										>
											{item.toString().split(":")[0]}
										</div>
									</div>
								))}
							</div>
							{actions && (
								<div className={styles.actions}>
									{actions.map((item, y) => (
										<Tippy key={y} content={item.tooltip} delay={[500, 0]} duration={[100, 100]} animation="scale" inertia="true">
											<div
												key={y}
												className={styles.action}
												onClick={() =>
													item.callback(items[x][0])
												}
											>
												<Icon name={item.icon} />
											</div>
										</Tippy>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</FolderCard>
	);
}

export default Table;
