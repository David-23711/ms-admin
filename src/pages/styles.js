import { FormHelperText, makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  topbarWidth: theme.mixins.toolbar,
  dashboard: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  main: {
    width: '100%',
    overflow: 'hidden',
  },
  chart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    width: '1020px',
    maxHeight: '600px',
  },
  grid: {
    borderBottom: '1px solid gray',
    borderStyle: 'dashed !important',
  },
  gridInner: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
  logoImage: {
    width: '100px',
    height: '100px',
  },
  coverImage: {
    height: '250px',
    width: '400px',
  },
  searchBarShop: {
    padding: '20px !important',
    width: 'auto',
  },
  searchBarTitle: {
    padding: theme.spacing(3),
    marginTop: '10px',
  },
  shopCard: {
    margin: '10px 0',
  },
  linearprogress: {
    width: '250px',
    marginTop: '50px',
    padding: '0 30px 30px 30px',
  },
  cardContainer:{
    display:'flex',
    flexWrap:'wrap',
    gap:'3rem',
    justifyContent:'space-around',
    marginTop:50,
    marginBottom:50,
    padding:"20px 35px",
  },
  tableContainer:{
    borderRadius:12,
    scrollbarWidth: "none",
    maxHeight: 440,
    "&::-webkit-scrollbar": {
      display: "none"
  }}
  
}));
