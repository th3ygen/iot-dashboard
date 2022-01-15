import { FaArrowLeft, FaArrowRight, FaLock, FaUser } from "react-icons/fa";
import styles from "styles/Login.module.scss";

function Register() {
    

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.header}>Login</div>
				<div className={styles.body}>
					<div className={styles.inputs}>
						<div className={styles.item}>
							<FaUser size={18}/>
							<input type="text" placeholder="Username" />
						</div>
						<div className={styles.item}>
							<FaLock size={18}/>
							<input type="password" placeholder="Password" />
						</div>
					</div>
				</div>
                <div className={styles.actions}>
                    <button className={`neon-btn ${styles.btn}`}>
                        <FaArrowLeft size={18}/>
                        Register
                    </button>
                    <button className={`neon-btn ${styles.btn}`}>
                        <FaArrowRight size={18}/>
                        Login
                    </button>
                </div>
			</div>
		</div>
	);
}

export default Register;
