import React from 'react' ;
import { ArrowPathIcon } from '@heroicons/react/24/solid'; // Or Lucide equivalent

interface  PageLoaderProps {
  message?: string ;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = "Loading..." }) =>  {
  return  (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-comic-bg">
      <ArrowPathIcon className="h-16 w-16 text-mojo-blue animate-spin mb-4" />
      <p className="text-xl font-heading text-mojo-red">{message}</p>
    </div>
  );
};

export default PageLoader;