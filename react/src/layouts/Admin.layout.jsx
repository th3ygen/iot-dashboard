import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Navbar from "components/Navbar.component";
import Topbar from "components/Topbar.component";

import styles from "styles/layout/Admin.module.scss";

export default function AdminLayout() {
	const location = useLocation();
	const navigate = useNavigate();

	const [user, setUser] = useState({});

	const paths = [
		{
			path: "/admin/users",
			name: "Users",
			icon: "FaUserFriends",
		},
		{
			path: "/admin/channels",
			name: "Channels",
			icon: "FaStream",
		},
		{
			path: "/admin/filters",
			name: "Filters",
			icon: "FaFilter",
		},
		/* {
			path: "/user/devices",
			name: "Devices",
			icon: "FaToolbox",
		}, */
		{
			path: "/admin/keys",
			name: "API Keys",
			icon: "FaUserLock",
		},
		{
			path: "/admin/webhooks",
			name: "Webhooks",
			icon: "FaConnectdevelop",
		},
	];

	useEffect(() => {
		let localUser = localStorage.getItem("user");

		if (localUser) {
            localUser = JSON.parse(localUser);

			setUser(localUser);

			if (localUser.role !== "admin") {
				navigate("/user", {
					replace: true,
				});
			}
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<div>
			<Topbar context={[user, setUser]} />
			<Navbar paths={paths} username={user.username || "Loading..."} title={user.title || "Loading..."} />
			<div className={styles.content}>
				<Outlet context={[user, setUser]} />
			</div>
		</div>
	);
}
