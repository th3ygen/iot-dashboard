import PageHeader from "components/PageHeader.component";

import styles from "styles/user/apiKey/AddApiKeys.module.scss";

function AddApiKeysPage() {
    return (
        <div className={styles.container}>
            <PageHeader
                title="Add API keys"
                brief="Add new API keys to your account"
                navs={[
                    {
                        name: "API keys",
                        path: "/user/apiKeys",
                        icon: "FaArrowLeft",
                    },
                ]}
            />
            <div className={styles.content}></div>
        </div>
    )
}

export default AddApiKeysPage;