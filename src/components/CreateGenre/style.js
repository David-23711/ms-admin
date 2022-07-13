import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  grid: {
    borderBottom: '1px solid gray',
    borderStyle: 'dashed !important',
  },
  gridInner: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  input: {
    margin: '10px 30px 30px 30px',
    padding: '0 !important',
  },
  cardAction:{
    justifyContent:'end'
  }
}));