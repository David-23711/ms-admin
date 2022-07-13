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
import React, { useState, useEffect } from 'react';
import BasicInfo from '../components/CreateShop/BasicInfo';
import CreateCoverImage from '../components/CreateShop/CreateCoverImage';
import CreateLogo from '../components/CreateShop/CreateLogo';
import PaymentInfo from '../components/CreateShop/PaymentInfo';
import ShopAddress from '../components/CreateShop/ShopAddress';
import ShopSetting from '../components/CreateShop/ShopSetting';
import useStyles from './styles';
import { useForm } from 'react-hook-form';
import { createShop } from '../actions/shop';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
const CreateShopPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.shop.shopLoading);
  const { logoError } = useSelector((state) => state.shop);
  const { coverError } = useSelector((state) => state.shop);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [shopData, setShopData] = useState({
    logo: '',
    cover_image: '',
  });
  const onSubmit = (data) => {
    // let formData = { ...data, ...shopData };
    let formData = new FormData();
    formData.append('logo', shopData.logo);
    formData.append('cover_image', shopData.cover_image);
    formData.append('shop_name', data.shop_name);
    formData.append('owner_name', data.owner_name);
    formData.append('description', data.description);
    formData.append('account_holder_name', data.account_holder_name);
    formData.append('account_holder_email', data.account_holder_email);
    formData.append('bank_name', data.bank_name);
    formData.append('account_number', data.account_number);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('state', data.state);
    formData.append('address', data.address);
    formData.append('phone', data.phone);
    formData.append('website', data.website);
    dispatch(createShop(formData, navigate));
  };
  const showImage = (e, idName) => {
    // const fileSize = e.base64.length * (3 / 4) - 2;
    // if (fileSize > 700000) {
    //   alert('Image size should be 1mb and down');
    // } else {
    if (idName == 'img') {
      setShopData({ ...shopData, logo: e.file });
    } else if (idName == 'cimg') {
      setShopData({ ...shopData, cover_image: e.file });
    }
    let img = document.getElementById(idName);
    img.src = e.base64;
    // }
  };
  useEffect(() => {
    if (isLoading == false) {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }
    if (logoError != '') {
      alert(logoError);
    } else if (coverError != '') {
      alert(coverError);
    }
  }, [isLoading, logoError, coverError]);
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          {/* for title */}
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} md={12}>
              <div className={classes.gridInner}>
                <Typography variant='h5'>Create Shop</Typography>
              </div>
            </Grid>
          </Grid>
          {/* for logoImage */}
          <CreateLogo
            showImage={showImage}
            register={register}
            errors={errors}
            watch={watch}
          />
          {/* for cover_image */}
          <CreateCoverImage
            showImage={showImage}
            register={register}
            errors={errors}
          />
          {/* for basic info */}
          <BasicInfo register={register} errors={errors} />
          {/* for payment info */}
          <PaymentInfo register={register} errors={errors} />
          {/* for shop address */}
          <ShopAddress register={register} errors={errors} />
          {/* for shop settings */}
          <ShopSetting register={register} errors={errors} />
          {/* for save button */}
          <Box className='flex justify-end py-10'>
            <Button
              color='primary'
              variant='contained'
              type='submit'
              startIcon={
                isLoading ? (
                  <CircularProgress color='secondary' size='20px' />
                ) : (
                  <SaveIcon />
                )
              }
            >
              Save
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default CreateShopPage;

//     $data->logo = $logo;
//     $data->cover_image = $cover_image;
//     $data->shop_name = $shop->shop_name;
//     $data->owner_name = $shop->owner_name;
//     $data->status = "Active";
//     $data->description = $shop->description;
//     $data->account_holder_name = $shop->account_holder_name;
//     $data->account_holder_email = $shop->account_holder_email;
//     $data->bank_name = $shop->bank_name;
//     $data->account_number = $shop->account_number;
//     $data->country = $shop->country;
//     $data->city = $shop->city;
//     $data->state = $shop->state;
//     $data->address = $shop->address;
//     $data->phone = $shop->phone;
//     $data->website = $shop->website;
