import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import './user.scss';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Datatable from '../../components/datatable/datatable'



export default function User() {
  const [selectedIcon] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const handleAddIconClick = () => {
    // Navigate to the User page
    navigate('/new');
  };

  useEffect(() => {
    // Simulate data loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className='Data' role="presentation" >
        <Breadcrumbs className='breadcrumb'>
          <Link to="/dashboard" style={{ marginBottom: '6px', color: 'black', fontSize: 14 }} className={selectedIcon === 'dashboard' ? 'selected' : ''}>
            <HomeIcon sx={{ fontSize: 20, marginRight: '4px', color: 'black', marginBottom: '-4px' }} />
            Dashboard
          </Link>
          <Link to="/customer" style={{ marginBottom: '6px', color: 'black', fontSize: 14 }}>
            <Inventory2Icon sx={{ fontSize: 18, marginRight: '4px', color: 'black', marginBottom: '-4px', }} />
            Users
          </Link>
        </Breadcrumbs>
      </div>
      <div>
        <Button
          className="btn"
          variant="contained"
          color="primary"
          startIcon={<AddIcon sx={{ marginLeft: '7px' }} />}
          style={{ marginTop: '50px', marginLeft: '94%' }}
          onClick={handleAddIconClick}
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
        ) :
         (
          <Datatable/>
        )
        }
      </div>
    </>
  );
}
