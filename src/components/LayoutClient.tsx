'use client';

import { useEffect, useState } from 'react';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import styles from './LayoutClient.module.css';
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';
import { usePathname } from 'next/navigation';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebarOn = ['/auth/login', '/auth/register', '/profile/edit'];
  const shouldHideSidebar = hideSidebarOn.includes(pathname);
  // // імітація зареєстрованого користувача
  // useEffect(() => {
  //   setUser({ name: 'Андрій' });
  // }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <div className={styles.layoutContainer}>
        {!shouldHideSidebar && (
          <SideBar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            // isAuthenticated={!!user}
            onLogout={() => setShowLogoutModal(true)}
          />
        )}
        <main className={styles.mainContent}>
          {showLogoutModal && <ConfirmationModal />}
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </>
  );
}
