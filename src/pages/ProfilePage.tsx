import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuthStore';
import ProfileForm from '@/components/features/profile/ProfileForm';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn || !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto max-w-2xl p-4 md:p-8"
    >
      <div className="bg-comic-panel dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-comic-strong border-2 border-comic-ink dark:border-mojo-yellow">
        <div className="flex flex-col items-center mb-8 text-center">
          <UserCircleIcon className="h-24 w-24 text-mojo-blue dark:text-mojo-yellow mb-4" />
          <h1 className="text-4xl md:text-5xl font-heading text-mojo-red dark:text-mojo-red-light mb-2">
            MOJO'S DOSSIER ON YOU
          </h1>
          <p className="text-comic-ink dark:text-gray-300 font-sans">
            Spill the beans, pal. The more Mojo knows, the... <em className="text-mojo-purple dark:text-mojo-purple-light">funnier</em> things get.
            This info helps Mojo tailor the chaos (and occasionally, the help).
          </p>
          <p className="text-xs text-comic-ink/70 dark:text-gray-400 mt-1">
            (Your email: {user.email} - Can't change this here, chief.)
          </p>
        </div>
        <ProfileForm />
      </div>
    </motion.div>
  );
};

export default ProfilePage;