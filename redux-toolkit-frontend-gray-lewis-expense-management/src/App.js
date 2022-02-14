import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './destyle.css'
import './App.css';

import Data from './components/organisms/Data';
import Login from './components/organisms/Login';
import AppBar from './components/organisms/AppBar';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Button from '@mui/material/Button';

import './styles/main.scss';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#DA4167'
    },
    primary: {
      main: '#003459'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar></AppBar>
        <Switch>
          <Route path="/data">
            <Data></Data>
          </Route>
          <Route path="/">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
