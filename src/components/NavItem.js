import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ text, path, onClick }) => {
  return (
    <>
    
    <li className="nav-item">
    
      {onClick ? (
        <button onClick={onClick}>{text}</button>
      ) : (
        <Link class="items" to={path}>{text}</Link>
      )}
    </li>
    
    </>
  );
};

export default NavItem;