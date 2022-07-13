import React, { useState } from "react";
import MailIcon from "@material-ui/icons/Mail";
import LockIcon from "@material-ui/icons/Lock";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useForm } from "react-hook-form";
// import { useLoginMutation } from "../features/mangaSlice";
import { useDispatch } from "react-redux";
import { adminLogin } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
     email:"",
     password:"",
     role:'admin'
    },
  });
  const [showPassword,setShowPassword]=useState(false);
  const [authError,setAuthError]=useState(false);
  const [message,setMessage]=useState("")
  const baseUrl = "http://127.0.0.1:8000/api";
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleClickShowPassword=()=>{
    setShowPassword(!showPassword);
  }
  // const [login,{isError,error}]=useLoginMutation();
  // if(isError) console.log(error);
  const onSubmit=async(data)=>{
    await axios.post(`${baseUrl}/admin/msmanga/login`,data)
    .then((resp)=>{
       if(resp.data.error){
        setAuthError(true);
        setMessage(resp.data.error)
       }else{
        dispatch(adminLogin(resp.data.data))
        navigate('/admin/dashboard/paginate/1');
       }
    })
  } 
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItem: "center" }}
    >
      <section className=" my-5 py-10 px-12 rounded-lg w-1/3 bg-white">
        <h1 className="text-2xl font-bold text-primary text-center">Sign In</h1>
        <div className="flex w-full justify-center pt-4" >
          <img src={require('../images/pngegg.png')} alt="no" style={{width:150,height:150}} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="form-group mb-3">
            <label
             
              className="mb-2 mr-2 inline-block font-bold text-gray-700"
            >
              Email
            </label>
            <MailIcon className="mb-1" />
            {/* <input type="email" className="w-full bg-gray-200 py-2 pl-10" placeholder="Enter your email"/> */}
            <TextField
              variant="outlined"
              type="email"
              className="w-full py-2 pl-10"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </div>
          <div className="form-group mb-3">
            <label
             
              className="mb-2 mr-2 inline-block font-bold text-gray-700"
            >
              Password
            </label>
            <LockIcon className="mb-1" />
            {/* <input type="password" className="w-full bg-gray-200 py-2 pl-10" placeholder="Enter your password"/> */}
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                  </InputAdornment>
                ),
              }}

              variant="outlined"
              type={showPassword?'text':'password'}
              className="w-full py-2 pl-10"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
              })}
              error={Boolean(errors.password) || authError}
              helperText={errors.password?.message || message}
            />
          </div>
          <div className="form-group text-end">
            <button type="submit" className="text-black btn btn-success">
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
