import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Home, LoggedIn, LoginForm} from './components/index.jsx'
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/login" component={LoginForm} />
          <Route exact path="/account" component={LoggedIn} /> */}
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

const app = document.querySelector('#app');

ReactDom.render(
  <App />,
  app,
  ()=>console.log('app rendered'))