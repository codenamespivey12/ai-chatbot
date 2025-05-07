import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/hooks/useAuthStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ShadCN Avatar

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void; // To allow closing from within sidebar (e.g. on mobile)
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { isLoggedIn, user, logout, login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, this would open a login modal/page
    // For now, we'll simulate a login
    const mockEmail = prompt("Enter your email to 'log in':", "jake@example.com");
    if (mockEmail) {
      login(mockEmail);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to home on logout
  };

  const sidebarVariants = {
    open: {
      x: 0,
      width: '280px', // Wider sidebar
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    closed: {
      x: '-100%',
      width: '280px', // Keep width consistent for smoother animation calculation
      transition: { type: 'spring', stiffness: 100, damping: 20, delay: 0.1 },
    },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { opacity: 0, x: -20, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const navItemVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 20, opacity: 0 }
  };

  // A helper component for cleaner nav links
  const SidebarLink: React.FC<{
    to: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
  }> = ({ to, icon, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center p-3 space-x-3 rounded-md hover:bg-mojo-blue/20 dark:hover:bg-mojo-yellow/20 transition-colors group font-sans text-lg"
    >
      <span className="h-7 w-7 text-mojo-blue dark:text-mojo-yellow group-hover:scale-110 transition-transform">{icon}</span>
      <span className="group-hover:text-mojo-blue dark:group-hover:text-mojo-yellow">{children}</span>
    </Link>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            key="sidebar"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed md:relative z-40 h-full bg-comic-panel dark:bg-gray-800 text-comic-ink dark:text-gray-100 flex flex-col shadow-comic-strong border-r-4 border-comic-ink dark:border-mojo-yellow"
            style={{ width: '280px' }} // Ensure width is set for Framer Motion
          >
            <motion.div variants={itemVariants} className="p-5 flex flex-col h-full">
              {/* Mojo Branding / Mascot Area */}
              <motion.div variants={navItemVariants} className="mb-8 text-center">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <h2 className="font-heading text-5xl text-mojo-red dark:text-mojo-yellow">MOJO</h2>
                  <p className="text-xs font-sans text-mojo-blue dark:text-mojo-blue-light">
                    Your Chaotic Best Friend
                  </p>
                </Link>
              </motion.div>

              {/* Navigation Links */}
              <motion.nav variants={navItemVariants} className="flex-grow space-y-3">
                <SidebarLink icon={<HomeIcon />} to="/" onClick={() => setIsOpen(false)}>Home</SidebarLink>
                <SidebarLink icon={<ChatBubbleLeftEllipsisIcon />} to="/chat" onClick={() => setIsOpen(false)}>Chat with Mojo</SidebarLink>
                {isLoggedIn && (
                   <SidebarLink icon={<Cog6ToothIcon />} to="/profile" onClick={() => setIsOpen(false)}>Mojo Settings</SidebarLink>
                )}
              </motion.nav>

              {/* User Status / Login */}
              <motion.div variants={navItemVariants} className="mt-auto pt-4 border-t-2 border-comic-ink/50 dark:border-mojo-yellow/50">
                {isLoggedIn && user ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center p-2 space-x-3 rounded-md hover:bg-mojo-blue/20 dark:hover:bg-mojo-yellow/20 transition-colors group"
                    >
                      <Avatar className="h-10 w-10 comic-border-soft border-mojo-blue dark:border-mojo-yellow">
                        <AvatarImage src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${user.email}`} alt={user.email || 'User'} />
                        <AvatarFallback className="font-heading bg-mojo-yellow text-comic-ink">
                          {user.email ? user.email.substring(0, 2).toUpperCase() : '??'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-sans font-semibold text-sm group-hover:text-mojo-blue dark:group-hover:text-mojo-yellow">
                          {user.name || user.email}
                        </p>
                        <p className="text-xs text-comic-ink/70 dark:text-gray-400 group-hover:text-mojo-blue dark:group-hover:text-mojo-yellow">
                          View Profile & Settings
                        </p>
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-left font-heading text-mojo-red dark:text-mojo-red-light hover:bg-mojo-red/20 hover:text-mojo-red dark:hover:text-mojo-red-light comic-border-soft border-mojo-red"
                    >
                      <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleLogin}
                    className="w-full justify-start text-left font-heading text-mojo-blue dark:text-mojo-blue-light hover:bg-mojo-blue/20 hover:text-mojo-blue dark:hover:text-mojo-blue-light comic-border-soft border-mojo-blue"
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6 mr-2" />
                    Login / Sign Up
                  </Button>
                )}
              </motion.div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;