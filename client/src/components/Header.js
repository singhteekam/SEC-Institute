import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "#aboutsec" },
  { label: "Contact Us", path: "/contact" },
  { label: "STUDENT VERIFICATION", path: "/studentverify" },
  { label: "COURSES", path: "/courses" },
  { label: "ONLINE LEARNING", path: "/online-learning" },
  { label: "OUR BRANCHES", path: "/branches" },
  { label: "CERTIFICATE", path: "/certificate" }
  // { label: "STUDENT REGISTRATION", path: "/registerstudent" },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const token = localStorage.getItem("token");

  console.log("Token:", token);
  console.log("User Details:", localStorage.getItem("user"));

  const navigate = useNavigate();

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User:", user);
    setIsLoggedIn(!!user);
    if (user) {
      setUserDetails(user);
    }
  }, [isLoggedIn, token]);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    handleMenuClose();
    navigate("/");
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Box
          display="flex"
          justifyContent="center"
          py={2}
          flexDirection={isMobile ? "column" : "row"}
          sx={{ backgroundColor: "#fff" }}
        >
          <Box display="flex" alignItems="center">
            <img
              src={logo}
              alt="SECI Logo"
              style={{ height: 60, width: 70, marginRight: 10, marginLeft: 10 }}
            />
            <Box textAlign="center">
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.primary }}
              >
                SOMNATH EDUCATION & COMPUTER INSTITUTE
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.primary }}
              >
                WWW.SECINSTITUTE.IN
              </Typography>
            </Box>
          </Box>

          {isMobile && (
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{
                position: "absolute",
                right: 16,
                top: 50,
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        <Divider />

        {!isMobile ? (
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            py={1}
            sx={{ backgroundColor: theme.palette.primary.main }}
          >
            <Box display="flex" flexWrap="wrap">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={item.path.startsWith("#") ? "a" : Link}
                  {...(item.path.includes("#")
                    ? {
                        href: item.path.startsWith("/")
                          ? item.path
                          : `/${item.path}`,
                      }
                    : { to: item.path })}
                  color="inherit"
                  sx={{ mx: 0.5 }}
                >
                  {item.label}
                </Button>
              ))}
              {isLoggedIn && (
                <Button
                  component={Link}
                  to="/admin/registerstudent"
                  color="inherit"
                  sx={{ mx: 0.5 }}
                >
                  Student Registration
                </Button>
              )}
            </Box>

            {!isLoggedIn ? (
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/login"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  "&:hover": { borderColor: "#ccc" },
                }}
              >
                Login
              </Button>
            ) : (
              <>
                <Box>
                  <Button
                    onClick={handleMenuOpen}
                    sx={{
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: 500,
                    }}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Welcome,{" "}
                    {userDetails ? JSON.parse(userDetails).fullName : "User"}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{
                      "& .MuiMenu-paper": {
                        borderRadius: 2,
                        minWidth: 160,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/admin/dashboard");
                      }}
                    >
                      Admin Dashboard
                    </MenuItem>
                    {/* <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/admin/profile");
                    }}
                  >
                    Profile
                  </MenuItem> */}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Box>
        ) : (
          <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
            <Box
              sx={{
                width: 250,
                backgroundColor: theme.palette.primary.main,
                height: "100%",
              }}
              onClick={toggleDrawer}
            >
              <List>
                {navItems.map((item) => (
                  <ListItem
                    button
                    component={Link}
                    to={item.path}
                    key={item.label}
                  >
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "white" }}
                    />
                  </ListItem>
                ))}
                {!isLoggedIn ? (
                  <ListItem button component={Link} to="/login">
                    <ListItemText primary="Login" sx={{ color: "white" }} />
                  </ListItem>
                ) : (
                  <>
                    <ListItem
                      button
                      onClick={() => navigate("/admin/registerstudent")}
                    >
                      <ListItemText
                        primary="STUDENT REGISTRATION"
                        sx={{ color: "white" }}
                      />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="LOGOUT" sx={{ color: "white" }} />
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </Drawer>
        )}
      </AppBar>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.background.paper,
          textAlign: "right",
          px: 3,
          py: 1,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
      </Typography>
    </>
  );
}
