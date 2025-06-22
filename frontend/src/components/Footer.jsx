import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()}  Book Manager. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
