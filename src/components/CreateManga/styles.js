import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  grid: {
    borderBottom: '1px solid gray',
    borderStyle: 'dashed !important',
  },
  gridInner: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  logoImage: {
    width: '100px',
    height: '100px',
  },
  coverImage: {
    height: '250px',
    width: '400px',
  },
  logoFile: {
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    border: '1px solid gray',
    borderRadius: '10px',
    borderStyle: 'dashed',
  },
  input: {
    margin: '10px 30px 30px 30px',
    padding: '0 !important',
  },
}));
