import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

/* import logo from './logo.svg';
import styles from './App.module.scss'; */

import UserLayout from './layouts/User.layout';
import UserDashboard from './pages/users/Dashboard.page';
import UserChannels from './pages/users/Channels.page';
import UserBrowse from './pages/users/Browse.page';

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
