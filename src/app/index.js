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
  Route
 } from 'react-router';

import {
  TestStore
} from 'Store';

import {
  Home
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
  onBtn = (e) => {
    testStore.add({
      name: 'yongnam',
      position: 'bottom of bottom'
    });
  }

  render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <Route path="/" component={Home} />
        </Router>
      </Provider>
    )
  }
}

export default App;