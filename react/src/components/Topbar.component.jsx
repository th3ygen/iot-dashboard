import { useNavigate } from "react-router-dom";

import { MdOutlineExitToApp as LogoutIcon } from "react-icons/md";
import { FaReply } from "react-icons/fa";

import styles from "styles/component/Topbar.module.scss";

export default function Topbar() {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div className={`${styles.container}`}>
			<div className={styles.bar}>
				<div className={styles.back} onClick={goBack}>
					<FaReply />
					Back
				</div>
				<div className={styles.head}>
					<div className={styles.title}>
						FK Inventory Management System
					</div>
				</div>
				<div className={styles["user-action"]}>
					<div className={styles.logout}>
						<LogoutIcon size={20} />
						Logout
					</div>
				</div>
			</div>
		</div>
	);
}
