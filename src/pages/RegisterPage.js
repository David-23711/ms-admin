import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useForm } from "react-hook-form";
// import { useRegisterAdminMutation } from "../features/mangaSlice";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "admin",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const baseUrl = "http://127.0.0.1:8000/api";
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowCpassword = () => {
    setShowCpassword(!showCpassword);
  };
  const onSubmit = async (data) => {
    if (data.password != data.confirmPassword) {
      setIsError(true);
      setMessage("Confirm Password Not Match!");
    } else {
      setIsError(false);
      setMessage("");
      await axios.post(`${baseUrl}/msmanga/register`,data)
      .then((resp)=>{
        navigate('/admin/login')
      })
      .catch((err)=>{
        setMessage(err.response.data.error.email[0])
      })
      
    }
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItem: "center" }}
    >
      <section className=" my-5 py-10 px-12 rounded-lg w-1/2 bg-white">
        <h1 className="text-2xl font-bold text-primary text-center">
          Register Form
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="form-group mb-3">
            <label
              htmlFor=""
              className="mb-2 mr-2 inline-block font-bold text-gray-700"
            >
              Name
            </label>

            <TextField
              variant="outlined"
              type="text"
              className="w-full py-2 pl-10"
              placeholder="Enter your Name"
              {...register("name", {
                required: "Name is required",
              })}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          </div>
          <div className="form-group mb-3">
            <label
              htmlFor=""
              className="mb-2 mr-2 inline-block font-bold text-gray-700"
            >
              Email
            </label>
            <TextField
              variant="outlined"
              type="email"
              className="w-full py-2 pl-10"
              placeholder="Enter your Email"
              {...register("email", {
                required: "Email is required",
              })}
              error={Boolean(errors.email) || Boolean(message)}
              helperText={errors.email?.message || message}
            />
          </div>
          <div className="form-group mb-3">
            <label
              htmlFor=""
              className="mb-2 mr-2 inline-block font-bold text-gray-700"
            >
              Phone
            </label>
            <TextField
              variant="outlined"
              type="text"
              className="w-full py-2 pl-10"
              placeholder="Enter your Phone"
              {...register("phone", {
                required: "Phone is required",
              })}
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
          </div>
          <div className="form-group mb-3">
            <label
              htmlFor=""
              className="mb-2 mr-2 inline-block font-bold text-gray-700"
            >
              Password
            </label>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              className="w-full py-2 pl-10"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </div>
          <div className="form-group mb-3">
            <label
              htmlFor=""
              className="mb-2 mr-2 inline-block font-bold text-gray-700"
            >
              Confirm Password
            </label>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCpassword}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      {showCpassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Enter Confirm Password"
              variant="outlined"
              type={showCpassword ? "text" : "password"}
              className="w-full py-2 pl-10"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              error={Boolean(errors.confirmPassword) }
              helperText={errors.confirmPassword?.message}
            />
          </div>
          <div className="form-group text-end">
            <button type="submit" className="text-black btn btn-success">
              Register
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
