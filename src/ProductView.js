import React from 'react'
import "./productView.css"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useParams } from 'react-router-dom';
import {useEffect , useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
const axios = require('axios');


function ProductView() {
  const [p_data, setp_data] = useState({})
  let { id } = useParams();
  console.log(id);
useEffect(() => {
  axios.post("http://localhost:2000/get-productbyid", {
    id: id
  },{
    headers: {
      'token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    } }
  
  ).then((data) => { setp_data(data.data.product); }) 
  
}, [])




  return (
    <>
    <div class="a">
        <Button size="large" href='/products'><ArrowBackIcon/></Button>
        </div>
        {!p_data && <CircularProgress size={"large"}/> }
    {p_data && <div class="main_div">
      
        <div class="img3">
            <img src={`http://localhost:2000/${p_data.image}`} alt=""/>
        </div>
        <div class="information1">
         <h4>Name : {p_data.name}  </h4><br/>
         {/* <h6>{p_data.name}</h6><br/> */}
         <h4>Description : </h4>
         <h4>{p_data.desc}</h4><br/>
         {/* <h6>.....</h6><br/>
         <h6>.....</h6><br/>
         <h6>.....</h6><br/> */}
         <h4>Price : {p_data.price} </h4>
         <h4>Author : </h4>
         <h6>.....</h6><br/>
         <h4>Genere : </h4>
         <h6>.....</h6><br/>
         <Button variant="outlined">Learn More About Product</Button>
        </div>
    </div>}
    </>
  )
}

export default ProductView