import PageHeader from "components/PageHeader.component";
import Table from "components/Table.component";

import styles from "styles/user/apiKey/ApiKeys.module.scss";

function ApiKeysPage() {
	return (
		<div className={styles.container}>
			<PageHeader
				title="API keys"
				brief="Manage your API keys"
				navs={[
					{
						name: "Add API key",
						path: "/user/apiKeys/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
				<Table
					title="Manage API keys"
					headers={["API key", "Data count", "Last update"]}
					colWidthPercent={["30%", "10%", "10%"]}
				></Table>
			</div>
		</div>
	);
}

export default ApiKeysPage;
