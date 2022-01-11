import PageHeader from "components/PageHeader.component";

import styles from "styles/user/apiKey/AddApiKeys.module.scss";

function AddApiKeysPage() {
    return (
        <div className={styles.container}>
            <PageHeader
                title="Create a API key"
                brief="Add new API keys to your account, allowing you to access the system API endpoints"
                navs={[
                    {
                        name: "API keys",
                        path: "/user/apiKeys",
                        icon: "FaArrowLeft",
                    },
                ]}
            />
            <div className={styles.content}>
                
            </div>
        </div>
    )
}

export default AddApiKeysPage;