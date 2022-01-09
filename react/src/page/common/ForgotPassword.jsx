import styles from "styles/common/ForgotPassword.module.scss";
function ForgotPassword() {
	return (
		<div className={styles.container}>
			<div className={styles.whitecontainer}>
				<div className={styles.title}>
					<div> Enter New Password</div>
				</div>

				<form className={styles.formPassword}>
					<div>
						<input type="text" placeholder="Email"></input>
					</div>

					<div>
						<input type="password" placeholder="New Password" />
					</div>
                    
					<div>
						<input type="password" placeholder="Repeat Password" />
					</div>
					<div className={styles.button} href="login.html">Request</div>
				</form>
			</div>
		</div>
	);
}

export default ForgotPassword;
