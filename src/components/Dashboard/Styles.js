import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  card: {
    width: '250px',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'left',
    },
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
