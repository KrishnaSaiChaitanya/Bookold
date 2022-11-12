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
      <div class="list">
        <div class="iimg" style={{ display: "flex", flexDirection: "initial" }}>
        <Button>
            <SwipeableTemporaryDrawer id="link1" />
          </Button>
          <img id="logo" src="/logo.png" alt="logo" />
          <h1 style={{ marginTop: "20px" }}>Bookold</h1>
        </div>
        <div class="btns" style={{display : "flex"}}>
          <Button id="link1" href="/" size="large">
            <HomeIcon fontSize="medium" /> Home
          </Button>
          <Button id="link1" href="/products" size="large">
            Products
          </Button>
          <Button id="link1" href="/upload" size="large">
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
          <KeepMountedModal />
        </div>
      </div>
    </nav>
  );
}
