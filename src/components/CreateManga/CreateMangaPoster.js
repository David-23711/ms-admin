import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';

const CreateMangaPoster = ({ showImage }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={12} md={4}>
        <div className={classes.gridInner}>
          <Typography variant='subtitle1'>Poster</Typography>
          <Typography variant='subtitle2'>
            Upload your manga poster from here
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className={classes.gridInner}>
          <FileBase
            multiple={false}
            type='file'
            id='setImage'
            name='poster'
            onDone={(e) => showImage(e, 'img')}
          />

          {/* <input type='file' onChange={(e) => showImage(e, 'img')} /> */}
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className={classes.gridInner}>
        <div className={classes.coverImage}>
            <img
              src={require('../../images/nofound.png')}
              id='img'
              style={{ height: '250px' }}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CreateMangaPoster;
