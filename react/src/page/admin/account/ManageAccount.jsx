import { FaUserPlus } from 'react-icons/fa';

// components
import Table from "components/Table.component";
import NumberWidget from "components/NumberWidget.component";

import styles from "styles/admin/account/ManageAccount.module.scss";

function ManageAccount() {
	const accountData = {
		header: ["Name", "Role", "Username", "Password"],
		items: [
			["1234","Item 1", "Item 2", "Active", "Item 4"],
			["1234","Farikha Dwi Nur Qossina Januar", "Manager", "farikha_dwi", "qossina321"],
			["1234","Item 1", "Admin", "rikha300101", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Test", "Staff", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
		],
		colWidthPercent: ["20%", "20%", "20%", "20%"],
		isBadge: [false, false, false, false],
		badgeColor: [
			["", "", "#71e071", ""],
			["", "", "#ff7171", ""],
		],
		centered: [false, true, true, true],

		actions: [
			{
				icon: "FaEdit",
				callback: (n) => {
					console.log('editing', n);
				},
			},
			{
				icon: "FaTrashAlt",
				callback: (n) => {
					console.log('deleting', n);
				},
			},
		]
	};

	const stats = [
		{
			title: "Total Accounts",
			value: "31",
			label: "Accounts",
		},
		{
			title: "Total Managers",
			value: "10",
			label: "Managers",
		},
		{
			title: "Total Staffs",
			value: "20",
			label: "Staffs",
		},
		{
			title: "Total Admins",
			value: "1",
			label: "Admins",
		},
	];

    return (
		<div className={styles.header}>
			<h2 className={styles.header2}>Account Data</h2>
				<div className={styles.title}>
					<h5 className={styles.header5}>Here's the list of all the accounts.</h5>
					<div className={styles.stats}>
						{stats.map((stat, i) => (
							<NumberWidget
								title={stat.title}
								value={stat.value}
								label={stat.label}
							/>
						))}
					</div>
						<div className={styles.butAdd}>
							<button className={styles.button}><FaUserPlus /> Add Account</button>
						</div>
				</div>
				<div className={styles.container}>
					<div className={styles.accountTable}>
						<Table title="Accounts" data={accountData} filterCol={[1, 2, 3]} />
					</div>
				</div>
		</div>
	);
}

export default ManageAccount;