import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ip from "../ipaddr.js";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useState } from "react";





const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  opacity: 1.0,
  width: "100%",
  color: "#FFFFFF",
  ...theme.mixins.toolbar,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#000000",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const MenuText = styled("span")({
  color: "#fff",
  fontSize: "15px", // You can adjust the font size as needed
  fontWeight: "bold",
});



const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState("");
  

  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch(`http://${ip}:8000/api/logout/`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Cookies.remove("jwt");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("csrf_token");
        console.log("Logout successful:", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  // const handleItemClick = (item) => {
  //   setSelectedItem(item.text);
  //   navigate(item.path);
  //   setTimeout(() => {
  //     setSelectedItem(""); // Reset selected item after a short delay
  //   }, );
  // };

  const menuItems = [
    {icon: <HomeIcon style={{ color: "#fff" }} />, text: "Home", path: "/home" },
    { icon: <DashboardIcon style={{ color: "#fff" }} />, text: "Dashboard", path: "/Dashboard" },
    { icon: <HistoryIcon style={{ color: "#fff" }} />, text: "History", path: "/History" },
    { icon: <LeaderboardIcon style={{ color: "#fff" }} />, text: "Leaderboard", path: "/leaderboard" },
    { icon: <PersonIcon style={{ color: "#fff" }} />, text: "Profile", path: "/Profile" },
  ];

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start">
          <EmojiObjectsIcon />
        </IconButton>
        <h1 style={{ color: "#FFFFFF", marginLeft: "10px", cursor: "pointer" }}>
          Quizviz
        </h1>
        <List sx={{ display: "flex", gap: 3, marginLeft: "auto" }}>
        {menuItems.map((item) => (
  <ListItem
    key={item.text}
    disablePadding
    onClick={() => {
      setSelectedItem(item.text);
      navigate(item.path);
    }}
    // Apply a different style to the selected item
    sx={{
      backgroundColor: selectedItem === item.text ? "#000" : "transparent",
      borderRadius: selectedItem === item.text ? "28px" : "0px", // Update borderRadius here
    }}
  >
    <ListItemButton>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={<MenuText>{item.text}</MenuText>} />
    </ListItemButton>
  </ListItem>
))}
<ListItem
  disablePadding
  onClick={handleLogout}
  sx={{
    backgroundColor: selectedItem === "Logout" ? "#000" : "transparent",
    borderRadius: selectedItem === "Logout" ? "28px" : "0px",
  }}
>
  <ListItemButton>
    <ListItemIcon>
      <ExitToAppIcon style={{ color: "#fff" }} />
    </ListItemIcon>
    <ListItemText primary={<MenuText>Logout</MenuText>} />
  </ListItemButton>
</ListItem>


        </List>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;