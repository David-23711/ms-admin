import { makeStyles } from "@material-ui/core";
export default makeStyles((theme)=>({
   gridContainer:{
    [theme.breakpoints.down('sm')]:{
        flexDirection:'column-reverse'
    }
   },
   listRoot:{
    width:'100%',
    maxHeight:'100%',
    overflow:'auto',
    borderRadius:12,
    backgroundColor:theme.palette.background.paper,
    padding:20
   }
}))