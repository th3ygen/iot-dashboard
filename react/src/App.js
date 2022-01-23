import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Connector, useMqttState } from "mqtt-react-hooks";
import * as mqtt from "mqtt";
import logo from "./logo.svg";
import "styles/App.module.scss";

import UserLayout from "layouts/User.layout";
import AdminLayout from "layouts/Admin.layout";

// pages
import TestPage from "page/Test";

/* // Inventory page
import ManageInventoryPage from 'page/common/inventory/ManageInventory';
import InventoryAddItemPage from 'page/common/inventory/AddItem';
import InventoryEditItemPage from 'page/common/inventory/UpdateItem';
import InventoryAddSoldPage from 'page/common/inventory/AddSold';

// Report page
import DisplayReportPage from 'page/common/report/DisplayReport';
import ForgotPasswordPage from 'page/common/ForgotPassword';

// Account page
import ManageAccountPage from 'page/admin/account/ManageAccount';
import AddAccountPage from 'page/admin/account/AddAccount';
import UpdateAccountPage from 'page/admin/account/UpdateAccount';


// Order page
import ManageOrderPage from 'page/common/order/ManageOrder';
import AddOrderPage from 'page/common/order/AddOrder';
import ApproveOrderPage from 'page/common/order/ApproveOrder';
import UpdateOrderPage from 'page/common/order/UpdateOrder'; */

// Login
import LoginPage from "page/Login";
// Register
import RegisterPage from "page/Register";

// User -> Data
import BrowseDataPage from "page/user/BrowseData";
// User -> Channels
import ChannelPage from "page/user/channel/Channel";
import AddChannelPage from "page/user/channel/AddChannel";
import EditChannelPage from "page/user/channel/EditChannel";
import ChannelKeysPage from "page/user/channel/ApiKey";
import ChannelFiltersPage from "page/user/channel/Filters";
import ViewChannelPage from "page/user/channel/View";
import ViewPublicChannelPage from "page/user/channel/ViewPublic";
// User -> Webhooks
import WebhooksPage from "page/user/webhook/Webhooks";
import AddWebhookPage from "page/user/webhook/AddWebhook";
import EditWebhookPage from "page/user/webhook/EditWebhook";
// User -> Devices
import DevicesPage from "page/user/device/Devices";
import AddDevicePage from "page/user/device/AddDevice";
// User -> ApiKeys
import ApiKeysPage from "page/user/apiKey/ApiKeys";
import AddApiKeyPage from "page/user/apiKey/AddApiKeys";
// User -> Filters
import FiltersPage from "page/user/filter/Filters";
import AddFilterPage from "page/user/filter/AddFilter";
import EditFilterPage from "page/user/filter/EditFilter";

// Admin -> Users
import AdminManageUsersPage from "page/admin/user/Users";
import AdminEditUserPage from "page/admin/user/EditUser";

// Admin -> Channels
import AdminManageChannelsPage from "page/admin/channel/Channels";

// Admin -> API Keys
import AdminManageKeysPage from "page/admin/keys/Keys";

// Admin -> Webhooks
import AdminManageWebhooksPage from "page/admin/webhook/Webhooks";

// Admin -> Filters
import AdminManageFiltersPage from "page/admin/filter/Filters";

