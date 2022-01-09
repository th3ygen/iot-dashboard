import { useEffect, useState, useRef } from "react";

import PageHeader from "components/PageHeader.component";
import FolderCard from "components/FolderCard";
import Table from "components/Table.component";

import styles from "styles/user/BrowseData.module.scss";

function BrowseDataPage() {
	const [log, setLog] = useState([
		["Device 1", "somerandomdata123"],
		["Device 2", "somerandomdata123"],
		["Device 3", "somerandomdata123"],
		["Device 4", "somerandomdata123"],
		["Device 5", "somerandomdata123"],
		["Device 6", "somerandomdata123"],
		["Device 7", "somerandomdata123"],
	]);

	const logRef = useRef({});

	// logRef auto scroll on new log data
	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [log]);

	const test = () => {
		setLog([...log, [`Device ${log.length}`, "somerandomdata123"]]);
	}

	return (
		<div className={styles.container}>
			<PageHeader
				title="Browse data"
				brief="Quickly navigate to your stored data"
			/>
			<div className={styles.content}>
				<FolderCard title="Live update">
					<div className={styles.log}>
						<div className={styles.headers}>
							<div className={styles.header}>Device</div>
							<div className={styles.header}>Data</div>
						</div>
						<div className={styles.list} ref={logRef} onClick={test}>
							{log.map((item, index) => (
								<div className={styles.item} key={index}>
									<div className={styles.device}>
										{item[0]}
									</div>
									<div className={styles.data}>{item[1]}</div>
								</div>
							))}
						</div>
					</div>
				</FolderCard>

				<Table
					title="Manage data"
					headers={[
						"Device",
						"Data count",
						"Last update",
						"Today data",
					]}
                    colWidthPercent={[
                        "30%",
                        "10%",
                        "10%",
                        "10%",
                    ]}
				/>
			</div>
		</div>
	);
}

export default BrowseDataPage;
