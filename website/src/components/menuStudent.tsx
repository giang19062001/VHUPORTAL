import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PaidIcon from "@mui/icons-material/Paid";
import LogoutIcon from "@mui/icons-material/Logout";
import { Fee } from "./fee";
import { useNavigate } from "react-router-dom";
import { AppBar, Avatar, Drawer } from "@mui/material";
import { Info } from "./infomation";
import { SignTech } from "./signTeach";
import { Schedule } from "./schedule";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const drawerWidth = 300;

export default function MenuStudent() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [content, setContent] = React.useState(0);
  const navigate = useNavigate();

  const Logout = () => {
    navigate("/");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ backgroundColor: "#0D2461" }}>
          <img
            style={{ width: "340px", padding: "10px" }}
            alt=""
            src={require("../images/logo-Van-Hien.png")}
          />
          <Avatar
            sx={{
              position: "absolute",
              right: 130,
              width: 50,
              height: 50,
            }}
            src={userInfo?.avatar}
          />
          <b style={{ position: "absolute", right: 20, fontSize: 20 }}>
            {userInfo?.name}
          </b>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#0D2461",
            marginTop: 2,
          },
        }}
      >
        <Divider />
        <List sx={{ marginTop: 10 }}>
          {[
            "Thông tin cá nhân",
            "Thời khóa biểu",
            "Đăng kí môn học",
            "Thanh toán học phí",
            "Logout",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2.5,
                }}
                onClick={() => index === 4 ? Logout() : setContent(index)}

              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {index === 0 ? (
                    <IconButton >
                      <PeopleIcon sx={{ color: "white" }} />
                    </IconButton>
                  ) : index === 1 ? (
                    <IconButton >
                      <ClassIcon sx={{ color: "white" }} />
                    </IconButton>
                  ) : index === 2 ? (
                    <IconButton >
                      <AppRegistrationIcon sx={{ color: "white" }} />
                    </IconButton>
                  ) : index === 3 ? (
                    <IconButton >
                      <PaidIcon sx={{ color: "white" }} />
                    </IconButton>
                  ) : (
                    <IconButton >
                      <LogoutIcon sx={{ color: "white" }} />
                    </IconButton>
                  )}
                  <ListItemText
                    primary={text}
                    sx={{ opacity: 1 }}
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 2 }}>
        <Toolbar />
        {content === 0 ? (
          <Info></Info>
        ) : content === 1 ? (
          <Schedule></Schedule>
        ) : content === 2 ? (
          <SignTech></SignTech>
        ) : (
          <Fee></Fee>
        )}
      </Box>
    </Box>
  );
}
