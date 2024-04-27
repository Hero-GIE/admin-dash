import React, {useState,useEffect} from 'react';
import logo from "../../img/bssicon.png";
import "./Sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShopIcon from '@mui/icons-material/Shop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { Link, useLocation} from "react-router-dom";


export const Sidebar = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const location = useLocation();

  // const handleIconClick = (iconName) => {
  //   setSelectedIcon(iconName);
  // };
  
  useEffect(() => {
    // Logic to set the selected icon based on the current route
    switch (location.pathname) {
      case "/dashboard":
        setSelectedIcon('dashboard');
        break;
      case "/goods":
        setSelectedIcon('goods');
        break;
      case "/order":
        setSelectedIcon('order');
        break;
      case "/user":
        setSelectedIcon('user');
        break;
      case "/shop":
        setSelectedIcon('shop');
        break;
        case "/profile":
          setSelectedIcon('profile');
          break
      default:
        setSelectedIcon(null);
        break;
    }
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <div className="top">
        <img src={logo} alt="K-Market" className="logo" />
      </div>
      <div className="centre">
        <ul>
 
          <Link to="/dashboard">
            <li className = {selectedIcon ==='dashboard' ? 'selected' : ''} >
              <HomeIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
    
          <Link to="/goods">
            <li className = {selectedIcon ==='goods' ? 'selected' : ''} >
              <Inventory2Icon className="icon" />
              <span>Products </span>
            </li>
          </Link>
   
          <Link to="/order">
            <li className = {selectedIcon ==='order' ? 'selected' : ''} >
              <ShoppingCartIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
      
          <Link to="/user">
            <li className = {selectedIcon ==='user' ? 'selected' : ''} >
              <PeopleIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
  
          <Link to="">
            <li className={selectedIcon === 'shop' ? 'selected' : ''} >
              <ShopIcon className="icon" />
              <span>Shops</span>
            </li>
          </Link> 
          <Link to="/admin">
            <li className={selectedIcon === 'admin' ? 'selected' : ''} >
              <ManageAccountsIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link> 

          <Link to="/logout">
            <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
