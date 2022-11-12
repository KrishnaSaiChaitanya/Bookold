import React, { useState } from "react";
import "./home.css";
import wave from "./wave2.svg";
import blob from "./blob.svg";
import Button from "@mui/material/Button";
import { Sta } from "react";
import { AutoRotatingCarousel } from "material-auto-rotating-carousel";
import Slide from "material-auto-rotating-carousel/lib/Slide";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Swiper from "swiper";
import Carousel from "./Components/Slider";
const { red, blue, green } = require("@material-ui/core/colors");

// style={{backgroundImage: "{wave}"}}

const Home = () => {
  let [state, setState] = useState({ open: false });
  return (
    <div className="main">
      <div className="i"></div>
      <div className="info">
        <div class="second1">
          <p style={{ fontFamily: "Montserrat" }}>
            <b>
              <i>
                "It is a good rule after reading a new book, never to allow
                yourself another new one till you have read an old one in
                between."
              </i>
            </b>
          </p>
        </div>
        <h1> Learn more about our website </h1>
        <ArrowDownwardIcon style={{marginLeft:"48vw"}} Size="large"/>
        {/* <Button id="b" variant="outlined" href="./about">
          LEARN MORE
        </Button> */}
      </div>

      {/* carousel */}
      <div style={{ position: "relative", width: "100%", backgroundColor: "antiquewhite" , alignItems: "center", paddingLeft: "45vw"}}>
        <Button onClick={() => setState({ open: true })}>Learn More</Button>
        <AutoRotatingCarousel
          label="Get started"
          open={state.open}
          onClose={() => setState({ open: false })}
          onStart={() => setState({ open: false })}
          style={{ position: "absolute" }}
        >
          <Slide
            media={
              
              <img style={{height : "350px"}}src="t-1.gif" />
            }
            mediaBackgroundStyle={{ backgroundColor: "#ffd089" }}
            style={{ backgroundColor: "rgb(234, 158, 60)" }}
            title="Upload Your Book"
            subtitle="By providing The Detail Of Your Book ."
          />
          <Slide
            media={
              <img style={{height : "350px"}}src="t-4.gif" />
            }
            mediaBackgroundStyle={{ backgroundColor: "#ffd089" }}
            style={{ backgroundColor: "rgb(234, 158, 60)" }}
            title="Get Some Credit Points !"
            subtitle="When Someone bought Your Book"
          />
          <Slide
            media={
              <img style={{height : "350px"}} src="t-3.gif" />
              
            }
            
            mediaBackgroundStyle={{ backgroundColor: "#ffd089" }}
            style={{ backgroundColor: "rgb(234, 158, 60)" }}
            title="Buy The Books That You Need !"
            subtitle="Using The Credits "
          />
        </AutoRotatingCarousel>
      </div>

      <div class="card-div">
        <div class="card12">
          <div class="card-body">
            <img src="./s-1.png" alt="" />
          </div>
        </div>
        <div class="card12">
          <div class="card-body">
            <img src="./s-2.png" alt="" />
          </div>
        </div>

        <div class="card12">
          <div class="card-body">
            <img
              src="./s-3.png"
              alt=""
            />
          </div>
        </div>
        <div class="card12" id="car">
          <div class="card-body">
            <img src="./s-5.png" alt="" />
          </div>
        </div>
      </div>

      {/* <div
        id="carouselExampleDark"
        class="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            data-bs-interval="100000"
            height="400"
            width="200"
          >
            <img src="./carroul1.jpg" className="d-block w-100 " alt="..." />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div
            className="carousel-item"
            data-bs-interval="1000"
            height="400"
            width="200"
          >
            <img src="./caryoul2.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div
            className="carousel-item"
            data-bs-interval="1000"
            height="400"
            width="200"
          >
            <img src="carryoul3.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div> */}

      <div className="carousel" style={{height : "30vh"}}>
        <Carousel/>
      </div>
      

      
 <br />
 {/* <small>
   <a 
    href="https://maps.google.com/maps?q=10.305385,77.923029&hl=es;z=14&amp;output=embed" 
    style={{color:"#0000FF",textAlign:"left"}}
    target="_blank"
   >
     See map bigger
   </a>
 </small> */}


      <div class="reviews">
        <h5>Reviews</h5>
        <div class="our_cards">
          <div class="card-div">
            <div class="card">
              <div class="card-body">
                <p class="card-text">
                  "There is a unique idea present in this Bookold yhat is the exchange of book without money using cerdit system."<br/>-H.G.Wells
                </p>
                <br></br>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <p class="card-text">
                  "Everybody can buy these books. This is Exchange platform with credit system. I like the system very much. It is diffent from others." <br/> -H.Raghava
                </p>
              </div>
            </div>
            <div class="card" id="car">
              <div class="card-body">
                <p class="card-text">
                  "This is must used platform to have good old books with an exchange."<br/>-M.Sastry                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
