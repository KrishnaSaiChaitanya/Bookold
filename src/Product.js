import React from 'react'
import "./product.css";
import { Container, Grid,  Typography } from '@mui/material/';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import  {useState , useEffect}  from "react";
import swal from 'sweetalert';
import blob from "./blob.svg";
import ProductView from './ProductView';
import SWR from "swr";
import Swal from 'sweetalert2'
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import useSharedState from './ProductData_Provider';
const axios = require('axios');

const Product = (props) => {
  // const [id, setid] = useSharedState('username', 'paco')
  

const [token, settoken] = useState('')
  useEffect(() => {
    let token = localStorage.getItem('token');
      settoken(token)
  
}, [])


  const addToCart = (id) =>{
    if (localStorage.getItem("cart")) {
      let myArr = JSON.parse(localStorage.getItem('cart'));
      if(myArr.length == 0)
      {myArr.push(id);
      localStorage.setItem('cart', JSON.stringify(myArr));
      swal({
        text: "Product is Added to Cart",
        icon: "success",
        type: "success"
      })
      .then(() => {window.open('/dashboard', "_self");})}
      else{
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Checkout Your Existing Cart',
          confirmButtonText : '',
          showConfirmButton : false,
          timer: 1500
        })
      }
    } else {
      let newarr = [id];
      localStorage.setItem('cart', JSON.stringify(newarr));
    }

  }
  
const deleteCart = () => {
  if (localStorage.getItem("cart")) {
    localStorage.setItem('cart', "[]");}
}


const expand = (id) => {
   <a href="/productView${id}"></a>
}


  const deleteProduct = (id) => {
    props.setLogin(id);
    
    axios.post('http://localhost:2000/delete-product', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then((res) => {
      swal({
        text: "Product is Added to Cart",
        icon: "success",
        type: "success"
      }).then(() =>  window.open("./products" , "_self"))
    }).catch((err) => {
      swal({
        text: "Failed to add Cart",
        icon: "error",
        type: "error"
      });
    });

  }
  let l = props.login
  React.useEffect(
    () => {
      console.log(l)
    }, [l]
  )




  return (
    <>
    
    {/* // <div className='main_props'>
    <Grid container>
    //     <Grid item xs={12} md={6} className="image-wrapper">
              <img src={props.image} alt={props.name}
              />
            </Grid>
    //     <Typography variant="h2"><b>{props.name}</b></Typography>
              <hr />
               <Typography variant="p" dangerouslySetInnerHTML={props.p} />   
              <Typography variant="h3" color="secondary" >Price: <b> {props.price} </b> </Typography>
              <br/>
    //     <Button id='sai' ><AddIcon /></Button>
    //     <Button id = 's'><DeleteIcon/> </Button>
    </Grid>
    // </div> */}

    <div class="card1">
      {/* {console.log(props.login)} */}
            
              <div class="ima" data-mdb-ripple-color="light">
                  <img src={`http://localhost:2000/${props.image}`} width="250" height="300" />
                  </div>
              <div class="c-body">
                <h5 class="c-title">{props.name}</h5>
                <p class="c-text">
                  price :   <img src="https://img.icons8.com/material/24/000000/gg.png"/>   {props.p} 
                </p>
                <Button id='bottan' variant="outlined" onClick={(e) => {addToCart(props.id)}}>Add To Cart</Button>
                <Button variant="outlined" href={`/productView/${props.id}`} ><ReadMoreIcon/></Button>
              </div>
            
          </div>

{/* <Container className="props-view">
          <Grid container>
            <Grid item xs={12} md={6} className="image-wrapper">
              <img src={props.image} alt={props.name}
              />
            </Grid>
            <Grid item xs={12} md={5} className="text">
              <Typography variant="h2"><b>{props.name}</b></Typography>
              <hr />
                <Typography variant="p" dangerouslySetInnerHTML={props.p} />  
              <Typography variant="h3" color="secondary" >Price: <b> {props.price} </b> </Typography>
              <br/>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Button size="large" className="custom-button"  >
                     Continue Shopping
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container> */}


          </>
  )
}

export default Product