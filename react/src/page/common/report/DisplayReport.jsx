import { useState, useEffect } from "react";

// components
import Table from "components/Table.component";
import TopList from "components/TopList.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import NumberWidget from "components/NumberWidget.component";

import styles from "styles/common/report/DisplayReport.module.scss";

function DisplayReport() {
	const itemsData = {
		header: ["Header 1", "Header 2", "Header 3", "Header 4"],
		items: [
			[1337, "Pencil", "Item 2", "Active:#71e071", "Item 4"],
			[12, "Item 1", "Item 2", "Disabled:#ff7171", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Far"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[14, "Test", "Item 2", "Item 3:#F1e071", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Dil", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
		],
		colWidthPercent: ["30%", "10%", "10%", "10%"],
		centered: [false, true, true, true],
		actions: [
			{
				icon: "FaEdit",
				tooltip: "Edit",
				callback: (n) => {
					console.log("editing", n);
				},
			},
			{
				icon: "FaCog",
				tooltip: "Whot?!",
				callback: (n) => {
					console.log("editing", n);
				},
			},
			{
				icon: "FaCoins",
				tooltip: "Boooo!",
				callback: (n) => {
					console.log("editing", n);
				},
			},
			{
				icon: "FaTrashAlt",
				tooltip: "Delete",
				callback: (n) => {
					console.log("deleting", n);
				},
			},
		],
	};

	const stats = [
		{
			title: "Total Accounts",
			value: "12,000",
			label: "Orders",
		},
		{
			title: "Total Managers",
			value: "12,000",
			label: "Managers",
		},
		{
			title: "Total Staffs",
			value: "12,000",
			label: "Staffs",
		},
		{
			title: "Total Staffs",
			value: "12,000",
			label: "Staffs",
		},
	];

	const topSold = [
		{
			Name: "Item 5",
			"Total Sold": "50",
		},
		{
			Name: "Item 1",
			"Total Sold": "10",
		},
		{
			Name: "Item 2",
			"Total Sold": "20",
		},
		{
			Name: "Item 3",
			"Total Sold": "30",
		},
		{
			Name: "Item 4",
			"Total Sold": "40",
		},
	];

	const profitData = [
		{
			date: new Date(2021, 0, 1).getTime(),
			value: 100,
		},
		{
			date: new Date(2021, 0, 2).getTime(),
			value: 320,
		},
		{
			date: new Date(2021, 0, 3).getTime(),
			value: 216,
		},
		{
			date: new Date(2021, 0, 4).getTime(),
			value: 150,
		},
		{
			date: new Date(2021, 0, 5).getTime(),
			value: 156,
		},
		{
			date: new Date(2021, 0, 6).getTime(),
			value: 199,
		},
		{
			date: new Date(2021, 0, 7).getTime(),
			value: 114,
		},
		{
			date: new Date(2021, 0, 8).getTime(),
			value: 269,
		},
		{
			date: new Date(2021, 0, 9).getTime(),
			value: 90,
		},
		{
			date: new Date(2021, 0, 10).getTime(),
			value: 300,
		},
		{
			date: new Date(2021, 0, 11).getTime(),
			value: 150,
		},
		{
			date: new Date(2021, 0, 12).getTime(),
			value: 110,
		},
		{
			date: new Date(2021, 0, 13).getTime(),
			value: 185,
		},
	];

	const [profit, setProfit] = useState(profitData);
	const [count, setCount] = useState(1);

	const testClick = () => {
		let newData = profit;

		newData.push({
			date: new Date(2021, 0, 13 + count).getTime(),
			value: Math.floor(Math.random() * 100),
		});

		setProfit(newData);
		console.log("click");

		setCount(count + 1);
	};

	// sort the topSold array by quantity
	topSold.sort((a, b) => {
		return a.quantity - b.quantity;
	});

	return (
		<div className={styles.container}>
			<div className={styles.stats}>
				{stats.map((stat, i) => (
					<NumberWidget
						title={stat.title}
						value={stat.value}
						label={stat.label}
						style={{fontSize: "18px"}}
					/>
				))}
			</div>
			<div className={styles.itemsSoldTable}>
				<Table
					title="Items sold"
					headers={itemsData.headers}
					items={itemsData.items}
					centered={itemsData.centered}
					colWidthPercent={itemsData.colWidthPercent}
					actions={itemsData.actions}
				/>
			</div>
			<div className={styles.topSoldList}>
				<TopList title="Hot items" data={topSold} />
			</div>
			<div className={styles.profitTrend} onClick={testClick}>
				<DateAxisLineChart
					title="Profit trend"
					data={profit}
					label="Profit"
					height="250px"
				/>
			</div>
		</div>
	);
}

export default DisplayReport;
