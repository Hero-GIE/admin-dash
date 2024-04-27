import React, { useState, useEffect } from "react";
import { BsFillArchiveFill, BsPeopleFill } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import "./Homie.scss";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import { Skeleton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const Homie = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    //simulating data fetching with setTimeout
    setTimeout(() => {
      setData([
        {
          name: "Page A",
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: "Page B",
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: "Page C",
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: "Page D",
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
      ]);
      setLoading(false);
    }, 3000); //simulated delay of 2 seconds
  }, []);

  return (
    <main className="main-container">
      <div className="bread">
        <Breadcrumbs>
          <Link
            to="/dashboard"
            style={{ marginBottom: "6px", color: "black", fontSize: 14 }}
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
        </Breadcrumbs>
      </div>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            {loading ? (
              <Skeleton variant="circular" width={30} height={60} />
            ) : (
              <BsFillArchiveFill className="card_icon" />
            )}
          </div>
          {loading ? <Skeleton variant="text" /> : <h1>300</h1>}
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ORDERS</h3>
            {loading ? (
              <Skeleton variant="circular" width={30} height={60} />
            ) : (
              <FaShoppingCart className="card_icon" />
            )}
          </div>
          {loading ? <Skeleton variant="text" /> : <h1>120</h1>}
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            {loading ? (
              <Skeleton variant="circular" width={30} height={60} />
            ) : (
              <BsPeopleFill className="card_icon" />
            )}
          </div>
          {loading ? <Skeleton variant="text" /> : <h1>330</h1>}
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>SHOPS</h3>
            {loading ? (
              <Skeleton variant="circular" width={30} height={60} />
            ) : (
              <FaStore className="card_icon" />
            )}
          </div>
          {loading ? <Skeleton variant="text" /> : <h1>420</h1>}
        </div>
      </div>

      <div className="charts">
        {loading ? (
          <>
            <Skeleton
              variant="rectangular"
              width="90%"
              height={200}
              style={{ marginLeft: "65px" }}
            />
            <Skeleton
              variant="circular"
              width="80%"
              height={220}
              style={{ marginLeft: "85px" }}
            />
          </>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%" style={{ marginTop: "-20px" }}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="pv"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                 
                />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </main>
  );
};

export default Homie;
