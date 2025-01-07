import { HomePage } from '@/pages/home';
import { VendingMachinesPage } from '@/pages/vending-machines';
import { VendingMachinesDetailPage } from '@/pages/vending-machines/[id]';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vending-machines" element={<VendingMachinesPage />} />
      <Route path="/vending-machines/:id" element={<VendingMachinesDetailPage />} />
    </Routes>
  </BrowserRouter>
);
