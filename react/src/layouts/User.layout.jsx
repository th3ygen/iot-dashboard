import { Outlet } from "react-router-dom";

import styles from "styles/layout/User.module.scss";

import Navbar from "components/Navbar.component";
import Topbar from "components/Topbar.component";

export default function UserLayout(props) {
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

	return (
		<div>
			<Topbar />
			<Navbar paths={paths} />
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}