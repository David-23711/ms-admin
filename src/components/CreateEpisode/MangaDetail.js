import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Typography,
  Fade,
  Divider,
  Grow
} from "@material-ui/core";
import BackArrowIcon from "@material-ui/icons/ArrowBackIos";

import { useFetchByMangaIdQuery } from "../../features/mangaSlice";
import { useFetchGenreQuery } from "../../features/genreSlice";
import { useNavigate } from "react-router-dom";
const MangaDetail = ({ mangaId }) => {
  const { data, isFetching, isError, error } = useFetchByMangaIdQuery(mangaId);
  const {data:genreData}=useFetchGenreQuery();
  if (isError) console.log(error);
  const getGenreById=(id)=>{
    return genreData?.data?.find((item)=>item.id==id)?.name
  }
  const navigate=useNavigate();
  return (
    <Card style={{ marginTop: 30 }} className="shadow-lg" >
      <CardHeader
        avatar={
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            color="primary"
          >
            <BackArrowIcon />
            Back
          </Button>
        }
        action={isFetching && <CircularProgress color="primary" size={30} />}
      />
      <Divider/>
      <CardContent>
        {data && (
          <Grid container spacing={3} alignItems="center" justifyContent="center" >
            <Grid item xs={12} sm={12} md={6} lg={3} align="center" >
             <Grow in={true} {...{timeout:1000}}>
             <img
                src={data[0]?.thumbnail_path}
                className="rounded-md drop-shadow-lg shadow-lg"
                style={{ width: 200, height: 300 }}
              />
             </Grow>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} >
            <Grow in={true} {...{timeout:1500}} >
            <TableContainer className="bg-white rounded-sm drop-shadow-sm shadow-sm" >
                  <Table>
                    <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>{data[0]?.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manga Name</TableCell>
                      <TableCell>{data[0]?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Author Name</TableCell>
                      <TableCell>{data[0]?.author_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Release Date</TableCell>
                      <TableCell>{data[0]?.release_date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Genre</TableCell>
                      <TableCell>{getGenreById(data[0]?.genre_id)}</TableCell>
                    </TableRow>
                    </TableHead>
                  </Table>
             </TableContainer>
            </Grow>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} align="center">
           <Grow in={true} {...{timeout:2000}}>
           <Card style={{height:300}} >
              <Typography>
                Description
              </Typography>
              <p style={{padding:10,textAlign:'start'}} >{data[0]?.description}</p>
            </Card></Grow>
            </Grid>
          </Grid>
        )}
      </CardContent>
     
    </Card>
  );
};

export default MangaDetail;
