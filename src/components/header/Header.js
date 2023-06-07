import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Container
} from '@mui/material'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
} from '@mui/icons-material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'
import './Header.css'
import SideBar from '../sidebar/SideBar';

export default function Header() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>
              XingtuGym
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {auth && (
            <div>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div className='account-popup'>
                  <div className='account-popup-top'>
                    <AccountCircle />
                    <span>Admin</span>
                  </div>
                  <div className='account-popup-title account-popup-blue'>
                    <span>プロファイル</span>
                  </div>
                  <MenuItem onClick={handleClose} className='account-popup-bottom'>
                    <LockOpenIcon className='account-popup-blue' />
                    <span>パスワードを変更する</span>
                    <ChevronRightIcon className='account-popup-blue' />
                  </MenuItem>
                  <MenuItem onClick={handleClose} className='account-popup-bottom'>
                    <LogoutIcon className='account-popup-blue' />
                    <span>ログアウト</span>
                  </MenuItem>
                </div>
              </Menu>
            </div>
          )}

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ m: 0 }}
            onClick={handleToggleSidebar}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
        <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
    </Box>
  )
}
