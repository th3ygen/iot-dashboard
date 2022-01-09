import { useOutletContext } from "react-router-dom";

import PageHeader from "components/PageHeader.component";
import Table from "components/Table.component";
import NumberWidget from "components/NumberWidget.component";

import styles from "styles/user/channel/Channel.module.scss";

function ChannelPage() {
    const [user, setUser] = useOutletContext();

	return (
		<div className={styles.container}>
			<PageHeader
				title="Channel"
				brief="Easily manage your channel, providing a path for your data stream"
                navs={[
                    {
                        name: "Add channel",
                        path: "/user/channels/add",
                        icon: "FaPlus"
                    }
                ]}
			/>
			<div className={styles.content}>
				<div className={styles.widget}>
					<NumberWidget
						title="Total channels"
						value="1,234"
						label="ch"
					/>

					<NumberWidget title="Most active" value="Channel #2" label="ch" style={{fontSize: "18px"}} />

					<NumberWidget title="Least active" value="Channel #1" label="ch" style={{fontSize: "18px"}} />
				</div>

                <Table
                    title="Manage channels" 
                    headers={[
                        "Channel",
                        "Data count",
                        "Last update",
                    ]}
                    colWidthPercent={[
                        "30%",
                        "30%",
                        "30%",
                    ]}
                />
			</div>
		</div>
	);
}

export default ChannelPage;
