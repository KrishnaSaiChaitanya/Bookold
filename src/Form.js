import React from 'react'
import TextField from '@mui/material/TextField';
import  "./form.css";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import { useEffect } from "react";

function Form(props) {
  // useEffect(() => {
  //   handle_submit()
  // }, [])
  // let a = props.aVar;
  var l = props.login;

  React.useEffect(
    () => {
      console.log(l)
    }, [l]
  )
  //  console.log(props.a);
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const handle_submit = () => {
    props.setA(0);
    // alert("Submitted New Book");
    const box = document.getElementById("pop_up");
    box.innerText = "hellow";
    box.style.backgroundColor = "red";
    

  //   <Alert severity="success">
  //   <AlertTitle>Success</AlertTitle>
  //   This is a success alert — <strong>check it out!</strong>
  //   <p>hi threr</p>
  // </Alert>
  // document.getElementById("pop-up").classList.add("is-active");
  // setTimeout(() => {
  //   document.getElementById("pop-up").classList.remove("is-active");
  // }, 1000);
  console.log("error");}
  return (
    <div class="Main">
        <div id="pop_up"></div>

        
    <form class="form" >
        <label for="BOOKNAME">BOOKNAME  : <TextField id="filled-basic" label="Filled" variant="filled" /></label>
        
          <label id='feild' for="DESCRIPTION"></label>
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <label  id='feild' for="BOOKNAME"></label>
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <label id='feild' for="DESCRIPTION">DESCRIPTION</label>
          <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={5}
          value={value}
          onChange={handleChange}
          variant="filled"
        />
          <Button onClick={handle_submit}>submit</Button>
    </form>
    <div class="left" id="left">
         <img src="/book-lovers.png" alt=""/>
        </div>
    </div>
  )
}

export default Form