import React from 'react';
import { Link } from 'react-router-dom';
import { PiBooks } from 'react-icons/pi'; // Optional: book icon from react-icons

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-sky-800">
        <PiBooks className="text-3xl text-sky-700" />
        Book Manager
      </Link>

      <nav className="flex gap-4 text-sky-700 font-medium">
        <Link to="/" className='hover:underline'>Home</Link>
        <Link to="/books/create" className="hover:underline">Add Book</Link>
      </nav>
    </header>
  );
};

export default Header;
