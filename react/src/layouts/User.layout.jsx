import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import styles from "styles/layout/User.module.scss";

import Navbar from "components/Navbar.component";
import Topbar from "components/Topbar.component";


export default function UserLayout(props) {
	const [user, setUser] = useState({});

	const paths = [
		{
			path: "/user/inventory",
			name: "Dashboard",
			icon: "FaThList",
		},
		{
			path: "/user/browse",
			name: "Browse Data",
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
		{
			path: "/user/devices",
			name: "Devices",
			icon: "FaToolbox",
		},
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
		{
			path: "/user/analytics",
			name: "Analytics",
			icon: "FaChartBar",
		},
		{
			path: "/user/account",
			name: "Account",
			icon: "FaUserCog",
		},
	];

	useEffect(() => {
		/* if (localStorage.getItem("user")) {
			setUser(JSON.parse(localStorage.getItem("user")));
		} else {
			alert("You are not logged in!");
			navigate("/");
		} */
		setUser({
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVkZWwiLCJpZCI6IjYxMGFiNjc5NGZiZWQxNjkzOGFmZTZjMyIsImlhdCI6MTY0MTc5MDgyMH0.KJXsw1wiYyN8eiRFVLMkwvr1y9mdHiWnl86s3_WwF3I',
			username: 'admin',
		})
	}, []);

	return (
		<div>
			<Topbar />
			<Navbar paths={paths} />
			<div className={styles.content}>
				<Outlet context={[user, setUser]}/>
			</div>
		</div>
	);
}