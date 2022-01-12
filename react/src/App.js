import { Routes, Route } from "react-router-dom";
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
	return (
		<div className="App">
			<Routes>
				<Route path="/user" element={<UserLayout />}>
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
					<Route path="/user/channels/view" element={<ViewChannelPage />} />
					<Route path="/user/channels/view/public" element={<ViewPublicChannelPage />} />
					<Route path="/user/channels/key" element={<ChannelKeysPage />} />
					<Route path="/user/channels/filters" element={<ChannelFiltersPage />} />
					{/* User -> Webhooks */}
					<Route path="/user/webhooks/add" element={<AddWebhookPage />} />
					<Route path="/user/webhooks" element={<WebhooksPage />} />
					{/* User -> Devices */}
					<Route path="/user/devices" element={<DevicesPage />} />
					<Route path="/user/devices/add" element={<AddDevicePage />} />
					{/* User -> ApiKeys */}
					<Route path="/user/apiKeys" element={<ApiKeysPage />} />
					<Route path="/user/apiKeys/add" element={<AddApiKeyPage />} />
					{/* User -> Filters */}
					<Route path="/user/filters" element={<FiltersPage />} />
					<Route path="/user/filters/add" element={<AddFilterPage />} />
					<Route path="/user/filters/edit" element={<EditFilterPage />} />
					{/* <Route path="inventory" element={<ManageInventoryPage />} />
					<Route path="/user/inventory/add" element={<InventoryAddItemPage />} />
					<Route path="/user/inventory/edit" element={<InventoryEditItemPage />} />
					<Route path="/user/inventory/sell" element={<InventoryAddSoldPage />} />

					<Route path="orders" element={<ManageOrderPage />} />
					<Route path="report" element={<DisplayReportPage />} />
					<Route path="accounts" element={<ManageAccountPage />} />
					<Route path="approve" element={<ApproveOrderPage />} />
					<Route path="add" element={<AddOrderPage />} />
					<Route path="update" element={<UpdateOrderPage />} /> */}
					{/* <Route path="tests" element={<TestPage />} /> */}
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
