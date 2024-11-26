import { HomePage } from '@/pages/home';
import { VendingMachinePage } from '@/pages/vending-machine';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vending-machine" element={<VendingMachinePage />} />
    </Routes>
  </BrowserRouter>
);
