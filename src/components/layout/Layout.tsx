import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true); // Start open on desktop

  // Close sidebar by default on smaller screens
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // md breakpoint
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="flex h-screen bg-comic-bg dark:bg-gray-800 text-comic-ink dark:text-gray-100 overflow-hidden">
      {/* Sidebar is now conditionally rendered and managed by AnimatePresence within itself */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-comic-bg dark:bg-gray-800 p-0 md:p-0 lg:p-0">
          {/* Removed padding here, ChatPage will handle its own padding if needed */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;