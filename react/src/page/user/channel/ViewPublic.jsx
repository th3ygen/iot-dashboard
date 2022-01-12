import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageHeader from "components/PageHeader.component";
import DateAxisLineChart from "components/DateAxisLineChart.component";
import FolderCard from "components/FolderCard";

import styles from "styles/user/channel/View.module.scss";

function ViewChannel() {
	const location = useLocation();

	const [channel, setChannel] = useState({});
	const [data, setData] = useState([
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
	]);
	const [log, setLog] = useState([
	]);

	const logRef = useRef({});

	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [log]);

	useEffect(() => {
		(async () => {
			if (location.state.id) {
				const request = await fetch(`http://localhost:8080/api/channel/public/${location.state.id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
	
				if (request.status === 200) {
					const response = await request.json();
	
					setChannel(response);
				}
			}
		})();
	}, [location.state.id]);

	useEffect(() => {
		// smooth scroll to top
		window.scrollTo(0, 0);
	}, []);

	const test = () => {
		const now = new Date();
		const nowStr = `${now.getDate()}/${now.getMonth() + 1} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
		setLog([...log, [`Device ${log.length}`, "text", nowStr, "somerandomdata123"]]);
	};

	return (
		<div className="container">
			<PageHeader
				title={channel.title || 'Loading...'}
				brief={channel.description || 'Loading...'}
				navs={[
					{
						name: "Browse channels",
						path: "/user/browse",
						icon: "FaStream",
					},
				]}
			/>
			<div className={styles.content}>
				<FolderCard title="Channel information">
					<div className={styles.info}>
						<div className={styles.col}>
							<div className={styles.item}>
								<div className={styles.label}>Channel name</div>
								<div className={styles.value}>{channel.title}</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>Owner</div>
								<div className={styles.value}>
									Aidil Syazwan
								</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>Total fields</div>
								<div className={styles.value}>{(channel.fields && channel.fields.length) || 0}</div>
							</div>
						</div>
						<div className={styles.col}>
							<div className={styles.item}>
								<div className={styles.label}>Data per day</div>
								<div className={styles.value}>500</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>Ratings</div>
								<div className={styles.value}>4.73</div>
							</div>
							<div className={styles.item}>
								<div className={styles.label}>Likes</div>
								<div className={styles.value}>32</div>
							</div>
						</div>
					</div>
				</FolderCard>

				<DateAxisLineChart
					title="Field: temp"
					data={data}
					label="Profit"
					height="250px"
				/>

				<FolderCard title="Live update">
					<div className={styles.log}>
						<div className={styles.headers}>
							<div className={styles.header}>Source</div>
							<div className={styles.header}>Field</div>
							<div className={styles.header}>Timestamp</div>
							<div className={styles.header}>Data</div>
						</div>
						<div
							className={styles.list}
							ref={logRef}
							onClick={test}
						>
							{log.map((item, index) => (
								<div className={styles.item} key={index}>
									<div className={styles.device}>
										{item[0]}
									</div>
									<div className={styles.data}>{item[1]}</div>
									<div className={styles.data}>{item[2]}</div>
									<div className={styles.data}>{item[3]}</div>
								</div>
							))}
						</div>
					</div>
				</FolderCard>
			</div>
		</div>
	);
}

export default ViewChannel;
