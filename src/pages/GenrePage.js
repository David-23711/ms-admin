import React, { useEffect, useState } from "react";
import { Container, duration, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import CreateGenre from "../components/CreateGenre/CreateGenre";
import ShowGenre from "../components/CreateGenre/ShowGenre";

import { useForm } from "react-hook-form";

const GenrePage = () => {
  const classes = useStyles();
 
    const {
      register,
      handleSubmit,
      reset: handleReset,
      formState: { errors },
    } = useForm({
      defaultValues: { genre: "" },
    });

  const [isEdit,setIsEdit]=useState(false);
  const [genreId,setGenreId]=useState('');

  const clickEdit=(data)=>{
    handleReset({genre:data.name})
    setIsEdit(!isEdit);
    setGenreId(data.id);
  }
  return (
    <Container>
      <Grid container spacing={3} className={classes.grid}>
        {/* <Grid item xs={12} md={12}>
          <div className={classes.gridInner}>
            <Typography variant="h5">Genres</Typography>
          </div>
        </Grid> */}
        <Grid item xs={12} md={6}>
         <div className={classes.gridInner}>
         <CreateGenre
         handleSubmit={handleSubmit}
         errors={errors}
         handleReset={handleReset}
         register={register}
            genreId={genreId}
            isEdit={isEdit}
            setIsEdit={()=>setIsEdit(false)}
          />
         </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.gridInner}>
          <ShowGenre clickEdit={clickEdit}  />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GenrePage;
