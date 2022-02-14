import '../../styles/login.scss';

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import {
  loginAsync,
} from '../../features/user/userSlice';

import { Formik, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import React, { useEffect, useState } from 'react';

export default function Login() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [error, setError] = useState()

  return (
    <div className="login-container">
      <div className="login-title">Log in to your account</div>
      <Formik
       initialValues={{ email: '', password: '' }}
       onSubmit={(values, { setSubmitting }) => {
         console.log(values)
         dispatch(loginAsync(values))
          .unwrap()
          .then((val) => {
            if (!val.message) {
              history.push('/data')
            } else {
              setError(val.message)
            }
            setSubmitting(false);
          })
       }}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
      <form onSubmit={handleSubmit} className="login-form">
        <input name="email" type="text" className="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}/>
        <input name="password" type="password" className="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <ErrorMessage name="email"/>
        <ErrorMessage name="password"/>
        { error ? 
        <Alert variant="outlined" severity="error" sx={{ marginTop: "1em" }}>{ error }</Alert>
        :
        <div></div>
        }
        
        <Button type="submit" variant="contained">Log In</Button>
      </form>
      )}
      </Formik>
    </div>

  );
}