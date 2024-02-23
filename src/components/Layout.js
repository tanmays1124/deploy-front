// Layout.js

import React from 'react';
import Navbar from './Navbar';
import { FitScreen } from '@mui/icons-material';

const Layout = ({ children, open }) => {
  const contentStyle = {
    marginLeft: open ? 240 : 0,
    padding: '20px',
    flexGrow: 1,
    transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms', // Add transition
    width: FitScreen,
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default Layout;