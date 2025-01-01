import { HomePage } from '@/pages/home';
import { VendingMachinePage } from '@/pages/vending-machine';
import { VendingMachinesPage } from '@/pages/vending-machines';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vending-machines" element={<VendingMachinesPage />} />
      <Route path="/vending-machine" element={<VendingMachinePage />} />
    </Routes>
  </BrowserRouter>
);
