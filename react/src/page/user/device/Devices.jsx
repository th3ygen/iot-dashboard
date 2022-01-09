import PageHeader from "components/PageHeader.component";
import Table from "components/Table.component";

import styles from "styles/user/device/Devices.module.scss";

function DevicesPage() {
	return (
		<div className={styles.container}>
			<PageHeader
				title="Devices"
				brief="Add and monitor your devices, in real time"
				navs={[
					{
						name: "Add device",
						path: "/user/devices/add",
						icon: "FaPlus",
					},
				]}
			/>
			<div className={styles.content}>
                <Table
                    title="Manage devices"
                    headers={[
                        "Device",
                        "Data count",
                        "Last update",
                    ]}
                    colWidthPercent={[
                        "30%",
                        "10%",
                        "10%",
                    ]}
                ></Table>
            </div>
		</div>
	);
}

export default DevicesPage;
