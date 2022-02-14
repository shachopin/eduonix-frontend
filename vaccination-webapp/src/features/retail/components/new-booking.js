import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Avatar, Button, CssBaseline, Typography } from '@material-ui/core';
import { createNewAppointmentThunk, fetchAllHospitalsThunk, selectHospitalInfo, selectUserInfo } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));
export default function NewBooking() {
  const classes = useStyles();
  const hospitals = useSelector(selectHospitalInfo);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllHospitalsThunk(userInfo.id))
  }, [userInfo.id, dispatch])
  const [formdata, setFormdata] = React.useState({
    ...userInfo,
    appointmenttime: new Date()
  });
  const validations = (element) => {
    switch (element) {
      default: {
        return false;
      }
    }
  }
  const handleChange = (e, element) => {
    setFormdata({
      ...formdata,
      [element]: e.target.value
    })
  }
  const handleSubmit = () => {
    dispatch(createNewAppointmentThunk({
      appointmentTime: formdata.appointmenttime,
      status: "BOOKED",
      userId: userInfo._id,
      hospitalId: formdata.hospital,
      vaccine: formdata.vaccine
    }))
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src="/eduonix-logo.png"></Avatar>
        <Typography component="h1" variant="h5">
          Book Appointment
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="username"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                error={validations("username")}
                onChange={(e) => handleChange(e, "username")}
                disabled
                value={formdata.username}
                helperText={validations("name") ? "Minimum character length is 10" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={validations("email")}
                onChange={(e) => handleChange(e, "email")}
                value={formdata.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled
                helperText={validations("email") ? "Enter a Valid Email" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => handleChange(e, "mobile")}
                value={formdata.mobile}
                variant="outlined"
                required
                fullWidth
                name="mobile"
                label="Mobile"
                type="mobile"
                id="mobile"
                disabled
                autoComplete="current-mobile"
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                id="datetime-local"
                label="Appointment Time"
                type="datetime-local"
                fullWidth
                value={formdata.appointmenttime}
                onChange={(e) => {
                  setFormdata({
                    ...formdata,
                    appointmenttime: e.target.value
                  })
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">hospital</InputLabel>
                <Select
                  native
                  value={formdata.hospital}
                  onChange={(e) => handleChange(e, "hospital")}
                  label="Hospital"
                  inputProps={{
                    name: 'Hospital',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {hospitals?.map(hospital => <option value={hospital._id}>{hospital.name}</option>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">vaccine</InputLabel>
                <Select
                  native
                  value={formdata.vaccine}
                  onChange={(e) => handleChange(e, "vaccine")}
                  label="Vaccine Type"
                  inputProps={{
                    name: 'vaccine',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="covaxin">Covaxin</option>
                  <option value="covishield">Covishield</option>
                </Select>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Grid>

        </form>
      </div>
    </Grid>
  )
}