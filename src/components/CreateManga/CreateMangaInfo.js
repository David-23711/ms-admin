import React from 'react';
import { Grid, Typography, TextField, Card, Select, InputLabel } from '@material-ui/core';
import useStyles from './styles';
import { useFetchGenreQuery } from '../../features/genreSlice';
const CreateMangaInfo = ({ register, errors }) => {
  const classes = useStyles();
  const {data,isFetching,isError,error}=useFetchGenreQuery();
  if(isError) console.log(error);
  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item xs={12} md={4}>
        <div className={classes.gridInner}>
          <Typography variant='subtitle1'>Manga Information</Typography>
          <Typography variant='subtitle2'>
            Add manga information from here
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <div className={classes.gridInner}>
          <Card style={{ width: '100%', paddingTop: 20 }}>
            <div>
              <label htmlFor='manga' style={{ padding: '10px 30px' }}>
               Manga Name
              </label>
              <TextField
                id='manga'
                name='manga'
                placeholder='Enter Manga Name'
                style={{ padding: '10px 30px 30px 30px' }}
                fullWidth
                variant='outlined'
                {...register('manga_name', {
                  required: 'Manga Name is required',
                })}
                error={Boolean(errors.manga_name)}
                helperText={errors.manga_name?.message}
              />
            </div>
            <div>
              <label htmlFor='name' style={{ padding: '10px 30px' }}>
                Select Genre
              </label>
              <div className={classes.input}>
                <Select native variant='outlined' fullWidth
                  {...register('genre_id')}
                >
                  <option value="">Choose One</option>
                  {
                    data?.data.map((item)=>(
                      <option value={item.id} key={item.id}>{item.name}</option>
                    ))
                  }
                </Select>
              </div>
            </div>
            <div>
              <label htmlFor='date' style={{ padding: '10px 30px' }}>
               Release Date
              </label>
              <TextField
                id='date'
                name='date'
                placeholder='Enter Release Date '
                style={{ padding: '10px 30px 30px 30px' }}
                fullWidth
                variant='outlined'
                {...register('release_date', {
                  required: 'release_date is required',
                })}
                error={Boolean(errors.release_date)}
                helperText={errors.release_date?.message}
              />
            </div>
            <div>
              <label htmlFor='description' style={{ padding: '10px 30px' }}>
               Description
              </label>
              <TextField
                id='description'
                name='description'
                placeholder='Enter Description'
                style={{ padding: '10px 30px 30px 30px' }}
                fullWidth
                multiline
                minRows={6}
                variant='outlined'
                {...register('description', {
                  required: 'Description is required',
                })}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
            </div>
           
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default CreateMangaInfo;
