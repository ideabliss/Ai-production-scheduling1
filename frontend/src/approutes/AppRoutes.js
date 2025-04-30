import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ResourceHub from '../pages/ResourceHub';
import SalesPulse from '../pages/SalesPulse';
import StockWatch from '../pages/StockWatch';
import FutureCast from '../pages/FutureCast';
import PlanCraft from '../pages/PlanCraft';
import SyncFlowPage from '../pages/SyncFlowPage';




const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/resource-hub" element={<ResourceHub />} />
      <Route path="/sales-pulse" element={<SalesPulse/>} />
      <Route path="/stockwatch" element={<StockWatch />} />
      <Route path="/futurecast" element={<FutureCast />} />
      <Route path="/plancraft" element={<PlanCraft />} /> 
      <Route path="/syncflow" element={<SyncFlowPage />} />

      


      

      
 
    </Routes>
  );
};

export default AppRoutes;
