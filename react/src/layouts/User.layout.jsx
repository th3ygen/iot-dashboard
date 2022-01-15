import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import styles from "styles/layout/User.module.scss";

import Navbar from "components/Navbar.component";
import Topbar from "components/Topbar.component";


export default function UserLayout(props) {
	const location = useLocation();
	const navigate = useNavigate();

	const [user, setUser] = useState({});

	const paths = [
		{
			path: "/user/inventory",
			name: "Dashboard",
			icon: "FaThList",
		},
		{
			path: "/user/browse",
			name: "Browse",
			icon: "FaClipboardList",
		},
		{
			path: "/user/channels",
			name: "Channels",
			icon: "FaStream",
		},
		{
			path: "/user/filters",
			name: "Filters",
			icon: "FaFilter",
		},
		/* {
			path: "/user/devices",
			name: "Devices",
			icon: "FaToolbox",
		}, */
		{
			path: "/user/apikeys",
			name: "API Keys",
			icon: "FaUserLock",
		},
		{
			path: "/user/webhooks",
			name: "Webhooks",
			icon: "FaConnectdevelop",
		},
		/* {
			path: "/user/analytics",
			name: "Analytics",
			icon: "FaChartBar",
		}, */
		{
			path: "/user/account",
			name: "Account",
			icon: "FaUserCog",
		},
	];

	useEffect(() => {
		let localUser = localStorage.getItem("user");

		if (localUser) {
            localUser = JSON.parse(localUser);

			setUser(localUser);

			if (localUser.role === "admin") {
				navigate("/admin", {
					replace: true,
				});
			}
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<div>
			<Topbar context={[user, setUser]}/>
			<Navbar paths={paths} username={user.username || "Loading..."} title={user.title || "Loading..."} />
			<div className={styles.content}>
				<Outlet context={[user, setUser]}/>
			</div>
		</div>
	);
}