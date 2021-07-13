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
import UserData from './pages/users/Data.page';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user">
          <UserLayout>
            <Switch>
              <Route path="/user/dashboard">
                <UserDashboard />
              </Route>
              <Route path="/user/channels">
                <UserChannels />
              </Route>
              <Route path="/user/data">
                <UserData />
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
