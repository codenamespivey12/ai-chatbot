import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, ChatPage, ProfilePage, NotFoundPage } from './lazy';
import PageLoader from '@/components/ui/PageLoader'; // A simple loading spinner

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader message="Loading Page..." />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;