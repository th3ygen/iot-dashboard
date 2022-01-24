import { useState, useRef, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { FaPlus, FaUserCheck } from "react-icons/fa";
import Tippy from "@tippyjs/react";

import PageHeader from "components/PageHeader.component";

import styles from "styles/user/channel/AddChannel.module.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";

function CreateUserPage() {
	const [user, setUser, message] = useOutletContext();

	const navigate = useNavigate();

	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const occupationRef = useRef();
	const roleRef = useRef();

	const create = async () => {
		const request = await fetch(
			"http://localhost:8080/api/auth/create",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					auth: user.token,
				},
				body: JSON.stringify({
					username: usernameRef.current.value,
					password: passwordRef.current.value,
					email: emailRef.current.value,
					title: occupationRef.current.value,
					role: roleRef.current.value,
				}),
			}
		);

		if (request.status === 200) {
			navigate("/admin/users");
		}

	};

	return (
		<div className={styles.container}>
			<PageHeader
				title="Create new user"
				brief="Create a new user, you may assign them as a system administrator."
				navs={[
					{
						name: "Users",
						path: "/admin/users",
						icon: "FaReply",
					},
				]}
			/>
			<div className={styles.content}>
				<div className={styles.form}>
					<div className={styles.item}>
						<label>Username</label>
						<input type="text" ref={usernameRef}/>
					</div>
					<div className={styles.item}>
						<label>Password</label>
						<input type="text" autoComplete="new-password" ref={passwordRef}/>
					</div>
					<div className={styles.item}>
						<label>Email</label>
						<input type="email" ref={emailRef}/>
					</div>
					<div className={styles.item}>
						<label>Occupation</label>
						<select ref={occupationRef}>
							<option value="Guest">Select occupation</option>
							<option value="Student">Student</option>
							<option value="Lecturer">Lecturer</option>
							<option value="Researcher">Researcher</option>
							<option value="Hobbyist">Hobbyist</option>
						</select>
					</div>
					<div className={styles.item}>
						<label>Role</label>
						<select ref={roleRef}>
							<option value="user">User</option>
							<option value="admin">Admin</option>
						</select>
					</div>

					<div className={`${styles.item} ${styles.addBtn}`}>
						<div className="neon-btn" onClick={create}>
							<FaPlus /> <span>Create user</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateUserPage;
