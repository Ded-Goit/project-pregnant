'use client';

import { useState } from 'react';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';

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
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main>
        <Breadcrumbs />
        {children}
      </main>
    </>
  );
}
