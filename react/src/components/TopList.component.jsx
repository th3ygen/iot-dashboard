import FolderCard from "components/FolderCard";

import styles from "styles/component/TopList.module.scss";

function TopList(props) {
	const { title, data } = props;

	return (
		<FolderCard className={styles.container} title={title}>
			<div className={styles.list}>
				<div className={styles.header}>
					{Object.keys(data[0]).map((item, index) => {
						return (
							<div key={index} className={styles.item}>
								{item}
							</div>
						);
					})}
				</div>
				<div className={styles.body}>
					{data.map((item, index) => {
						return (
							<div key={index} className={styles.item}>
								{Object.values(item).map((value, index) => {
									return (
										<div
											key={index}
											className={styles.value}
										>
											{value}
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</FolderCard>
	);
}

export default TopList;
