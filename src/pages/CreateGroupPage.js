import React from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import useStyles from './styles';
import Description from '../components/CreateGroup/Description';
const CreateGroupPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <form encType='multipart/form-data'>
          {/* for title */}
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} md={12}>
              <div className={classes.gridInner}>
                <Typography variant='h5'>Create Group</Typography>
              </div>
            </Grid>
          </Grid>
          <Description />
          <Box className='flex justify-end py-10'>
            <Button
              color='primary'
              variant='contained'
              type='submit'
              //   startIcon={
              //     isLoading ? (
              //       <CircularProgress color='secondary' size='20px' />
              //     ) : (
              //       <SaveIcon />
              //     )
              //   }
            >
              Save
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default CreateGroupPage;
