import PageHeader from "components/PageHeader.component";

import styles from "styles/user/webhook/AddWebhook.module.scss";

function AddWebhookPage() {
    return (
        <div className={styles.container}>
            <PageHeader
                title="Add webhook"
                brief="Create a new webhook for integration purposes"
                navs={[
                    {
                        name: "Webhooks",
                        path: "/user/webhooks",
                        icon: "FaStream",
                    },
                ]}
            />

            <div className={styles.content}></div>
        </div>
    )   
}

export default AddWebhookPage;