import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

import {
	Dashboard as DashboardIcon,
	Equalizer as AnalyticIcon,
	AccountBox as AccountIcon,
	Label as ChannelsIcon,
	FilterList as FilterIcon,
	Storage as BrowseIcon,
	Mail as NotiIcon,
	VpnKey as KeyIcon,
	Devices as DeviceIcon,
	Cached as WebhookIcon
} from "@material-ui/icons";

import style from "./styles/User.module.scss";

function Layout({ children, history }) {

	const isAuthenticated = !localStorage.getItem("isAuthenticated");

	// const token = localStorage.getItem("token");
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVkZWwiLCJpZCI6IjYxMGFiNjc5NGZiZWQxNjkzOGFmZTZjMyIsImlhdCI6MTYzNjI2MTQ0MX0.0RSBcrD1GX4t6Nz2TC5cEPpAXsPQUjfaS1JNVWEjZ9g";

	localStorage.setItem('token', token);

	const pageName =
		window.location.pathname.split("/")[
			window.location.pathname.split("/").length - 1
		];


	if (isAuthenticated) {
		return (
			<React.Fragment>
				<div className={style.header}>
					<div className={style.topbar}>
						<div className={style.logo}></div>
						<div className={style.tools}>
							<div className={style.noti}>
								<Badge badgeContent={3} color="error">
									<NotiIcon />
								</Badge>
							</div>
							<div className={style.avatar}>
								<Avatar
									alt="Muhd. Aidil Syazwan"
									src="/static/images/test.png"
								/>
							</div>
						</div>
					</div>
				</div>
	
				<div className={style.sidebar}>
					<div className={style.user}>
						<div className={style.field}>
							<div className={style.avatar}>
								<Avatar
									alt="Muhd. Aidil Syazwan"
									src="/static/images/test.png"
								/>
							</div>
							<div className={style.label}>
								<span className={style.name}>
									Muhd. Aidil Syazwan
								</span>
								<div className={style.occupation}>
									<span>Occupation: </span>
									<span>Student</span>
								</div>
							</div>
						</div>
					</div>
	
					<nav className={style.nav}>
						<div className={style.group}>
							<div className={style.title}>General</div>
							<div className={style.links}>
								<Link
									to={"/user/dashboard"}
									className={`${style.link} ${
										pageName === "dashboard" && style.active
									}`}
								>
									<DashboardIcon />
									<span>Dashboard</span>
								</Link>
								<Link
									to={"/user/analytics"}
									className={`${style.link} ${
										pageName === "analytics" && style.active
									}`}
								>
									<AnalyticIcon />
									<span>Analytics</span>
								</Link>
								<Link
									to={"/user/account"}
									className={`${style.link} ${
										pageName === "account" && style.active
									}`}
								>
									<AccountIcon />
									<span>Account</span>
								</Link>
							</div>
						</div>
						<div className={style.group}>
							<div className={style.title}>Data</div>
							<div className={style.links}>
								<Link
									to={"/user/browse"}
									className={`${style.link} ${
										pageName === "browse" && style.active
									}`}
								>
									<BrowseIcon />
									<span>Browse</span>
								</Link>
								<Link
									to={"/user/channels"}
									className={`${style.link} ${
										pageName === "channels" && style.active
									}`}
								>
									<ChannelsIcon />
									<span>Channels</span>
								</Link>
								<Link
									to={"/user/filters"}
									className={`${style.link} ${
										pageName === "filters" && style.active
									}`}
								>
									<FilterIcon />
									<span>Filters</span>
								</Link>
								<Link
									to={"/user/devices"}
									className={`${style.link} ${
										pageName === "devices" && style.active
									}`}
								>
									<DeviceIcon />
									<span>Devices</span>
								</Link>
								<Link
									to={"/user/keys"}
									className={`${style.link} ${
										pageName === "keys" && style.active
									}`}
								>
									<KeyIcon />
									<span>API Keys</span>
								</Link>
								<Link
									to={"/user/webhook"}
									className={`${style.link} ${
										pageName === "webhook" && style.active
									}`}
								>
									<WebhookIcon />
									<span>Webhook</span>
								</Link>
							</div>
						</div>
					</nav>
				</div>
	
				<main className={style.container}>{children}</main>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<Redirect to="/"/>
		</React.Fragment>
	)
}

export default withRouter(Layout);
