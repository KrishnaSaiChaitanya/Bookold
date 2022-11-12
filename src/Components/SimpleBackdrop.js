import * as React from 'react';
import "./backdrop.css"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import Loading from './Loading_animation';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';


export default function SimpleBackdrop() {
  const [open, setOpen] =useState(false);
  const[playAnimation, setPlayAnimation] = useState(true);
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setPlayAnimation(true);
    setOpen(true);
    setTimeout(() => {
      setPlayAnimation(false);
    }, 2000); 
  };

  return (
    <div>
      <Button  onClick={handleOpen} fontSize="large" style={{colour : "#F3E6DD"}}  ><ShoppingCartIcon/></Button>
      <Backdrop
        sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        
      >
        
          
  <div>
  <div>
  <Button onClick={handleClose}  style = {{ borderRadius: "50%", height: "70px", width: "70px", justifyItems: "end"}}><CloseIcon fontSize="large"/></Button>
  </div>
  {!playAnimation && <div style={{height: "50vh",width: "80vw",borderRadius: "100px", backgroundColor : "#282932"}}>
    hello
    </div>}
  </div>
  
  {playAnimation && <Loading/>}
  
  
  
        
        
        {/* <div style={{marginLeft: "30vw", marginBottom: "40vh"}}>
        <Button onClick={handleClose}  style = {{ borderRadius: "50%", height: "70px", width: "70px"}}><CloseIcon fontSize="large"/></Button>
        </div> */}
        
      </Backdrop>
    </div>
  );
}
