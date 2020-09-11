import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from "@chakra-ui/core";
import { LoginForm, LoggedIn, About, LandingPage, CreateGame, LoadingGame} from './components'
import store from './store';
import CodeEditor from './components/editor';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/About" component={About} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/account" component={LoggedIn} />
            <Route exact path="/create" component={CreateGame} />
            <Route exact path="/loading-game" component={LoadingGame} />
            <Route exact path="/editor" component={CodeEditor} />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

const app = document.querySelector('#app');

ReactDom.render(
  <App />,
  app,
  ()=>console.log('app rendered'))