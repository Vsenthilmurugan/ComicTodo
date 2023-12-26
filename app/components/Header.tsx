"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { DataTypes } from "../common/types";
import { useSelector } from "react-redux";
import Link from "next/link";
import PortraitIcon from '@mui/icons-material/Portrait';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const settings = ["userTodo","profile", "logout"];
const settingIcons = [<PortraitIcon/>,<ListAltIcon/>, <ExitToAppIcon/>];
const settingsPath = ["/userTodo","/profile", "/signIn"];

const Header = () => {

  const themeState:DataTypes.ThemeProps = useSelector((state:any) => state.theme);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" style={{background:themeState.theme_header,height:"70px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex items-center justify-between">
          {/* Logo at the top left */}
          <Image src={"/logo.png"} height={120} width={120} alt="logo" />

          <Box className="hidden md:flex" sx={{ flexGrow: 1 }}>
            {/* Additional content can go here if needed */}
          </Box>

          {/* Profile image at the top right */}
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="S" src="/default_user.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting,index:number) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link href={settingsPath[index]}>
                  <Typography textAlign="center">{settingIcons[index]}&nbsp;{setting}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
