import { useEffect, useState, useRef } from "react";

import PageHeader from "components/PageHeader.component";
import FolderCard from "components/FolderCard";
import Table from "components/Table.component";

import styles from "styles/user/BrowseData.module.scss";

function BrowseDataPage() {
	

	return (
		<div className={styles.container}>
			<PageHeader
				title="Browse data"
				brief="Quickly navigate to your stored data"
			/>
			<div className={styles.content}>
				
			</div>
		</div>
	);
}

export default BrowseDataPage;
