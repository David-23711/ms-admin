import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '260px',
    },
  },
  drawerWidth: {
    width: '250px',
    // background:'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(0,0,244,0.2780462526807598) 35%, rgba(0,212,255,1) 100%)'
  },
  brand: {
    display: 'flex',
    flex: 1,
  },
  logo: {
    display: 'flex',
    padding: '50px',
    borderBottom: '1px solid #f8a49b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    color: '#dc1507',
    backgroundColor: 'white',
  },
  noactive: {
    color: 'black',
   
  },
  avatar: {
    width: '100px',
    height: '100px',
  },
}));
