import React, { useEffect, useState } from 'react';

import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete';

import CreateExpense from '../molecules/CreateExpense'

import { useHistory } from 'react-router'

import {
  fetchExpenses,
  saveExpenses,
  deleteExpense
} from '../../features/user/userSlice';

import { useDispatch, useSelector } from 'react-redux';

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'date', headerName: 'Date', width: 400 },
];

export default function App() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [rows, setRows] = useState([]);

  const [selectionModel, setSelectionModel] = React.useState([]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/')
    } else {
      const fetchData = async () => { //not sure why async is used, there is no await in the function body
      
        dispatch(fetchExpenses())
          .unwrap()
          .then((expenses) => {
            expenses = expenses.map((expense, index) => { return { ...expense, id: expense._id }})
            setRows(expenses)
          })
      }
      fetchData()
    }
  }, [])

  const handleDelete = () => {
    const rowsWithoutDeletedElement = rows.filter((row, i) => row["id"] !== selectionModel[0])
    dispatch(deleteExpense(selectionModel[0]))
    setRows(rowsWithoutDeletedElement)
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button disabled={selectionModel.length < 1} onClick={handleDelete} sx={{ "padding": 0, "paddingRight": "5px", "height": "30px", "fontSize": "12px"}}><DeleteIcon sx={{marginRight: "8px"}} fontSize="small"/>Delete</Button>
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 33px)', width: '100%' }}>
      <Grid sx={{marginTop: "6em"}} alignItems="center" justifyContent="center">
        <Container sx={{ height: "400px" }}>
          <Typography sx={{ textAlign: "center", fontFamily: "Space Grotesk", fontWeight: "bold", color: "#003459", marginBottom: "1em" }} variant="h4">Your Expenses</Typography>
          <CreateExpense></CreateExpense>
          <DataGrid 
            components={{Toolbar: CustomToolbar}} 
            rows={rows} 
            columns={columns} 
            onSelectionModelChange={(newSelectionModel) => {
              console.log(newSelectionModel)
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            density="compact"
          />
        </Container>
      </Grid>
    </div>
  );
}