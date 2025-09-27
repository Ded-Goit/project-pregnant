'use client';

import { useState } from 'react';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import styles from './LayoutClient.module.css';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const pathname = usePathname();
  //   const hideHeader = hiddenHeaderRoutes.includes(pathname);
  //   const hideFooter = hiddenFooterRoutes.includes(pathname);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* // {!hideHeader && <Header />}
      // <main>{children}</main>
      // {!hideFooter && <Footer />} */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <div className={styles.layoutContainer}>
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className={styles.mainContent}>
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </>
  );
}
