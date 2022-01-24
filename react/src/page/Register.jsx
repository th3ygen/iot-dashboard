import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
	FaArrowLeft,
	FaArrowRight,
	FaEnvelope,
	FaLock,
	FaUser,
	FaUserCheck,
} from "react-icons/fa";
import styles from "styles/Login.module.scss";

import Swal from "sweetalert2";

function Register() {
	const navigate = useNavigate();

	const usernameRef = useRef();
	const passwordRef = useRef();
	const rPasswordRef = useRef();
	const emailRef = useRef();
	const occupationRef = useRef();

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const register = async () => {
		try {
			/* check repeat password */
			if (passwordRef.current.value !== rPasswordRef.current.value) {
				await Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Password and Repeat Password are not the same!",
				});

				return;
			}

			/* validate email, email must be in correct format */
			const email = emailRef.current.value;

			if (!validateEmail(email)) {
				await Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Email is not in correct format!",
				});

				return;
			}

			const req = await fetch("http://localhost:8080/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: usernameRef.current.value,
					password: passwordRef.current.value,
					email: emailRef.current.value,
					title: occupationRef.current.value,
				}),
			});

			if (req.status === 200) {
				/* sweetalert2 success */
				await Swal.fire({
					icon: "success",
					title: "Success",
					text: "Register Successfully!",
				});

				navigate("/login");
			} else {
				console.log("register failed");
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.header}>Register</div>
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
								autoComplete="new-password"
								ref={passwordRef}
							/>
						</div>
						<div className={styles.item}>
							<FaLock size={18} />
							<input
								type="password"
								placeholder="Repeat password"
								ref={rPasswordRef}
							/>
						</div>
						<div className={styles.item}>
							<FaEnvelope size={18} />
							<input
								type="text"
								placeholder="Email"
								ref={emailRef}
							/>
						</div>
						<div className={styles.item}>
							<FaUserCheck size={18} />
							<select ref={occupationRef}>
								<option value="Guest">
									Select your occupation
								</option>
								<option value="Student">Student</option>
								<option value="Lecturer">Lecturer</option>
								<option value="Researcher">Researcher</option>
								<option value="Hobbyist">Hobbyist</option>
							</select>
						</div>
					</div>
				</div>
				<div className={styles.actions}>
					<button
						className={`neon-btn ${styles.btn}`}
						onClick={() => {
							navigate("/login");
						}}
					>
						<FaArrowLeft size={18} />
						Login
					</button>
					<button
						className={`neon-btn ${styles.btn}`}
						onClick={register}
					>
						<FaArrowRight size={18} />
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default Register;
