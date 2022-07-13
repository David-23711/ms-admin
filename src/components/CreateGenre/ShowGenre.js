import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  InputAdornment,
  TextField,
  Typography,
  CardContent,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Box,
  LinearProgress,
  ButtonGroup,
  Fade,
  Collapse,
  Slide,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import AddPagination from "../../pages/AddPagination";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDeleteGenreMutation,genreSlice } from "../../features/genreSlice";

const ShowGenre = ({ clickEdit }) => {
  const [trigger, { data, isLoading, isFetching, isError, error }] =
    genreSlice.endpoints.fetchGenre.useLazyQuery();
  if (isError) console.log(error);
  const count = data?.last_page;
  const navigate = useNavigate();
  const { page: id } = useParams();
  const [page, setPage] = useState(id ? id : 1);
  
  const changePage = () => {
    navigate(`/admin/genre/paginate/${page}`);
    trigger(page);
    
  };
  const [
    deleteGenre,
    {
      data: deleteMessage,
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      isError: isDeleteError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteGenreMutation();
  const clickDelete = (id) => {
  
    deleteGenre(id);
  };
  if (isDeleteError) console.log(deleteError);
  useEffect(() => {
    changePage();
  }, [page]);

  return (
    <div>
      <TableContainer className="bg-white rounded-md drop-shadow-lg shadow-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} style={{ textAlign: "center",height:50 }}>
                {deleteLoading || isFetching && (
                  <LinearProgress color="secondary" size="10px" />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell> Genre </TableCell>
              <TableCell style={{ textAlign: "end" }}> Actions </TableCell>
            </TableRow>
          </TableHead>
         <TableBody>
            {data?.data.map((item) => (
             <Fade in key={item.id} >
               <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell style={{ textAlign: "end" }}>
                  <ButtonGroup
                    disableElevation
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    <Button onClick={() => clickEdit(item)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => clickDelete(item.id)}>
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
             </Fade>
            ))}
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
    </div>
  );
};

export default ShowGenre;
