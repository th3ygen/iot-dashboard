import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft, FaArrowRight, FaLock, FaUser } from "react-icons/fa";
import styles from "styles/Login.module.scss";

function Login(props) {
	const navigate = useNavigate();

	const usernameRef = useRef();
	const passwordRef = useRef();

	const login = async () => {
		try {
			const req = await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: usernameRef.current.value,
					password: passwordRef.current.value,
				}),
			});

			if (req.status === 200) {
				const res = await req.json();

				props.onLogin({
					token: res.token,
					username: res.username,
					id: res.id,
                    role: res.role,
                    title: res.title,
				})

                if (res.role === "admin") {
                    navigate("/admin", {
                        replace: true,
                    });
                } else {
                    navigate("/user", {
                        replace: true,
                    });
                }
			} else {
				console.log("login failed");

				/* empty all input */
				usernameRef.current.value = "";
				passwordRef.current.value = "";
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.header}>Login</div>
				<div className={styles.body}>
					<div className={styles.inputs}>
						<div className={styles.item}>
							<FaUser size={18} />
							<input
								type="text"
								placeholder="Username"
								ref={usernameRef}
							/>
						</div>
						<div className={styles.item}>
							<FaLock size={18} />
							<input
								type="password"
								placeholder="Password"
								ref={passwordRef}
							/>
						</div>
					</div>
				</div>
				<div className={styles.actions}>
					<button
						className={`neon-btn ${styles.btn}`}
						onClick={() => {
							navigate("/register");
						}}
					>
						<FaArrowLeft size={18} />
						Register
					</button>
					<button
						className={`neon-btn ${styles.btn}`}
						onClick={login}
					>
						<FaArrowRight size={18} />
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
