import React from 'react' ;
import { Link } from 'react-router-dom' ;

const  NotFoundPage: React.FC = () => {
  return  (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center" >
      <h1 className="text-8xl font-heading text-mojo-red mb-4">404 !</h1>
      <h2 className="text-4xl font-heading text-mojo-blue mb-8" >WHOOPSIE!</h2>
      <p className="text-comic-ink mb-6 max-w-md" >
        Looks like Mojo misplaced this  page. Or maybe it ran off to join the circus.
        Probably the circus.
      </p>
      <Link
        to="/"
        className="px-6 py-3 font-heading text-xl bg-mojo-yellow text-comic-ink comic-border hover:bg-mojo-yellow-light transition-all duration-200"
      >
        Back to Safety
      </Link>
    </div>
  );
};

export default NotFoundPage;