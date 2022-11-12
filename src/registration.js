import React, { Component } from 'react';
import swal from 'sweetalert';
//import { Button, TextField, Link } from '@material-ui/core';
import { withRouter } from "react-router"
import { Button, TextField, Link } from '@mui/material/';
import "./register.css"
const axios = require('axios');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      email:'',
      phone:''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('http://localhost:2000/register', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
      
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/login');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div class="main1">
      <div className='register-main'>
        
        <div class="register">
        <div className='register-name'>
          <h2>Register</h2>
        </div>

        <div>
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
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
          <br /><br />

          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="E-mail"
            required
          />
          <br /><br />

          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="phone"
            value={this.state.phone}
            onChange={this.onChange}
            placeholder="Mobile Number"
            required
          />
          <br /><br />
          
          <Button
            className="button_style"
            variant="outlined"
            color="primary"
            size="medium"
            disabled={this.state.username == '' && this.state.password == ''}
            onClick={this.register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/login">
            Login
          </Link>
          
          </div>
        </div>
        <div class="register-img">
          <img src="/robot-checking-user-profile.png" alt=""/>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(Register)