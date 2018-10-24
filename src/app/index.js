import React, { Component } from 'react';

import { Provider } from 'mobx-react';
import {
  observer
} from 'mobx-react';
import createBrowserHistory from 'history/createBrowserHistory';
import {
  RouterStore,
  syncHistoryWithStore
} from 'mobx-react-router';
import { 
  Router,
  Route,
  Switch
 } from 'react-router';

import {
  TestStore
} from 'Store';

import {
  Home,
  JointTest,
  CarouselTest
} from 'Routes';


const testStore = new TestStore();
const routerStore = new RouterStore();
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routerStore);

const stores = {
  routing: routerStore,
  testStore
};

@observer
class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/joint" component={JointTest} />
            <Route path="/carousel" component={CarouselTest} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;