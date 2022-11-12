import React, { Component } from 'react';
import swal from 'sweetalert';
import "./login.css"
import TextField from '@mui/material/TextField';
// import { Button,  Link } from '@material-ui/core';
import { Button,  Link } from '@mui/material/';
const axios = require('axios');

const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  
  login = () => {
    
    const pwd = bcrypt.hashSync(this.state.password, salt);
    axios.post('http://localhost:2000/login', {
      username: this.state.username,
      password: pwd,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.user_id);
      console.log(res.data);
      swal({
        text:"Sucussfully Logged In",
        icon: "success",
        type: "error"
      }).then(() => {window.open('/dashboard', "_self");})
      
      
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  render() {
    return (
      <div class="whole">
      <div className='login-main'>
        <div class="login-img">
          <img src="/sign-up-form.png" alt=""/>
        </div>
           <div class="login">
        <div className='login-name'>
          <h2>Login</h2>
        </div>

        <div id='feild'>
          <TextField
             id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          <br /><br />
          
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="outlined"
            color="primary"
            size="large"
            disabled={this.state.username == '' && this.state.password == ''}
            onClick={this.login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/register">
            Register
          </Link>
        </div>
        </div>
      </div>
      </div>
    );
  }
}
