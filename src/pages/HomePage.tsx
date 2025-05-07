import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-6xl font-heading text-mojo-blue mb-4 animate-bounce">MOJO</h1>
      <h2 className="text-3xl font-heading text-mojo-red mb-8">IS IN THE HOUSE!</h2>
      <p className="text-comic-ink mb-6 max-w-md">
        Welcome to sixtyoneeighty featuring Mojo, your new chaotic best friend and wise-cracking AI sidekick.
        Ready to cause some delightful mayhem?
      </p>
      <Link
        to="/chat"
        className="px-8 py-3 font-heading text-2xl bg-mojo-yellow text-comic-ink comic-border hover:bg-mojo-yellow-light transition-all duration-200 transform hover:scale-105"
      >
        LET'S GO!
      </Link>
    </div>
  );
};

export default HomePage;