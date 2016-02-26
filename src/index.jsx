import 'file?name=[name].[ext]!./index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Store from './store/store';
import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute} from 'react-router';
import history from './utilities/history';
import Dashboard from './components/pages/dashboard/dashboard';
import List from './components/pages/list/list';
import NewReport from './components/pages/report/new';
import Defect from './components/pages/report/defect';
import Summary from './components/pages/report/summary';


ReactDOM.render(
  <Provider store={Store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={List} />
          <Route path="report/new" component={NewReport} />
          <Route path="report/new/defect/:category" component={Defect} />
          <Route path="report/summary/:id" component={Summary} />
        </Route>
      </Router>
    </div>
  </Provider>
  ,
  document.getElementById('app')
);
