import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/AttachMoney';

import { Link } from 'react-router-dom'

export default function ExpenseAppBar() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Link to="/login">
        <MenuIcon sx={{ "marginLeft": "-16px", "marginRight": "5px" }}/>
        </Link>
        <Typography variant="h6" color="inherit" component="div">
          MyExpenses
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

