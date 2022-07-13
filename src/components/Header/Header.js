import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Hidden,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminLogin } from "../../features/authSlice";
const Header = ({ isMobile, funcSetMobile }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { value } = useSelector((state) => state.auths);
  const auths = value
    ? value
    : localStorage.getItem("auths") &&
      JSON.parse(localStorage.getItem("auths"));
  console.log(auths);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    navigate(path);
  };
  const handleLogout = () => {
    localStorage.removeItem("auths");
    dispatch(adminLogin(null));
  };
  return (
    <>
      <AppBar className={classes.appbar} elevation={1}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.fakeSpace} />
          <Box className={classes.brand}>
            <IconButton
              color="primary"
              edge="start"
              aria-label="menu"
              className="visible md:invisible"
              onClick={funcSetMobile}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              gutterBottom
              className="font-black text-blue-600 pt-2 pl-2"
            >
              MS
            </Typography>
            &nbsp;
            <Typography
              variant="h5"
              gutterBottom
              color="secondary"
              className="pt-2"
            >
              Manga
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
            onClick={() => navigate("/admin/createManga")}
          >
            Create Manga
          </Button>
          &nbsp;
          <Avatar
            style={{ background: "brown" }}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {auths && (
              <span style={{ fontSize: 14 }}>
                {auths ? auths?.name?.split(" ").map((item) => item[0]) : null}
              </span>
            )}
          </Avatar>
          {auths ? (
            <Menu
              id="user"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Menu>
          ) : (
            <Menu
              id="nouser"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose("/admin/login")}>
                Login
              </MenuItem>
              <MenuItem onClick={() => handleClose("/admin/register")}>
                Register
              </MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
      uIte
    </>
  );
};

export default Header;
