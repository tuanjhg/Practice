import React from 'react';

const Header = () => {
  return (
    <header className="bg-purple-700 text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Truemove</div>
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Blogs</a>
          <a href="#" className="hover:text-gray-300">About Us</a>
        </nav>
        <a href="#" className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg">
          Contact Us
        </a>
      </div>
    </header>
  );
};

export default Header;