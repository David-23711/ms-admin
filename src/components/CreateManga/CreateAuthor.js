import React from 'react';
import { Grid, Typography, TextField, Card } from '@material-ui/core';
import useStyles from './styles';
const CreateAuthor = ({ register, errors }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={12} md={4}>
        <div className={classes.gridInner}>
          <Typography variant='subtitle1'>Author Name</Typography>
          <Typography variant='subtitle2'>
            Add author name from here
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <div className={classes.gridInner}>
          <Card style={{ width: '100%', paddingTop: 20 }}>
            <div>
              <label htmlFor='author' style={{ padding: '10px 30px' }}>
               Author
              </label>
              <TextField
                id='author'
                name='author'
                placeholder='Enter Author Name'
                style={{ padding: '10px 30px 30px 30px' }}
                fullWidth
                variant='outlined'
                {...register('author_name', {
                  required: 'Author Name is required',
                })}
                error={Boolean(errors.author_name)}
                helperText={errors.author_name?.message}
              />
            </div>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default CreateAuthor;
