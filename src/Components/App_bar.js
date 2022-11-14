import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import SimpleBackdrop from './SimpleBackdrop';



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  
  const [open, setOpen] = React.useState(false);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static" >
      <Container maxWidth="xl" style={{backgroundColor : "#ffd089"}}>
        <Toolbar disableGutters>
        
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BOOKOLD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
        sx={{
          width : 1000,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width : 300,
            boxSizing: 'border-box',
          },
        }}
        
        anchor="left"
        open={open}
      >
        {/* <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} 
          </IconButton>
        </DrawerHeader> */}
        
        <List >
            <Button fontSize = "large" onClick={handleDrawerClose} style={{borderRadius: "50px", marginLeft: "230px"}}><CloseIcon/></Button>
            <div>
            <div style={{ height: "100px",  marginLeft: "70px", marginTop: "30px"}}>
            {/* style = {{marginLeft: "80px", marginTop: "30px"}} */}
            <AdbIcon fontSize = "large" sx={{ display: { xs: 'inline', md: 'none' }, mr: 1 }}  />
          <Typography
          
            variant="h4"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'inline', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Bookold
          </Typography>
          </div>
          </div>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} style = {{padding : "12px"}}>
              <ListItemButton>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} style = {{textAlign : "center"}}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}

          </Box>
          
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> <br/>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} style = {{marginLeft: "350px"}}>
            
              <Button href="/" size="large"
                sx={{ my: 2, color: '#a52a5a', display: 'block' }} style = {{paddingRight: "15px"}}
              >
                Home
              </Button>
              <Button href="/products" size="large"
                sx={{ my: 2, color: '#a52a5a', display: 'block' }} style = {{paddingRight: "15px"}}
              >
                Products
              </Button>
              <Button href="/upload" size="large"
                sx={{ my: 2, color: '#a52a5a', display: 'block' }} style = {{paddingRight: "15px"}}
              >
                Dashboard
              </Button>
              <Button href="/login" size='large'
                sx={{ my: 2, color: '#a52a5a', display: 'block' }}
              >
                Login
              </Button>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
            <SimpleBackdrop/>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
