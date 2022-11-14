import React, { useRef, useState } from "react";
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
import { Reveal, Zoom } from "react-reveal";
import ScrollTop from "./Components/ScrollTop";
const { red, blue, green } = require("@material-ui/core/colors");

// style={{backgroundImage: "{wave}"}}

const Home = () => {
  let mainDiv = useRef();
  let [state, setState] = useState({ open: false });
  return (
    
    <div className="main" ref={mainDiv}>
      
      <div className="i"></div>
      <div className="info">
      <ScrollTop parent={mainDiv} />
        <div class="second1">
          <p style={{ fontFamily: "Montserrat" }}>
           
              <i>
                <Zoom >
                "It is a good rule after reading a new book, never to allow
                yourself another new one till you have read an old one in
                between."
                </Zoom>
              </i>
            
          </p>
        </div>
        <h1> Learn more about our website </h1>
        {/* <ArrowDownwardIcon style={{marginLeft:"48vw"}} Size="large"/> */}
       
        {/* <Button id="b" variant="outlined" href="./about">
          LEARN MORE
        </Button> */}
      </div>

      {/* carousel */}
      <div className="learn_more_button" style={{  width: "100%", backgroundColor: "antiquewhite" , display:"flex"}}>
        <Button onClick={() => setState({ open: true })} style= {{margin:"auto"}}>Learn More</Button>
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
      
      <div className="card-div" id = "Pomplet_card">
        <div className="card12">
       
          <div className="card-body">
          <Zoom effect="fadeInUp" duration = {1500}>
            <img src="./s-1.png" alt="" /> </Zoom>
          </div>
          
        </div>
        <div className="card12">
        
          <div className="card-body">
          <Zoom effect="fadeInUp" duration = {1500}>
            <img src="./s-2.png" alt="" /> </Zoom>
          </div>
          
        </div>

        <div className="card12">
        
          <div className="card-body">
          <Zoom effect="fadeInUp" duration = {1500}>
            <img
              src="./s-3.png"
              alt=""
            />
            </Zoom>
          </div>
          
        </div>
        <div className="card12" id="car">
        
          <div className="card-body">
          <Zoom effect="fadeInUp" duration = {1500} >
            <img src="./s-5.png" alt="" />
            </Zoom>
          </div>
          
        </div>
      </div>

      

      <div className="carousel" >
        <Carousel/>
      </div>
      

      
 <br />
 


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
                  "Everybody can buy these books. This is Exchange platform with credit system. I like the system very much." <br/> -H.Raghava
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
