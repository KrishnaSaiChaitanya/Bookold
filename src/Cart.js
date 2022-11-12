import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./cart.css";
import { useState, useEffect } from "react";
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import { SettingsApplications } from '@mui/icons-material';
const axios = require('axios');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal() {
  
  

const [credit, setcredit] = useState(0)
  const [token, settoken] = useState('')
  const [cart, setcart] = useState([])
  useEffect(() => {
    let token = localStorage.getItem('token');
    settoken(token)
    let myCart = localStorage.getItem("cart");
    if (myCart) {
      setcart(JSON.parse(myCart))
    }
  //  getting user credits
   
  const user_id = localStorage.getItem('user_id');
    const user = `http://localhost:2000/get-user/${user_id}`;
    fetch(user, {
      headers: {
        'token': token
      }
    }).then((res) => res.json())
      .then((data) => { setcredit(data.user.credits); console.log(credit); }) 

  }, [])


  useEffect(() => {
    var products = localStorage.getItem('cart')
    products = JSON.parse(products)
    var arr = [];

    
    products.map((element , index) => {
      axios.post('http://localhost:2000/get-productbyid', {
      id : element
    },{
      headers: {
        'token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      } }
    
    ).then((data) => { arr.push( data.data.product );  })
    });
    setp_data(arr)
    console.log(arr);
  }, [])






  // console.log(myCart[0]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [p_data, setp_data] = useState([])
  // 62c68ec9bfe1f739981e771e
  //   const getProduct = () => {
  //     const Id = "62c68ec9bfe1f739981e771e";
  //     fetch(`http://localhost:2000/get-productbyid` , {
  //             headers: {
  //               'token': token
  //   }} , {body : {'id' : Id}}
  // ).then((res) => res.json())
  //     .then((data) => {setp_data(data.product); })
  //   }



  const placeOrder = (id , price , user_id) => {
    if(credit >= price)
    {axios.post('http://localhost:2000/delete-product', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then((res) => {
      swal({
        text: "Order has Placed Sucussfully",
        icon: "success",
        type: "success"
      }).then(() => window.open("./dashboard", "_self"))
    }).catch((err) => {
      swal({
        text: "Failed to Place Order",
        icon: "error",
        type: "error"
      });
    });
    if (localStorage.getItem("cart")) {
        localStorage.setItem('cart', "[]");}


        // updating credits

    let postObj = {
      id: localStorage.getItem('user_id'),
      value: - price,
    }
    fetch('http://localhost:2000/update-credits', {
      method:"POST",
      body: JSON.stringify(postObj),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      console.log("YAYYY!");
    });
  

    // updating Buyer details in product

    let postObj1 = {
      id: id,
      value: localStorage.getItem('user_id'),
    }
    fetch('http://localhost:2000/update-buyer', {
      method:"POST",
      body: JSON.stringify(postObj1),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      console.log("OOO!");
    });
  }
    else{
      swal({
        text: "Sorry You Don't Have Enough Credits",
        icon: "error",
        type: "error"
      });
    }

    // updating seller credits

    let postObj = {
      id: user_id,
      value:  price,
    }
    fetch('http://localhost:2000/update-credits', {
      method:"POST",
      body: JSON.stringify(postObj),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      console.log("YAYYY!");
    });
  

  }

  // useEffect(() => {

  // }, [myCart])
  
    const deleteCart = () => {
      if (localStorage.getItem("cart")) {
        localStorage.setItem('cart', "[]");}
        window.open('./products' , "_shelf")
    }
  


  return (
    
    <div style={{ height: "900px" }}>
      <Button onClick={handleOpen} style={{color: "#a52a5a"}}><ShoppingCartIcon /></Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Cart Items
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>

          </Typography>
          <div class="extra" style={{ width: "80vw" }}>
            <div class="cart-main">

               {p_data.length == 0 &&  <img src= "/emptyCart.png" style={{height : "300px" , width: "350px" , marginRight: "30px"}} alt=""/>}
              {/* {(cart.length != 0) && cart.map((productId , index) => (
               getProduct(productId)
                       ))} */}
              { p_data.map((product , index) => (
                <>
              <div class="cart">
                <div class="image">
              <img src={`http://localhost:2000/${product.image}`} alt=""/>
            </div>
            <div class="information">
                <h3>Name : </h3>
                <h5>{product.name}</h5><br/>
                <h3>Price : </h3>
                <h5><img src="https://img.icons8.com/material/24/000000/gg.png"/>{product.price}</h5>
            </div>
            </div>
              <div class="button">
            <Button id='bttn' onClick={(e) => { placeOrder(product._id , product.price , product.user_id) }} >Place Order</Button>
            <Button id='bttn' onClick={(e) => { deleteCart() }} >Delete Cart</Button>
              </div>
              </>
            ))}
            </div>
            
          </div>
        </Box>
      </Modal>
    </div>
  );
}



