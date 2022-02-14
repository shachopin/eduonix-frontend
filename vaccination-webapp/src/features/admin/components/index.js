import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookingsThunk, selectAllBookings } from '../slice';
import EditIcon from '@material-ui/icons/Edit';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell>{row.mobile}</TableCell>
        <TableCell>{row.vaccine}</TableCell>
        <TableCell>{row.hospital}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.appointmenttime}</TableCell>
        <TableCell>{row.bookingtime}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            <EditIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
      </React.Fragment>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}))
export default function CollapsibleTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllBookingsThunk());
  },[dispatch]);
  const allBookings = useSelector(selectAllBookings)??[];
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar} src="/eduonix-logo.png"></Avatar>
      <Typography component="h1" variant="h5">
        All Appointments
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Vaccine Name</TableCell>
              <TableCell>Appointment Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date of Vaccination</TableCell>
              <TableCell>Date of Booking</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBookings?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};
