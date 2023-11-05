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
import { Subject } from "./subject";
import { useNavigate } from "react-router-dom";
import { StudentList } from "./studentList";
import { AppBar, Drawer } from "@mui/material";
import { Teach } from "./teach";
import { FeeAdmin } from "./feeAdmin";
import { useAppDispatch } from "../redux/store";
import { logout } from "../redux/auth/auth.reducer";

const drawerWidth = 300;

export default function Menu() {
  const [content, setContent] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const Logout = () => {
    dispatch(logout());
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
          <b style={{ position: "absolute", right: 20, fontSize: 20 }}>ADMIN</b>
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
        <Divider light />
        <List sx={{ marginTop: 10 }}>
          {[
            "Danh sách sinh viên/ giảng viên",
            "Danh sách môn học",
            "Lịch sử đăng ký học phần",
            "Lịch sử thanh toán học phí",
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
                    <IconButton>
                      <PeopleIcon sx={{ color: "white" }} />
                    </IconButton>
                  ) : index === 1 ? (
                    <IconButton >
                      <ClassIcon sx={{ color: "white" }} />
                    </IconButton>
                  ) : index === 2 ? (
                    <IconButton>
                      <AppRegistrationIcon sx={{ color: "white" }} />
                    </IconButton>
                  ) : index === 3 ? (
                    <IconButton>
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
          <StudentList></StudentList>
        ) : content === 1 ? (
          <Subject></Subject>
        ) : content === 2 ? (
          <Teach></Teach>
        ) : (
          <FeeAdmin></FeeAdmin>
        )}
      </Box>
    </Box>
  );
}
