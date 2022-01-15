import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import PageHeader from "components/PageHeader.component";
import { FaPlus } from "react-icons/fa";

import styles from "styles/user/webhook/AddWebhook.module.scss";

function AddWebhookPage() {
	const [user, setUser] = useOutletContext();

	const location = useLocation();
	const navigate = useNavigate();

    const [channels, setChannels] = useState([]);
    const [fields, setFields] = useState([]);

	const labelRef = useRef();
	const urlRef = useRef();
	const payloadRef = useRef();
	const channelRef = useRef();
	const triggerFieldRef = useRef();
	const triggerCompareRef = useRef();
	const triggerValueRef = useRef();

	
	return (
		<div className={styles.container}>
			<PageHeader
				title="Edit user"
				brief="Edit the user, and their details"
				navs={[
					{
						name: "Users",
						path: "/admin/users",
						icon: "FaStream",
					},
				]}
			/>

			<div className={styles.content}>
				<div className={styles.form}>
					<div className={styles.item}>
						<label>Username</label>
						<input type="text" ref={labelRef} disabled readOnly/>
					</div>
					<div className={styles.item}>
						<label>Email</label>
						<input type="text" ref={urlRef} />
					</div>
					<div className={styles.item}>
						<label>Title</label>
						<input type="text" ref={payloadRef} />
					</div>
					
					<div className={`${styles.item} ${styles.addBtn}`}>
						<div className="neon-btn" >
							<FaPlus /> <span>Edit webhook</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddWebhookPage;
