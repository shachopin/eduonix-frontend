import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLoginPage from './features/admin/components/login';
import AdminAllBookings from './features/admin/components';
import RetailLoginPage from './features/retail/components/login';
import RetailSignUpPage from './features/retail/components/signup';
import RetailHomePage from './features/retail/components'
import NavBar from './navbar';
import { useSelector } from 'react-redux';
import { selectUserActivity } from './features/retail/slice';
import { RetailSnackBar } from './components/retail-snackbar';
import { selectAdminActivity } from './features/admin/slice';
function PrivateRoute({ children, ...rest }) {
  const userActivity = useSelector(selectUserActivity);
  const adminActivity = useSelector(selectAdminActivity);
  return (
    <Route
      {...rest}
      render={({ location }) =>{
        if(userActivity.loggedIn || adminActivity.adminLoggedIn){
          return children;
        }
        if(!userActivity.loggedIn){
          return <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
        }
        if(!adminActivity.adminLoggedIn){
          return <Redirect to={{
            pathname: '/admin/login/',
            state: { from: location }
          }} />
        }
      }
      }
    />
  )
}
function App() {
  return (
    <>
      <NavBar/>
      <Switch>
        <PrivateRoute  exact path="/">
          <RetailHomePage />
        </PrivateRoute>
        <Route path="/login/">
          <RetailLoginPage  />
        </Route>
        <Route path="/signup/" >
          <RetailSignUpPage />
        </Route>
        <Route path="/admin/login/">
          <AdminLoginPage />
        </Route>
        <PrivateRoute exact path="/admin/">
          <AdminAllBookings />
        </PrivateRoute>
      </Switch>
      <RetailSnackBar/>
    </>
  );
}

export default App;
