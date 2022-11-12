import * as React from 'react';
import Box from '@mui/material/Box';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import { Drawer, IconButton, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

export default function SwipeableTemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return(
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
            LOGO
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
  );
}
