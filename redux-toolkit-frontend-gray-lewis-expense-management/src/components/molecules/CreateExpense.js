import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import SendIcon from '@mui/icons-material/Send';

import { Formik } from 'formik';

import {
  saveExpenses,
} from '../../features/user/userSlice';

import AppBar from '../organisms/AppBar'

import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux';

import '../../styles/expenses.scss'

export default function CreateExpense() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <Formik
      initialValues={{ name: '', price: '', date: new Date() }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(saveExpenses([values]))
         .then((val) => {console.log(val); setSubmitting(false); history.go(0)})
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
     }) => 
      (<form onSubmit={handleSubmit}>
        <Grid 
          container 
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Grid item xs={2} alignItems="center" justifyContent="center">
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            ></TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Price"
              name="price"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
            ></TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Date"
              name="date"
              disabled="true"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
            ></TextField>
          </Grid>
          <Grid item xs={2} >
            <Button size="medium" type="submit" variant="contained" endIcon={<SendIcon />}>Submit</Button>
          </Grid>
        </Grid>
      </form>
      )}
      </Formik>
      <Divider sx={{ "marginTop": "1em", "marginBottom": "1em" }}></Divider>
    </div>
  )
}