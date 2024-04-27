import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import "./Order.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add'; 
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility';




const columns = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "item", headerName: "Items", width: 150 },
  { field: "email", headerName: "Email", width: 190 },
  { field: "dateCreated", headerName: "DateCreated", width: 140 },
  { field: "quantity", headerName: "Quantity", width: 140 },
  { field: "price", headerName: "Price", width: 140 },
  { field: "status", headerName: "Status Order", width: 120 },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginRight: 5 }}
          // onClick={() => handleView(params.row)}
        >
      
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
  {
    id: 1,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "8",
    price: "$6",
    status: "completed",
  },
  {
    id: 2,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "8",
    price: "$6",
    status: "completed",

  },
  {
    id: 3,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "8",
    price: "$6",
    status: "completed",

  },
  {
    id: 4,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "8",
    price: "$6",
    status: "completed",

  },
  {
    id: 5,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "1",
    price: "$6",
    status: "completed",

  },
  {
    id: 6,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "8",
    price: "$6",
    status: "completed",

  },
  {
    id: 7,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "9",
    price: "$6",
    status: "completed",

  },
  {
    id: 8,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "8",
    price: "$6",
    status: "completed",

  },
  {
    id: 9,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "6",
    price: "$6",
    status: "completed",

  },
  {
    id: 10,
    item: "Cocoa",
    email: "jonsnow@gmail.com",
    dateCreated: "2024-12-12",
    quantity: "4",
    price: "$6",
    status: "completed",

  },


];

export default function Order() {
  const [selectedIcon] = useState("dashboard");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  // const handleView = (row) => {
  //   // Handle view action here
  //   console.log("View order:", row);
  // };

  // const handleDelete = (orderId) => {
  //   // Handle delete action here
  //   console.log("Delete order:", orderId);
  // };

  return (
    <>
      <div className="crumbs" role="presentation" >
        <Breadcrumbs className="breadcrumb">
          <Link
            to="/dashboard"
            style={{ marginBottom: "6px", color: "black", fontSize: 14 }}
            className={selectedIcon === "dashboard" ? "selected" : ""}
          >
            <HomeIcon
              sx={{
                fontSize: 20,
                marginRight: "4px",
                color: "black",
                marginBottom: "-4px",
              }}
            />
            Dashboard
          </Link>
          <Link
            to="/order"
            style={{ marginBottom: "6px", color: "black", fontSize: 14 }}
          >
            <ShoppingCartIcon
              sx={{
                fontSize: 18,
                marginRight: "4px",
                color: "black",
                marginBottom: "-4px",
              }}
            />
            Orders
          </Link>
        </Breadcrumbs>
      </div>
      <div>
      <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon  sx={{ marginLeft: '7px' }}  />}
          style={{ marginTop: '50px', marginLeft: '94%' }}
         
        >
        </Button>
          
        {loading ? (
          <Stack spacing={1} className="skeleton">
            <Skeleton variant="rectangular" width={800} height={20} />
            <Skeleton variant="rectangular" width={800} height={40} />
            <Skeleton variant="rectangular" width={800} height={60} />
            <Skeleton variant="rounded" width={800} height={80} />
            <Skeleton variant="rounded" width={800} height={100} />
          </Stack>
        ) : (
          <div className="gridbox">
            <div className="scrollable-grid">
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10, 15]}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
