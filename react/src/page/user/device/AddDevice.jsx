import PageHeader from "components/PageHeader.component";

import styles from "styles/user/device/AddDevice.module.scss";

function AddDevicePage() {
    return (
        <div className={styles.container}>
            <PageHeader
                title="Add device"
                brief="Add a new device to your account"
                navs={[
                    {
                        name: "Devices",
                        path: "/user/devices",
                        icon: "FaArrowLeft",
                    },
                ]}
            />
            <div className={styles.content}></div>
        </div>
    );
}

export default AddDevicePage;