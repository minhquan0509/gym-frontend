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
  Container,
  Button
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
import { createTheme } from '@material-ui/core/styles';

export default function Header() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Special Elite',
      ].join(','),
    },
  });
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
      <AppBar position="static" className='header-container'>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to={'/'} className='header-gymlogo'>
              Xingtu<strong>Gym</strong>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {auth && (
            <div>
              {/* 
              // Avartar User
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle style={{ color: 'black', fontSize: '50px' }} />
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
                    <span>アドミン</span>
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
              */}
              <Button variant="text">
                <Link
                  to={`/login`}
                  style={{ textDecoration: 'none', fontSize: '20px' }}
                >ログイン</Link>
              </Button>
              <Button
                variant="contained"
                sx={{ m: 2 }}>
                <Link to={`/sign_up`}
                  style={{ textDecoration: 'none', fontSize: '20px', color: 'white' }}
                >サインアップ</Link>
              </Button>
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
            <MenuIcon
              style={{ color: 'black', fontSize: '50px' }} />
          </IconButton>

        </Toolbar>
      </AppBar>
      <SideBar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </Box >
  )
}
