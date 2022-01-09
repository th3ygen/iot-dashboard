import PageHeader from "components/PageHeader.component";

import styles from "styles/user/channel/AddChannel.module.scss";

function AddChannelPage() {
	return (
		<div className={styles.container}>
			<PageHeader
				title="Add channel"
				brief="Create a new channel to stream data to"
				navs={[
					{
						name: "Channels",
						path: "/user/channels",
						icon: "FaStream",
					},
				]}
			/>
			<div className={styles.content}></div>
		</div>
	);
}

export default AddChannelPage;
