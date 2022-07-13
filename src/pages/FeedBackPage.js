import {
  Avatar,
} from "@material-ui/core";
import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
const FeedBackPage = () => {
  const [datas,setDatas]=useState([]);
  const classes = useStyles();
  const getFeedback=async()=>{
      await axios.get('http://127.0.0.1:8000/api/user/gettingfeedback')
      .then((resp)=>{
         setDatas(resp.data);
      })
  }
  const formatName=(name)=>{
  return name.split(" ").map((resp)=>resp[0]).join(" ");
  }
  useEffect(()=>{
    getFeedback();
  },[])
  return (
    <div className={classes.cardContainer}>
      {
        datas.map((value,index)=>(
           <div key={index} className="card " style={{ width: 250 }}>
        <div className="card-body">
          <div className="row pb-3">
            <div className="col-4">
              <Avatar style={{background:'brown'}} >
               <span style={{fontSize:14}} >
               {
                  formatName(value.name)
                }
               </span>
              </Avatar>
            </div>
            <div className="col-8">
              <h6 className="margin-bottom: 0.1rem; margin-top: 0.3rem;">
                {value.name}
              </h6>
              <p className="font-size: 13px;">{moment(value.created_at).fromNow()}</p>
            </div>
          </div>
          {value.description.replace(/\{{(.*?)\}}/,'')}
        </div>
      </div>
        ))
      }
      <div style={{ width: 250, visibility: "hidden" }} />
      <div style={{ width: 250, visibility: "hidden" }} />
      <div style={{ width: 250, visibility: "hidden" }} />
      <div style={{ width: 250, visibility: "hidden" }} />
    </div>
  );
};

export default FeedBackPage;
