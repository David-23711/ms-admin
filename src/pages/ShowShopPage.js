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
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShop, fetchShopName } from '../actions/shop';
import AddPagination from './AddPagination';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
const ShowShopPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.shop.shopDatas);
  const count = useSelector((state) => state.shop.last_page);
  const { shopNames } = useSelector((state) => state.shop);
  const isLoading = useSelector((state) => state.shop.shopLoading);
  const navigate = useNavigate();
  const { page: id } = useParams();
  const [page, setPage] = useState(id ? id : 1);
  const [search, setSearch] = useState('');
  const changePage = () => {
    navigate(`/admin/showshop/paginate/${page}`);
    dispatch(fetchShop(page, search));
  };
  const searchShop = (searchName) => {
    if (searchName == '') {
      setPage(1);
    }
    dispatch(fetchShop('', searchName));
  };
  useEffect(() => {
    changePage();
    dispatch(fetchShopName());
  }, [page]);
  return (
    <div>
      <Container>
        <Card className={classes.shopCard}>
          <CardContent>
            <div className='flex flex-col md:flex-row justify-between'>
              <div>
                <Typography variant='h5' className={classes.searchBarTitle}>
                  Shops
                </Typography>
              </div>
              <div className={classes.linearprogress}>
                {isLoading && <LinearProgress />}
              </div>
              <div className='flex'>
                <Autocomplete
                  id='combo-box'
                  options={shopNames}
                  getOptionLabel={(option) => option.shop_name}
                  className={classes.searchBarShop}
                  style={{ width: '300px' }}
                  onChange={(e) => searchShop(e.target.textContent)}
                  renderOption={(option) => (
                    <>
                      <img
                        src={option.logo}
                        style={{ width: '30px', height: '30px' }}
                      />
                      <span style={{ marginLeft: '8px' }}>
                        {option.shop_name}
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
              </div>
            </div>
          </CardContent>
        </Card>
        <TableContainer className='bg-white'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Logo </TableCell>
                <TableCell>Shop Name </TableCell>
                <TableCell> Owner Name </TableCell>
                <TableCell> Products </TableCell>
                <TableCell> Orders </TableCell>
                <TableCell> Status </TableCell>
                <TableCell> Actions </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    <img
                      src={data.logo}
                      style={{ width: '40px', height: '40px' }}
                    />
                  </TableCell>
                  <TableCell>{data.shop_name}</TableCell>
                  <TableCell>{data.owner_name}</TableCell>
                  <TableCell>{data.products ? data.products : 0}</TableCell>
                  <TableCell>{data.orders ? data.orders : 0}</TableCell>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>
                    <Button>Action</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'end',
            marginTop: '7px',
            padding: '20px 0',
          }}
        >
          <AddPagination count={count} page={page} setPage={setPage} />
        </Box>
      </Container>
    </div>
  );
};

export default ShowShopPage;
