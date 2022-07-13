import React, { useState } from 'react';
import Header from '../components/Header/Header';
import DrawerNavigation from '../components/Drawer/DrawerNavigation';
import { Box, CssBaseline } from '@material-ui/core';
import useStyles from './styles';
const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const funcSetMobile = () => {
    setIsMobile(!isMobile);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DrawerNavigation isMobile={isMobile} funcSetMobile={funcSetMobile} />
      <Header funcSetMobile={funcSetMobile} />
      <main className={classes.main}>
        <div className={classes.topbarWidth} />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
