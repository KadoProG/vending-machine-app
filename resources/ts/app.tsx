import '@/index.scss';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { Router } from '@/Router';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
