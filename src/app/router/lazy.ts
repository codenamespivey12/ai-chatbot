import { lazy } from 'react';

export const HomePage = lazy(() => import('@/pages/HomePage'));
export const ChatPage = lazy(() => import('@/pages/ChatPage'));
export const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
export const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));