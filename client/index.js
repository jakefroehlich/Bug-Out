import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { LoginForm, LoggedIn, Home } from './components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import NavBar from './components/nav';


class App extends Component{  
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter >
        <Route render={() => <NavBar />} />
          <Switch>
            <Route exact path={'/'} component ={Home}></Route>
            <Route exact path={'/login'} component={LoginForm}></Route>
            <Route exact path={'/account'} component={LoggedIn}></Route>
            <Redirect to='/' />
          </Switch>
        </BrowserRouter >
      </Provider>
    )
  }
}

const app = document.querySelector('#app');

ReactDom.render(
  <App/>,
  app,
  ()=>console.log('app rendered'))