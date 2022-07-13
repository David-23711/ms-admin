import React, { useEffect, useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Typography,
  Avatar,
  Button,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShopIcon from '@material-ui/icons/Shop';
import SquareIcon from '@material-ui/icons/CropSquare';
import SettingIcon from '@material-ui/icons/PermDataSetting';
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
const DrawerNavigation = ({ isMobile, funcSetMobile }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname.slice(0,12))
  const lists = [
    { title: 'Dashboard', to: '/admin/dashboard', icon: <DashboardIcon /> },
    { title: 'Feedbacks', to: '/admin/userfeedback', icon: <ShopIcon /> },
    { title: 'Manga', to: '/admin/manga', icon: <SquareIcon /> },
    { title: 'Genre', to: `/admin/genre`, icon: <SettingIcon /> },
    // { title: 'Groups', to: '/admin/creategroup', icon: <GroupIcon /> },
    // { title: 'Categories', to: '/categories', icon: <InventoryIcon /> },
  ];
  const drawer = (
    <div>
      {lists.map((list, i) => (
        <ListItem
          key={list.title}
          button
          onClick={() => navigate(list.to)}
          className={
            location.pathname.slice(0,12) == list.to.slice(0,12) || location.pathname == list.to ? classes.active : classes.noactive 
          }
          style={{ backgroundColor: 'transparent' }}
        >
          <ListItemIcon
            className={
              location.pathname.slice(0,12) == list.to.slice(0,12) || location.pathname == list.to ? classes.active : classes.noactive 
            }
          >
            {list.icon}
          </ListItemIcon>
          <ListItemText  primary={list.title} />
        </ListItem>
      ))}
    </div>
  );
  return (
    <div>
      <nav className={classes.drawer}>
        <Hidden xsDown implementation='css'>
          <Drawer
            variant='permanent'
            open
            classes={{ paper: classes.drawerWidth }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <div className={classes.logo}>
              <Typography
                variant='h5'
                gutterBottom
                className='font-black text-blue-600'
              >
                MS
              </Typography>
              &nbsp;
              <Typography variant='h5' gutterBottom color='secondary'>
                Manga
              </Typography>
            </div>
            {drawer}
          </Drawer>
          {location.pathname == '/admin/createshop' && (
            <Drawer
              variant='permanent'
              open
              classes={{ paper: classes.drawerWidth }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <div className={classes.logo}>
                <Avatar className={classes.avatar}></Avatar>
              </div>
              <div className='mx-auto text-center'>
                <Typography variant='h6'>Customer</Typography>
                <Typography variant='subtitle1'>ammgyi@gmail.com</Typography>
                <Typography variant='subtitle1'>09254973200</Typography>
                <Button
                  color='secondary'
                  onClick={() => navigate('/admin/showshop')}
                >
                  Go Back
                </Button>
              </div>
            </Drawer>
          )}
        </Hidden>
        <Drawer
          variant='temporary'
          open={isMobile}
          classes={{ paper: classes.drawerWidth }}
          onClick={funcSetMobile}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
        {location.pathname == '/admin/createshop' && (
          <Drawer
            variant='temporary'
            open={isMobile}
            classes={{ paper: classes.drawerWidth }}
            onClick={funcSetMobile}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <div className={classes.logo}>
              <Avatar className={classes.avatar}></Avatar>
            </div>
            <div className='mx-auto text-center'>
              <Typography variant='h6'>Customer</Typography>
              <Typography variant='subtitle1'>ammgyi@gmail.com</Typography>
              <Typography variant='subtitle1'>09254973200</Typography>
              <Button
                color='secondary'
                onClick={() => navigate('/admin/showshop')}
              >
                Go Back
              </Button>
            </div>
          </Drawer>
        )}
      </nav>
    </div>
  );
};

export default DrawerNavigation;
