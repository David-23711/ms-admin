import {
  Box,
  Button,
  ButtonGroup,
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useFetchGenreQuery } from "../features/genreSlice";
import { useDeleteMangaMutation, useFetchMangaForSearchQuery, useFetchMangaQuery } from "../features/mangaSlice";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddPagination from "./AddPagination";
import { useNavigate, useParams } from "react-router-dom";
import { mangaSlice } from "../features/mangaSlice";
import { Autocomplete } from "@material-ui/lab";
import useStyles from './styles'
const ShowMangaPage = () => {
  // const { data, isFetching, isError, error } = useFetchMangaQuery();
  const classes=useStyles();
  const [trigger, { data, isFetching, isError, error }] =
    mangaSlice.endpoints.fetchManga.useLazyQuery();
  // const {data:searchData}=useFetchMangaForSearchQuery();
  const [fetching=trigger,{data:searchData}]=mangaSlice.endpoints.fetchMangaForSearch.useLazyQuery();
  const [deleteManga,{isLoading}]=useDeleteMangaMutation();
  if (isError) console.log(error);
  const { data: genreData } = useFetchGenreQuery();
  const getGenreById = (id) => {
    return genreData?.data?.find((item) => item.id == id)?.name;
  };
  const navigate = useNavigate();
  const count = data?.last_page;
  const { page: id } = useParams();
  const [page, setPage] = useState(id ? id : 1);
  const changePage = () => {
    navigate(`/admin/manga/paginate/${page}`);
    trigger({page});
  };
  const deleting=(id,image)=>{
    deleteManga({id,image})
    fetching();
  }
  const searchByName=(searchName)=>{
    if(!searchName){
      trigger({page})
    }
    trigger({page,searchName})
  }
  useEffect(() => {
    changePage();
    fetching();
  }, [page]);
  return (
    <div>
      <Container>
        <TableContainer style={{maxHeight:600}} className={`bg-white rounded-md mt-5  shadow-lg drop-shadow-lg ${classes.tableContainer}`}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
              <TableCell colSpan={3} style={{height:100}}>
              <Autocomplete
                  id='combo-box'
                  options={searchData?.data ? searchData?.data: []}
                  getOptionLabel={(option) => option.name}
                  style={{ width: '350px' }}
                  onChange={(e,value) => searchByName(value?.name)}
                  renderOption={(option) => (
                    <>
                      <img
                        src={option.thumbnail_path}
                        style={{ width: '60px', height: '80px',borderRadius:12 }}
                      />
                      <span style={{ marginLeft: '8px' }}>
                        {option.name}
                      </span>
                    </>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      placeholder='Search Shop'
                    />
                  )}
                />
              </TableCell>
              <TableCell colSpan={5} style={{ textAlign: "center",height:50 }}>
              { isFetching  && (
                  <LinearProgress color="secondary" size="10px" />
                )}
                {(
                  isLoading && (
                    <LinearProgress color="secondary" size="10px" />
                  )
                )}
              </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Poster</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Author Name</TableCell>
                <TableCell>Release Date</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
              {data?.data.map(
                (item) =>
                  item.publish_status == 1 && (
                    <TableRow
                      hover
                      key={item.id}
                      
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell style={{cursor:"pointer"}} onClick={() => navigate(`/admin/manga/detail/${item.id}`)}>
                        <img
                          src={item.thumbnail_path}
                          style={{ width: 80, height: 120, borderRadius: 12 }}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.author_name}</TableCell>
                      <TableCell>{item.release_date}</TableCell>
                      <TableCell>{getGenreById(item.genre_id)}</TableCell>
                      <TableCell>
                        <ButtonGroup
                          disableElevation
                          variant="outlined"
                          color="secondary"
                          size="small"
                        >
                          <Button onClick={() => navigate(`/admin/createmanga/${item.id}`)}>
                            <EditIcon />
                          </Button>
                          <Button onClick={() => deleting(item.id,item.thumbnail)}>
                            <DeleteIcon />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "7px",
            padding: "20px 0",
          }}
        >
          <AddPagination count={count} page={page} setPage={setPage} />
        </Box>
      </Container>
    </div>
  );
};

export default ShowMangaPage;
