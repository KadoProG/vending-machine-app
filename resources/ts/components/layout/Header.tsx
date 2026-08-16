import { Button } from '@/components/button/Button';
import styles from '@/components/layout/Header.module.scss';
import { useAuthUser } from '@/hooks/useAuthUser';
import { apiClient } from '@/lib/apiClient';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * 全ページ共通のヘッダー。
 *
 * ログイン情報を常に上部に表示する。
 */
export const Header: React.FC = () => {
  const { user, isLoading, mutate } = useAuthUser();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await apiClient.logout.$post();
    } finally {
      // ログアウト後はユーザー情報を破棄する
      await mutate();
    }
  };

  // ログイン後に元のページへ戻れるようにする
  const redirectTo = `${location.pathname}${location.search}`;

  // ログイン画面ではログインボタンを出さない
  const isLoginPage = location.pathname === '/login';

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        自販機アプリ
      </Link>

      <div className={styles.right}>
        {isLoading ? (
          <span className={styles.user_name}>読み込み中...</span>
        ) : user ? (
          <>
            <span className={styles.user_name}>{user.name} でログイン中</span>
            <Button onClick={handleLogout}>ログアウト</Button>
          </>
        ) : (
          !isLoginPage && (
            <Button href={`/login?redirect=${encodeURIComponent(redirectTo)}`}>ログイン</Button>
          )
        )}
      </div>
    </header>
  );
};
