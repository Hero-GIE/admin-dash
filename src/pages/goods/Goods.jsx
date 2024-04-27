import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import './Goods.scss';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const columns = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'productName', headerName: 'Product name', width: 180 },
  { field: 'lastName', headerName: 'Last name', width: 180 },
  { field: 'firstName', headerName: 'First name', width: 180 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'quantity', headerName: 'Quantity', width: 140 },
  
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 150,
  //   marginLeft: 30,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },

  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => (
      <div>
        <Button variant="contained" color="primary" size="small" style={{ marginRight: 5 }}>
        <VisibilityIcon/>
          </Button>
        <Button variant="contained" color="error" size="small">
          <DeleteIcon />
        </Button>
      </div>
    ),
  },
];

const rows = [
  { id: 1, productName: 'Corned Beef', lastName: 'Snow', firstName: 'Jon', price: '$6', quantity: '6' },
  { id: 2, productName: 'Milo', lastName: 'Lannister', firstName: 'Cersei', price: '$6', quantity: '6' },
  { id: 3, productName: 'Sardin', lastName: 'Lannister', firstName: 'Jaime', price: '$6', quantity: '6' },
  { id: 4, productName: 'Koobi', lastName: 'Stark', firstName: 'Arya', price: '$6', quantity: '6' },
  { id: 5, productName: 'Spaghetti', lastName: 'Targaryen', firstName: 'Daenerys', price: '$6', quantity: '6' },
  { id: 6, productName: 'Cowbell', lastName: 'Lannister', firstName: 'Tyron', price: '$6', quantity: '6' },
  { id: 7, productName: 'Tuna', lastName: 'Stark', firstName: 'Bran', price: '$6', quantity: '6' },
  { id: 8, productName: 'Coca-Cola', lastName: 'Stark', firstName: 'Sansa', price: '$6', quantity: '6' },
  { id: 9, productName: 'Brown Sugar', lastName: 'Roxie', firstName: 'Harvey', price: '$6', quantity: '6' },
];

export default function Goods() {
  const [selectedIcon] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    // Simulate data loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);


    return () => clearTimeout(timer);
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  return (
    <>
      <div className='Data' role="presentation" >
        <Breadcrumbs className='breadcrumb'>
          <Link to="/dashboard" style={{ marginBottom: '6px', color: 'black', fontSize: 14 }} className={selectedIcon === 'dashboard' ? 'selected' : ''}
          // onClick={() => handleIconClick('dashboard')}
          >
            <HomeIcon sx={{ fontSize: 20, marginRight: '4px', color: 'black', marginBottom: '-4px' }} />
            Dashboard
          </Link>
          <Link to="/goods" style={{ marginBottom: '6px', color: 'black', fontSize: 14 }}>
            <Inventory2Icon sx={{ fontSize: 18, marginRight: '4px', color: 'black', marginBottom: '-4px', }} />
            Products
          </Link>
        </Breadcrumbs>
      </div>
      <div>
        <Button
          className="btn"
          variant="contained"
          color="primary"
          startIcon={<AddIcon sx={{ marginLeft: '7px' }} />}
          onClick={handleOpenDialog}
          style={{ marginTop: '50px', marginLeft: '94%' }}
        >
        </Button>

        {loading ? (
          <Stack spacing={1} className='stack' >
            <Skeleton variant="rectangular" width={800} height={20} />
            <Skeleton variant="rectangular" width={800} height={40} />
            <Skeleton variant="rectangular" width={800} height={60} />
            <Skeleton variant="rounded" width={800} height={80} />
            <Skeleton variant="rounded" width={800} height={100} />
          </Stack>
        ) : (
          <div className='grid'>
            <div className='scroll-grid'>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10, 15]}
                autoHeight
              />
            </div>
          </div>
        )}
      </div>
      {/* Dialog component */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontWeight: '900', opacity: 0.2 }}>{"Add Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
              {/* Profile image */}
              <Grid item xs={12} container justifyContent="center">
                <img src="https://ownit.london/wp-content/uploads/2023/09/Idris-Elba-600x600-1.jpg" alt="User Profile" style={{ width: '150px', height: '150px', borderRadius: '20%' }} />
              </Grid>
              {/* Text fields */}
              <Grid item xs={12} container justifyContent="center" style={{ marginLeft: '27px' }}>
                <Grid container spacing={2}>
                  {/* First row of text fields */}
                  <Grid item xs={6}>
                    <TextField label="Outlined primary" color="primary" focused />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Outlined secondary" color="primary" focused />
                  </Grid>
                  {/* Second row of text fields */}
                  <Grid item xs={6} >
                    <TextField label="Outlined secondary" color="primary" focused />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Outlined secondary" color="primary" focused />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}  style={{ color: 'red' }}>Cancel</Button>
          <Button onClick={handleCloseDialog}>Save</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
