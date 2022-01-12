import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import PageHeader from "components/PageHeader.component";
import FolderCard from "components/FolderCard";
import Table from "components/Table.component";

import styles from "styles/user/BrowseData.module.scss";

function BrowseDataPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const [channels, setChannels] = useState([]);

	useEffect(() => {
		(async () => {
			const request = await fetch(
				"http://localhost:8080/api/channel/public",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (request.status === 200) {
				const response = await request.json();

				setChannels(response);
			}
		})();
	}, []);

	return (
		<div className={styles.container}>
			<PageHeader
				title="Browse data"
				brief="Browse to all public channel data, share your thoughts, and get feedback from other users."
			/>
			<div className={styles.content}>
				<div className={styles.filter}></div>
				<div className={styles.list}>
					{channels.map((channel, i) => (
						<div
							key={i}
							className={styles.item}
							onClick={() => {
								navigate("/user/channels/view/public", {
									replace: true,
									state: { id: channel.id },
								});
							}}
						>
							<div className={styles.header}>{channel.title}</div>
							<div className={styles.body}>
								<div className={styles.img} />
								<div className={styles.description}>
									{channel.description}
								</div>
								<div className={styles.info}>
									<div className={styles.infoItem}>
										<div className={styles.label}>
											Views
										</div>
										<div className={styles.value}>
											{channel.views}
										</div>
									</div>
									<div className={styles.infoItem}>
										<div className={styles.label}>
											Likes
										</div>
										<div className={styles.value}>
											{channel.likes}
										</div>
									</div>
									<div className={styles.infoItem}>
										<div className={styles.label}>
											Comments
										</div>
										<div className={styles.value}>
											{channel.comments}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default BrowseDataPage;
