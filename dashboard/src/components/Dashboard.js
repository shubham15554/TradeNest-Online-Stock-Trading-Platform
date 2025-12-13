import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import TopBar from "./TopBar";
import {GeneralContextProvider} from "./GeneralContext"
import {SellContextProvider} from "./SellContext";
const Dashboard = ({user}) => {
  return (

    <div className="dashboard-container">
     <SellContextProvider>
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      </SellContextProvider>
      
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          
          <Route path="/orders" element={<Orders user={user} />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={ <Funds/>} />
          <Route path="/apps" element={<Apps />} />
         
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
