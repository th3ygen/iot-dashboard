import PageHeader from "components/PageHeader.component";
import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";

import styles from "styles/user/webhook/Webhooks.module.scss";

function WebhooksPage() {
	return (
		<div className={styles.container}>
			<PageHeader
				title="Webhooks"
				brief="Manage your webhooks, links to any external services with ease"
				navs={[
					{
						name: "Add webhook",
						path: "/user/webhooks/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
                <Table
                    title="Manage webhooks"
                    headers={[
                        "Webhook",
                        "Data count",
                        "Last update",
                    ]}
                    colWidthPercent={[
                        "30%",
                        "10%",
                        "10%",
                    ]}
                />
                
            </div>
		</div>
	);
}

export default WebhooksPage;