function Home() {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>
		</header>
	);
}

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const { connectionStatus } = useMqttState();

	const [mqttClient, setMqttClient] = useState(null);
	const [user, setUser] = useState({});

	const login = (user) => {
		localStorage.setItem("user", JSON.stringify(user));

		setUser(user);
	};

	/* useEffect(() => {
		console.log(connectionStatus);
	}, [connectionStatus]); */

	/* useE
	ffect(() => {
		const localUser = localStorage.getItem("user");

		if (localUser) {
			setUser(JSON.parse(localUser));
		} else {
			navigate("/login");
		}
	}, []); */

	useEffect(() => {
		if (!mqttClient) {
			const client = mqtt.connect("ws://localhost:9001");

			console.log("connecting...");

			client.on("connect", () => {
				console.log("connected");

				client.subscribe("iot-dash/+/+/update");
				client.subscribe("iot-dash/+/+/webhook");

				setMqttClient(client);
			});
		}
	}, []);

	useEffect(() => {
		if (
			[
				"/login",
				"/register",
				"/forgot-password",
				"/reset-password",
			].includes(location.pathname)
		) {
			return;
		}

		const localUser = localStorage.getItem("user");

		if (localUser) {
			setUser(JSON.parse(localUser));

			const u = JSON.parse(localUser);

			if (u.role === "user") {
				if (location.pathname === "/") {
					navigate("/user/browse", { replace: true });
				}
			} else {
				if (location.pathname === "/") {
					navigate("/admin/users", { replace: true });
				}
			}
		} else {
			navigate("/login");
		}
	}, [location, navigate]);

	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<LoginPage onLogin={login} />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route
					path="/user"
					element={<UserLayout mqtt={mqttClient} user={user} />}
				>
					<Route index element={<Home />} />
					{/* User -> Data */}
					<Route path="/user/browse" element={<BrowseDataPage />} />
					{/* User -> Channels */}
					<Route path="/user/channels" element={<ChannelPage />} />
					<Route
						path="/user/channels/add"
						element={<AddChannelPage />}
					/>
					<Route
						path="/user/channels/edit"
						element={<EditChannelPage />}
					/>
					<Route
						path="/user/channels/view"
						element={<ViewChannelPage />}
					/>
					<Route
						path="/user/channels/view/public"
						element={<ViewPublicChannelPage />}
					/>
					<Route
						path="/user/channels/key"
						element={<ChannelKeysPage />}
					/>
					<Route
						path="/user/channels/filters"
						element={<ChannelFiltersPage />}
					/>
					{/* User -> Webhooks */}
					<Route path="/user/webhooks" element={<WebhooksPage />} />
					<Route
						path="/user/webhooks/add"
						element={<AddWebhookPage />}
					/>
					<Route
						path="/user/webhooks/edit"
						element={<EditWebhookPage />}
					/>
					{/* User -> Devices */}
					<Route path="/user/devices" element={<DevicesPage />} />
					<Route
						path="/user/devices/add"
						element={<AddDevicePage />}
					/>
					{/* User -> ApiKeys */}
					<Route path="/user/apiKeys" element={<ApiKeysPage />} />
					<Route
						path="/user/apiKeys/add"
						element={<AddApiKeyPage />}
					/>
					{/* User -> Filters */}
					<Route path="/user/filters" element={<FiltersPage />} />
					<Route
						path="/user/filters/add"
						element={<AddFilterPage />}
					/>
					<Route
						path="/user/filters/edit"
						element={<EditFilterPage />}
					/>
				</Route>
				<Route path="/admin" element={<AdminLayout user={user} />}>
					<Route index element={<Home />} />
					{/* Admin -> Users */}
					<Route
						path="/admin/users"
						element={<AdminManageUsersPage />}
					/>
					<Route
						path="/admin/users/edit"
						element={<AdminEditUserPage />}
					/>
					{/* Admin -> Channels */}
					<Route
						path="/admin/channels"
						element={<AdminManageChannelsPage />}
					/>
					{/* Admin -> API Keys */}
					<Route
						path="/admin/keys"
						element={<AdminManageKeysPage />}
					/>
					{/* Admin -> Webhooks */}
					<Route
						path="/admin/webhooks"
						element={<AdminManageWebhooksPage />}
					/>
					{/* Admin -> Filters */}
					<Route
						path="/admin/filters"
						element={<AdminManageFiltersPage />}
					/>
					{/* <Route path="/admin/users/edit" element={<AdminEditUserPage />} /> */}
				</Route>
				{/* <Route path="/admin" element={<AdminLayout />}>
						<Route index element={<Home />} />
						<Route path="accounts" element={<ManageAccountPage />} />
						<Route path="/admin/accounts/add_account" element={<AddAccountPage />} />
						<Route path="/admin/accounts/update_account" element={<UpdateAccountPage />} />
						<Route path="report" element={<DisplayReportPage />} />
						<Route path="inventory" element={<ManageInventoryPage />} />
					</Route> */}
			</Routes>
		</div>
	);
}

export default App;
