import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

/* import logo from './logo.svg';
import styles from './App.module.scss'; */

import UserLayout from './layouts/User.layout';
import UserDashboard from './view/users/Dashboard.page';
import UserChannels from './view/users/Channels.page';
import UserBrowse from './view/users/Browse.page';
import UserKeys from './view/users/Keys.page';
import UserFilters from './view/users/Filters.page';
import UserWebhook from './view/users/Webhook.page';
import UserDevices from './view/users/Devices.page';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user">
          <UserLayout>
            <Switch>
              <Route path="/user/dashboard">
                <UserDashboard name="dashboard"/>
              </Route>
              <Route path="/user/channels">
                <UserChannels />
              </Route>
              <Route path="/user/browse">
                <UserBrowse />
              </Route>
              <Route path="/user/filters">
                <UserFilters />
              </Route>
              <Route path="/user/keys">
                <UserKeys />
              </Route>
              <Route path="/user/devices">
                <UserDevices />
              </Route>
              <Route path="/user/webhook">
                <UserWebhook />
              </Route>
              <Route path="*">
                404
              </Route>
            </Switch>
          </UserLayout>
        </Route>
        <Route path="*">
          404
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
