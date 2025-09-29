'use client';

import { useState } from 'react';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import styles from './LayoutClient.module.css';
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuthStore';
import { logout } from '@/lib/clientApi';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebarOn = ['/auth/login', '/auth/register', '/profile/edit'];
  const shouldHideSidebar = hideSidebarOn.includes(pathname);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const router = useRouter();

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/auth/login');
  };

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <div className={styles.layoutContainer}>
        {!shouldHideSidebar && (
          <SideBar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onLogout={() => setShowLogoutModal(true)}
          />
        )}
        <main className={styles.mainContent}>
          <Breadcrumbs />
          {showLogoutModal && (
            <ConfirmationModal
              onConfirm={handleLogout}
              onCancel={() => setShowLogoutModal(false)}
              title="Ви впевнені, що хочете вийти?"
            />
          )}
          {children}
        </main>
      </div>
    </>
  );
}
