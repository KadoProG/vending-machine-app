import { Header } from '@/components/layout/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 全ページ共通のレイアウト。
 */
export const Layout: React.FC = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);
