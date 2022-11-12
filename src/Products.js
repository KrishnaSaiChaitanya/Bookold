import React from 'react'
import Product from "./Product";
import "./products.css"
import axios from "react";
import { useHistory } from "react-router-dom";
import { useEffect , useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import CircularProgress from '@mui/material/CircularProgress';

const Products = (props) => {

  // var id = props.login;

  // React.useEffect(
  //   () => {
  //     console.log(id)
  //   }, [id]
  // )
  const [token, settoken] = useState('')
  const [p_data, setp_data] = useState([])
  const history = useHistory();
useEffect(() => {
  
    let token = localStorage.getItem('token');
    if (!token) {
      window.open('/login', "_self");
    } else {
      settoken(token)
  }
  
}, [])

useEffect(() => {
  if(token)
{ getProducts();
 console.log(token);}

}, [token])


const getProducts = () => {
  // props.setLogin(3);
  fetch("http://localhost:2000/getAllProducts" , {
          headers: {
            'token': token
}}).then((res) => res.json())
  .then((data) => setp_data(data.products))
}
// const getProducts = () => {
//   axios.get(`http://localhost:2000/getAllProducts`, {
//       headers: {
//         'token': token
//       }
//     }).then((res) => {
//        res.json()
//     }).then(data => {
//       setp_data(data.products); console.log(data.products);})
    
// }

 
  //   const [p_data, setp_data] = useState([])
  //   useEffect(() => {
  //       const fetch_handle = async () =>{  
          
  // await fetch("") .then((res) => res.json()).then((data) => setp_data(data.books))
  //            .catch((err) => console.log(err) ) }
  //  fetch_handle();   
  //                }, [])
  //               console.log(p_data);
  const [query, setQuery] = useState("")
             
  return (
    <div class="k">
    {/* <div class="input-group">
  <div class="form-outline">
    <input type="search" id="form1" class="form-control" />
    <label class="form-label" for="form1">Search</label>
  </div>
  
</div> */}<br/>
<div className="searchBar">
<InputBase
        id='placeholder'
        sx={{ ml: 1, flex: 1 }}
        placeholder="     Search For Product"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={event => setQuery(event.target.value)}
      />

      
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
{/* <input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} /> */}
    {/* <div class="p-list"> */}
   <div className='product_list'>
    {!p_data && <div><h1>Products are loading ......</h1> <CircularProgress/></div>}
    {p_data && p_data.filter(product => {
    if (query === '') {
      return product;
    } else if (product.name.toLowerCase().includes(query.toLowerCase())) {
      return product;
    }
  }).map((product , index) => (
        
        <div className='item' key={index}>
        <Product id = {product._id} name = {product.name} p = {product.price} image = {product.image} login = {props.login} setLogin = {props.setLogin}/>
        </div>
    ))}
   </div>
   {/* </div> */}
   </div>
  )
}

export default Products