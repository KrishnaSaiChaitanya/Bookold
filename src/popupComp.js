import React, { Component } from 'react';
import { useEffect } from 'react';

export default class popupComp extends PopupState {
    data;
    fetchData = async (id) => {
    const user_id = id;
    const user = `http://localhost:2000/get-user/${user_id}`;
    let res = await fetch(user, {
      headers: {
        'token': localStorage.getItem('token')
      }
    });
    let data = await res.json();
    console.log(data.user); 
    this.data = data;
    }
    useEffect(() => {
        if (!data) {
            fetchData();
        }
      }, []);
    
  render() {
    return (
      
    )
  }
}
