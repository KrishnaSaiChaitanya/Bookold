import * as React from "react";
import { useState } from "react";
import "./header.css";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";
import { height } from "@mui/system";
import KeepMountedModal from "./Cart";
import Link from "@mui/material/Link";
import SimpleBackdrop from "./Components/SimpleBackdrop";
import { Grid } from "@mui/material";

export default function Header(props) {
  const [token, settoken] = useState("");
  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      settoken(token);
    }
  }, []);

  const click = () => {
    <a href="/login"></a>;
  };

  var l = props.login;

  React.useEffect(() => {
    console.log(l);
  }, [l]);

  return (
    <nav class="nav_bar">
      {/* <div class="name">
        
        <h1 id="p_name">BOOKOLD</h1>
      </div> */}
      <div class="list" style={{display: "flex"}}>
        
        <Button>
            <SwipeableTemporaryDrawer id="link1" />
          </Button>
          <div style = {{justifyContent: "center", alignItems: "center"}}>
          <Grid container spacing={2} >
           <Grid xs={4}>
          <img style={{height:"80px"}} src="/logo.png" alt="logo" />
           </Grid>
           <Grid xs={8}>
           <h1 >Bookold</h1>
         </Grid>
</Grid>
</div>
          
        
        <div className="btns">
          <Button  href="/" size="large">
            <HomeIcon fontSize="medium" /> Home
          </Button>
          <Button  href="/products" size="large">
            Products
          </Button>
          <Button  href="/upload" size="large">
            dashboard
          </Button>

          {/* <li class="link1"> <a href='/'> <HomeIcon style={{ color: "#a52a5a" }}/>Home</a></li>
            <li class="link1"><a href='/products'>Products</a></li> */}
          {/* <li class="link1"><a href='/upload'>Dashboard</a></li> */}
          {!token && (
            <Button id="link1" href="/login">
              Login
            </Button>
          )}
        </div>
        <div className="cart m" id="link1">
          {/* <KeepMountedModal /> */}
          <SimpleBackdrop/>
        </div>
      </div>
    </nav>
  );
}
