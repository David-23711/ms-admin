import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#fff',
  },
  brand: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    display: 'flex',
    flex: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(25),
    },
  },
  fakeSpace: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flex: 1,
    },
  },
}));
