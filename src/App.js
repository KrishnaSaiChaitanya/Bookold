import logo from './logo.svg';
import './App.css';
import  Header  from "./Header";
import Products from "./Products";
import Home from "./Home";
import {  Switch, Route , BrowserRouter as Router } from "react-router-dom";
import Form from "./Form";
import Test from "./Test";
import Login from "./Login";
import Register from "./registration";
import Cart from "./Cart";
import Footer from './Components/Footer';
import About from "./About";
import Dashboard from './dashboard';
import { useState } from 'react';
import useSWR from 'swr'
import ProductView from './ProductView';
function App() {
//   function useSharedState() {
//     const { data: state, mutate: setState } = useSWR(key, {
//         initialData: '',
//       })
    
//       return [state, setState]
// }

  return (
    <div className="App">
      <Router>
      <Route exact path = "/login" forceRefresh={true}>
          <Login/>
        </Route>
        <Route exact path = "/register">
          <Register/>
        </Route>
      </Router>
      <Router>
      
      
<Switch>
<Route exact path = "/cart">
        <Header/>
        <Cart />
        <Footer/>
        </Route>
        <Route exact path="/products">
        <Header/>
       <Products  />
       <Footer/>
       </Route>
       <Route exact path="/dashboard">
        <Header />
       <Dashboard/>
       <Footer/>
       </Route>
       <Route exact path = "/test">
       <Header/>
        <Test/>
        </Route>
        <Route exact path = "/">
        <Header/>
        <Home/>
        <Footer/>
        </Route>
        <Route exact path = "/upload">
        <Header/>
          {/* <Form login = {a} setA = {setA}/> */}
          <Dashboard/>
          <Footer/>
        </Route>
        <Route exact path= "/about">
        <Header/>
        <About/>
        <Footer/>
        </Route>
        <Route exact path= "/productView/:id">
        <Header/>
        <ProductView/>
        <Footer/>
        </Route>
        
        </Switch>
      
      </Router>
    </div>
  );
}

export default App;
