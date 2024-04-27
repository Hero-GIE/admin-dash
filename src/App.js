import React from "react";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Homie from "./pages/homie/Homie";
import Logout from "./pages/logout/logout";
import Signin from "./pages/signin/Signin";
import {userInputs} from  './formSource'
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./firebase.config";
import Goods from './pages/goods/Goods'
import Order from './pages/order/Order'
import Admin from './pages/adminProfile/admin'
import User from './pages/user/user'
import New from './pages/new/new'

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <BrowserRouter>
        {user !== null ? (
          <div className="list">
            <Sidebar />
            <div className="listContainer">
              <Navbar />
              <div className="bodyContainer">
                <div className="backing">
                  <div className="widget">
                    <Routes>
                      <Route exact path="/">
                        {/* Protected routes */}
                        <Route exact path="dashboard" element={<Homie />} />
                        <Route exact path="logout" element={<Logout />} />
                
                        <Route exact path="user">
                          <Route index element={<User />} />
                        </Route>

                        <Route exact path="goods">
                          <Route index element={<Goods />} />
                        </Route>

                        <Route exact path="order">
                          <Route index element={<Order />} />
                        </Route>

                        <Route exact path="admin">
                          <Route index element={<Admin />} />
                        </Route>
                        
                        <Route exact path="new">
                          <Route index element={<New inputs={ userInputs} title= {"Add New User"} />} />
                        </Route>

                        <Route
                          path="*"
                          exact={true}
                          element={<Navigate to="/dashboard" />}
                        />
                      </Route>
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="signin" element={<Signin />} />
            <Route path="*" element={< Navigate to="/signin " />} />
          </Routes>

        )}
      </BrowserRouter>
    </div>
  );
}

export default App;





