import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/router'; // Assuming AppRoutes is in src/app/router/index.tsx
import { Toaster } from '@/components/ui/toaster'; // For notifications, good practice
import { TooltipProvider } from '@/components/ui/tooltip'; // For tooltips, good practice

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TooltipProvider>
        {/* Main application routes */}
        <AppRoutes />
        {/* Toaster for notifications */}
        <Toaster />
      </TooltipProvider>
    </BrowserRouter>
  );
};

export default App;