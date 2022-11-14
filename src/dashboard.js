import React, { Component } from "react";
import "./dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import ShopIcon from "@mui/icons-material/Shop";
import LogoutIcon from "@mui/icons-material/Logout";
import HorizontalLabelPositionBelowStepper from "./HorizontalLabelPositionBelowStepper.js";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import Swal from "sweetalert2";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@mui/material/pickers';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchBar from "@mui/material/";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material/";
import { Pagination } from "@mui/material/";
import CustomizedDialogs from "./qr";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import swal from "sweetalert";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { borderRadius } from "@mui/system";

const axios = require("axios");

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

function getBookData(isbn) {
  fetch("https://isbndb.com/book/9780743273565").then((res) =>
    console.log(res)
  );
}

export default class Dashboard extends Component {
  dataArr;
  constructor() {
    super();
    this.state = {
      token: "",
      openProductModal: false,
      openProductEditModal: false,
      id: "",
      buyer_userName: "",
      buyer_email: "",
      buyer_phone: "",
      name: "",
      isbn: "",
      desc: "",
      price: "",
      in_time: "",
      out_time: "",
      discount: "",
      file: "",
      fileName: "",
      page: 1,
      page1: 1,
      search: "",
      search1: "",
      Address: "",
      userName: "",
      phone: "",
      email: "",
      credits: 0,
      products: [],
      past_products: [],
      pages: 0,
      pages1: 0,
      loading: false,
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      window.open("/login", "_self");
    } else {
      this.setState({ token: token }, () => {
        this.getProduct();
        // this.getPreviousProduct();
      });
    }
    const user_id = localStorage.getItem("user_id");
    const user = `http://localhost:2000/get-user/${user_id}`;
    fetch(user, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          userName: data.user.username,
          email: data.user.email,
          phone: data.user.phone,
          credits: data.user.credits,
        });
      });

    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=isbn%3D978-0735211292&key=AIzaSyDFmVFK5RhJDsVvUi4n2ygoGag7BiwntMc"
    )
      .then((res) => res.json())
      .then((data) => console.log(data.items[4].saleInfo.listPrice.amount));

    fetch(`http://localhost:2000/get-pastOrders?id=${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          past_products: data.products,
          pages1: data.pages,
        });
        console.log(data);
      });
    // fetch("https://api.itbook.store/1.0/search/mongodb")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
  };

  getBuyer_details = (id) => {
    const user_id = id;
    const user = `http://localhost:2000/get-user/${user_id}`;
    fetch(user, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);
        this.setState({
          buyer_userName: data.user.username,
          buyer_email: data.user.email,
          buyer_phone: data.user.phone,
        });
      });
  };

  // cancelation of product

  cancleProduct = (id, price, user_id) => {
    let postObj1 = {
      id: id,
      value: "",
    };
    fetch("http://localhost:2000/cancle-product", {
      method: "POST",
      body: JSON.stringify(postObj1),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("OOO!");
      })
      .catch((err) => {
        swal({
          text: "Failed to Cancle Order",
          icon: "error",
          type: "error",
        });
      });
    // Updating Credits of buyer

    let postObj = {
      id: user_id,
      value: -price,
    };
    fetch("http://localhost:2000/update-credits", {
      method: "POST",
      body: JSON.stringify(postObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log("YAYYY!");
    });

    // Updating credits of sellar

    let postObj2 = {
      id: localStorage.getItem("user_id"),
      value: price,
    };
    fetch("http://localhost:2000/update-credits", {
      method: "POST",
      body: JSON.stringify(postObj2),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      swal({
        text: "Order Was Cancelled Successfully and credits will be updated",
        icon: "success",
        type: "error",
      }).then(() => {
        window.open("/dashboard", "_self");
      });
      console.log("YAYYY!");
    });

    // updating is delete

    axios
      .post(
        "http://localhost:2000/place-product",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: this.state.token,
          },
        }
      )
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
      });
  };

  getProduct = () => {
    this.setState({ loading: true });

    let data = "?";
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios
      .get(`http://localhost:2000/get-product${data}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then(async (res) => {
        let newData = await Promise.all(
          res.data.products.map(async (product) => {
            let user_id = product.consumer_id;
            let r = await fetch(`http://localhost:2000/get-user/${user_id}`, {
              headers: {
                token: this.state.token,
              },
            });
            let d = await r.json();
            product.popupdata = d.user;
            return product;
          })
        );
        console.log(newData);
        this.setState({
          loading: false,
          products: newData,
          pages: res.data.pages,
        });
      })
      .catch((err) => {
        // swal({
        //   text: err.response.data.errorMessage,
        //   icon: "error",
        //   type: "error"
        // });
        this.setState({ loading: false, products: [], pages: 0 }, () => {});
      });
  };

  // previous Orders

  getPreviousProduct = () => {
    this.setState({ loading: true });
    console.log(this.state.page1);
    let data = "?";
    data = `${data}page=${this.state.page1}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios
      .get(`http://localhost:2000/get-pastOrders${data}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          loading: false,
          past_products: res.data.products,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState(
          { loading: false, past_products: [], pages1: 0 },
          () => {}
        );
      });
  };

  deleteProduct = (id) => {
    axios
      .post(
        "http://localhost:2000/delete-product",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: this.state.token,
          },
        }
      )
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.setState({ page: 1 }, () => {
          this.pageChange(null, 1);
          this.pageChange1(null, 1);
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  deleveredProduct = (id) => {
    axios
      .post(
        "http://localhost:2000/delivered-status",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: this.state.token,
          },
        }
      )
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.setState({ page: 1 }, () => {
          this.pageChange(null, 1);
          this.pageChange1(null, 1);
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getProduct();
      //this.getPreviousProduct();
    });
  };
  pageChange1 = (e, page) => {
    this.setState({ page1: page }, () => {
      // this.getProduct();
      this.getPreviousProduct();
    });
  };

  logOut = () => {
    localStorage.setItem("token", "");
    window.open("/login", "_self");
  };

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => {});
    }
    this.setState({ [e.target.name]: e.target.value }, () => {});
    if (e.target.name == "search") {
      this.setState({ page: 1 }, () => {
        this.getProduct();
        // this.getPreviousProduct();
      });
    }
  };

  // addProduct = () => {
  //   const fileInput = document.querySelector("#fileInput");
  //   const file = new FormData();
  //   file.append("file", fileInput.files[0]);
  //   file.append("name", this.state.name);
  //   file.append("desc", this.state.desc);
  //   file.append("discount", this.state.discount);
  //   file.append("Address", this.state.Address);
  //   getBookData(this.state.discount);
  //   fetch(
  //     `https://www.googleapis.com/books/v1/volumes?q=isbn:978-0735211292&key=AIzaSyDFmVFK5RhJDsVvUi4n2ygoGag7BiwntMc`
  //   )
  //     //${this.state.discount.trim()}
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.setState(
  //         { price: parseInt(data.items[4].saleInfo.listPrice.amount / 50) },
  //         () => {
  //           file.append("price", this.state.price);
  //         }
  //       );
  //       console.log(this.state.price);
  //     })
  //     .then(() => {
  //       // fetch("http://localhost:2000/add-product", {
  //       //   method: "POST",

  //       //     headers: {
  //       //       "content-type": "multipart/form-data",
  //       //       token: this.state.token,
  //       //     },

  //       //   body: JSON.stringify(file)
  //       // })
  //       axios.post("http://localhost:2000/add-product", file, {
  //         headers: {
  //           "content-type": "multipart/form-data",
  //           token: this.state.token,
  //         },
  //       });
  //     })
  //     .then((res) => {
  //       swal({
  //         text: res.data.title,
  //         icon: "success",
  //         type: "success",
  //       });

  //       // this.handleProductClose();
  //       this.setState(
  //         {
  //           name: "",
  //           desc: "",
  //           price: 0,
  //           Address: "",
  //           discount: "",
  //           file: null,
  //           page: 1,
  //         },
  //         () => {
  //           this.getProduct();
  //           // this.getPreviousProduct();
  //         }
  //       );
  //     });
  //   // this.handleProductClose();
  // };
  // correct one

  addProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append("file", fileInput.files[0]);
    file.append("name", this.state.name);
    file.append("desc", this.state.desc);
    file.append("discount", this.state.discount);
    file.append("price", this.state.price / 50);
    file.append("in_time", this.state.in_time);
    file.append("out_time", this.state.out_time);
    file.append("Address", this.state.Address);

    axios
      .post("http://localhost:2000/add-product", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: this.state.token,
        },
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.handleProductClose();
        this.setState(
          {
            name: "",
            desc: "",
            discount: "",
            price: 0,
            Address: "",
            file: null,
            page: 1,
          },
          () => {
            this.getProduct();
            // this.getPreviousProduct();
          }
        );
        // let postObj = {
        //   id: localStorage.getItem('user_id'),
        //   value: this.state.price,
        // }
        // fetch('http://localhost:2000/update-credits', {
        //   method:"POST",
        //   body: JSON.stringify(postObj),
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // }).then((res) => {
        //   console.log("YAYYY!");
        // });

        // }).catch((err) => {
        //   swal({
        //     text: err.response.data.errorMessage,
        //     icon: "error",
        //     type: "error"
        //   });
        this.handleProductClose();
      });
  };

  updateProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append("id", this.state.id);
    file.append("file", fileInput.files[0]);
    file.append("name", this.state.name);
    file.append("desc", this.state.desc);
    file.append("discount", this.state.discount);
    file.append("price", this.state.price);
    file.append("Address", this.state.Address);

    axios
      .post("http://localhost:2000/update-product", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: this.state.token,
        },
      })
      .then((res) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Product Updated Sucussfully",
        });

        this.handleProductEditClose();
        this.setState(
          {
            name: "",
            desc: "",
            discount: "",
            price: 0,
            Address: "",
            file: null,
          },
          () => {
            this.getProduct();
            // this.getPreviousProduct();
          }
        );
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "err.response.data.errorMessage",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        this.handleProductEditClose();
      });
  };

  handleProductOpen = () => {
    this.setState({
      openProductModal: true,
      id: "",
      name: "",
      desc: "",
      price: 0,
      discount: "",
      Address: "",
      fileName: "",
    });
  };

  handleProductClose = () => {
    this.setState({ openProductModal: false });
  };
  disable = () => {
    document.getElementById("change").disabled = true;
    console.log(document.getElementById("change").disabled);
  };

  handleProductEditOpen = (data) => {
    this.setState({
      openProductEditModal: true,
      id: data._id,
      name: data.name,
      desc: data.desc,
      price: data.price,
      discount: data.discount,
      Address: data.Address,
      fileName: data.image,
    });
  };
  scrollWin = (e) => {
    window.scrollBy(0, 100);
  };

  handleProductEditClose = () => {
    this.setState({ openProductEditModal: false });
  };

  render() {
    return (
      <div id="super_main">
        {/* {fetching()} */}
        {this.state.loading && <LinearProgress size={40} />}
        <div class="buttons">
          <Button
            id="btn1"
            className="button_style"
            variant="outlined"
            color="primary"
            size="large"
            href="/dashboard#a1"
            // onClick={() => {
            //   window.scrollBy(0, 0 - document.getElementById("a1").scrollTop);
            // }}
          >
            Uploads
          </Button>
          <Button
            id="btn"
            className="button_style"
            variant="outlined"
            color="primary"
            size="large"
            href="/dashboard#a2"
            // onclick={(e) => {
            //   this.scrollWin();
            // }}
          >
            Previous Orders
          </Button>
          <Button
            id="btn"
            className="button_style"
            variant="outlined"
            color="primary"
            size="large"
            onClick={this.handleProductOpen}
          >
            Add Product
          </Button>
          <Button
            id="btn"
            className="button_style"
            variant="outlined"
            size="large"
            onClick={this.logOut}
          >
            <LogoutIcon /> Log Out
          </Button>
        </div>
        <div className="dashboard">
          <div class="empty">
            <div class="details">
              <div class="e-img">
                <img src="./av-5.png" alt="" />
              </div>
              <div className="inside">
                <h3
                  style={{
                    marginTop: "3vh",
                    marginBottom: "5vh",
                    textShadow: "4px 4px 4px #aaa ",
                    fontSize: "2.5rem",
                  }}
                >
                  User Details
                </h3>
                <h5>Name : {this.state.userName}</h5>
                <h5>
                  Credits :{" "}
                  <img style = {{height: "35px"}}src= "./coin.png"></img>
                  {this.state.credits}{" "}
                </h5>
                <h5>Mobile-Number : {this.state.phone} </h5>
                <h5>Email Id : {this.state.email}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="stepper">
          <h3>How Credits Points Work</h3>
          <HorizontalLabelPositionBelowStepper />
        </div>

        <Divider variant="middle" />
        <br />
        <br />
        <h5
          style={{
            //
            fontSize: "2rem",
            marginLeft: "70px",
          }}
          id="a1"
        >
          {" "}
          <CloudUploadIcon fontSize="large" /> Past Uploads{" "}
        </h5>
        <br />

        {/* Edit Product */}
        <Dialog
          open={this.state.openProductEditModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          id="add_product"
        >
          <DialogTitle id="alert-dialog-title">Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Product Name"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              placeholder="Description"
              required
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              placeholder="Price (In rupees)"
              required
            />
            <br />
            <br />
            <br />
            {/* <TextField
            id="standard-basic"
            type="number"
            autoComplete="off"
            name="discount"
            value={this.state.discount}
            onChange={this.onChange}
            placeholder="Discount"
            required
          /><br /><br /> */}
            {/* <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="Address"
            value={this.state.Address}
            onChange={this.onChange}
            placeholder="Address"
            required
          /><br /><br /> */}
            <Button variant="contained" component="label">
              {" "}
              Upload
              <input
                type="file"
                accept="image/*"
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
              />
            </Button>
            &nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleProductEditClose} color="primary">
              Cancel
            </Button>
            {/* {!this.state.user_id && <Button 
              // disabled={this.state.name == '' || this.state.desc == '' || this.state.discount == '' || this.state.price == 0}
               onClick={(e) => this.updateProduct()} color="primary" autoFocus disabled>
              No Edit
            </Button>} */}
            {
              <Button
                disabled={
                  this.state.name == "" ||
                  this.state.desc == "" ||
                  this.state.discount == "" ||
                  this.state.price == 0
                }
                onClick={(e) => this.updateProduct()}
                color="primary"
                autoFocus
              >
                Edit Product
              </Button>
            }
          </DialogActions>
        </Dialog>

        {/* Add Product */}
        <Dialog
          open={this.state.openProductModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div id="add_product">
            <DialogTitle id="alert-dialog-title">Add Product</DialogTitle>
            <DialogContent id="content">
              <TextField
                id="standard-basic"
                type="text"
                autoComplete="off"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                placeholder="Product Name"
                required
              />
              <br />
              <br />
              <TextField
                id="standard-basic"
                type="text"
                autoComplete="off"
                name="desc"
                value={this.state.desc}
                onChange={this.onChange}
                placeholder="Description"
                required
              />
              <br />
              <br />
              <div class="icc" style={{ display: "flex" }}>
                <TextField
                  id="standard-basic"
                  type="number"
                  autoComplete="off"
                  name="price"
                  defaultValue=""
                  value={this.state.price}
                  onChange={this.onChange}
                  placeholder="Price (in rupees)"
                  required
                />
                {
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <Button variant="text" {...bindTrigger(popupState)}>
                          <InfoIcon />
                        </Button>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          {/* {console.log(row)} */}
                          {/* {this.getBuyer_details(row.consumer_id)} */}
                          <Typography sx={{ p: 2 }}>
                            Price that you have been entred is Converted into
                            credits <br />
                            in the following Way
                            <br />
                            {"scale:->"} <br />
                            50 rupees = 1 credit
                          </Typography>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                }
              </div>
              <br />
              <TextField
                id="standard-basic"
                type="text"
                autoComplete="off"
                name="discount"
                value={this.state.discount}
                onChange={this.onChange}
                placeholder="ISBN"
                required
              />
              <br />
              <br />
              <div>
                <div style={{ display: "flex" }}>
                  <TextField
                    id="standard-basic"
                    type="text"
                    autoComplete="off"
                    name="Address"
                    value={this.state.Address}
                    onChange={this.onChange}
                    placeholder="Address"
                    required
                  />
                  {
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState) => (
                        <div>
                          <Button variant="text" {...bindTrigger(popupState)}>
                            <InfoIcon />
                          </Button>
                          <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                          >
                            {/* {console.log(row)} */}
                            {/* {this.getBuyer_details(row.consumer_id)} */}
                            <Typography sx={{ p: 2 }}>
                              Enter the Address that You Are Comfortable To Give
                              the book <br />
                            </Typography>
                          </Popover>
                        </div>
                      )}
                    </PopupState>
                  }
                </div>

                <br />

                <TextField
                  id="time"
                  label="Alarm clock"
                  type="time"
                  defaultValue="07:30"
                  name="in_time"
                  value={this.state.in_time}
                  onChange={this.onChange}
                  // className={textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                <TextField
                  style={{ marginLeft: "30px" }}
                  id="time"
                  label="Alarm clock"
                  type="time"
                  defaultValue="07:30"
                  // className={textField}
                  name="out_time"
                  value={this.state.out_time}
                  onChange={this.onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </div>
              <br />
              <Button variant="outlined" component="label" size="large">
                {" "}
                Upload
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  // inputProps={{
                  //   accept: "image/*"
                  // }}
                  name="file"
                  value={this.state.file}
                  onChange={this.onChange}
                  placeholder="File"
                  hidden
                  required
                />
              </Button>
              &nbsp;
              {this.state.fileName}
            </DialogContent>

            <DialogActions>
              <Button onClick={this.handleProductClose} color="primary">
                Cancel
              </Button>
              <Button
                disabled={
                  this.state.name == "" ||
                  this.state.desc == "" ||
                  this.state.file == null
                }
                onClick={(e) => this.addProduct()}
                color="primary"
                autoFocus
              >
                Add Product
              </Button>
            </DialogActions>
          </div>
        </Dialog>

        <br />
        <div className="searchBar">
          <InputBase
            id="placeholder"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by product name"
            required
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>

        <TableContainer id="table">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">QR Code</TableCell>
                {/* <TableCell align="center">Discount</TableCell> */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    <a href={`/productView/${row._id}`}>{row.name}</a>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={`http://localhost:2000/${row.image}`}
                      href={`/productView/${row._id}`}
                      width="70"
                      height="70"
                    />
                  </TableCell>
                  <TableCell align="center">{row.desc}</TableCell>
                  <TableCell align="center">
                    <CustomizedDialogs link={row._id} />
                  </TableCell>
                  {/* <TableCell align="center">{row.discount}</TableCell> */}
                  {/* {this.setState.buyer_id = row.consumer_id} */}
                  {/* this.handleProductEditOpen(row) */}
                  <TableCell align="center">
                    {/* <div style={{display:" flex", marginLeft : "150px"}} class="contained"> */}
                    {!row.consumer_id && !row.is_delete && (
                      <Button
                        id="b2"
                        className="button_style"
                        variant="outlined"
                        color="primary"
                        size="medium"
                        onClick={(e) => {
                          const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                              confirmButton: "btn btn-success",
                              cancelButton: "btn btn-danger",
                            },
                            buttonsStyling: false,
                          });

                          swalWithBootstrapButtons
                            .fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, Update Product!",
                              cancelButtonText: "No, cancel!",
                              reverseButtons: true,
                            })
                            .then((result) => {
                              if (result.isConfirmed) {
                                this.handleProductEditOpen(row);
                              } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                              ) {
                              }
                            });
                        }}
                        style={{ marginRight: "20px" }}
                      >
                        Edit
                      </Button>
                    )}
                    {!row.consumer_id && !row.is_delete && (
                      <Button
                        id="b1"
                        className="button_style"
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        onClick={(e) => {
                          const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                              confirmButton: "btn btn-success",
                              cancelButton: "btn btn-danger",
                            },
                            buttonsStyling: false,
                          });

                          swalWithBootstrapButtons
                            .fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Yes, delete it!",
                              cancelButtonText: "No, cancel!",
                              reverseButtons: true,
                            })
                            .then((result) => {
                              if (result.isConfirmed) {
                                this.deleteProduct(row._id);
                                swalWithBootstrapButtons.fire(
                                  "Deleted!",
                                  "Your file has been deleted.",
                                  "success"
                                );
                              } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                              ) {
                                swalWithBootstrapButtons.fire(
                                  "Cancelled",
                                  "Your Uploaded product is Safe :)",
                                  "error"
                                );
                              }
                            });
                        }}
                      >
                        Delete
                      </Button>
                    )}
                    {row.is_delete && !row.consumer_id && (
                      <Button color="error" variant="outlined" disabled>
                        This Product Was Deleted By you
                      </Button>
                    )}

                    {row.consumer_id && (
                      <Button color="success" variant="outlined" disabled>
                        Product is Sold Out
                      </Button>
                    )}
                    {/* {row.consumer_id && <CustomWidthTooltip title="Name : ">
                  <Button sx={{ m: 1 }}><InfoIcon/> </Button>
                </CustomWidthTooltip>
                } */}
                    {row.consumer_id && (
                      <PopupState
                        variant="popover"
                        popupId="demo-popup-popover"
                      >
                        {(popupState) => (
                          <div>
                            <Button variant="text" {...bindTrigger(popupState)}>
                              <InfoIcon />
                            </Button>
                            <Popover
                              {...bindPopover(popupState)}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                            >
                              {/* {this.getBuyer_details(row.consumer_id)} */}
                              <Typography sx={{ p: 2 }}>
                                <h5>
                                  This Product was Ordered By{" "}
                                  <DoubleArrowIcon />
                                </h5>
                                <br />{" "}
                                <div
                                  style={{
                                    backgroundColor: "#ffd089",
                                    padding: "20px",
                                    borderRadius: "30px",
                                  }}
                                >
                                  {" "}
                                  Name : {row.popupdata.username} <br /> Mobile
                                  No : {row.popupdata.phone}
                                  <br /> Email Id : {row.popupdata.email}
                                </div>
                              </Typography>
                            </Popover>
                          </div>
                        )}
                      </PopupState>
                    )}
                    {/* </div> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Pagination
            count={this.state.pages}
            page={this.state.page}
            onChange={this.pageChange}
            color="primary"
          />
        </TableContainer>

        <br />
        <br />
        <br />

        <Divider variant="middle" />
        <br />
        <br />

        <h5 style={{ fontSize: "2rem", marginLeft: "70px" }} id="a2">
          {" "}
          <ShopIcon fontSize="large" /> Past Orders{" "}
        </h5>
        <br />
        <br />

        <div className="searchBar">
          <InputBase
            id="placeholder"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search1}
            onChange={this.onChange1}
            placeholder="Search by product name"
            required
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>

        <TableContainer id="table1">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">State</TableCell>
                {/* <TableCell align="center">Discount</TableCell> */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log(this.state.past_products)} */}
              {this.state.past_products &&
                this.state.past_products.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center" component="th" scope="row">
                      <a href={`/productView/${row._id}`}>{row.name}</a>
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={`http://localhost:2000/${row.image}`}
                        width="70"
                        height="70"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <img src="https://img.icons8.com/material/24/000000/gg.png" />
                      {row.price}
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      {!row.is_delivered && (
                        <Button color="success" variant="outlined">
                          Order Placed Sucussfully
                        </Button>
                      )}
                      {row.is_delivered && (
                        <Button color="success" variant="outlined">
                          Delevered
                        </Button>
                      )}
                      {
                        <PopupState
                          variant="popover"
                          popupId="demo-popup-popover"
                        >
                          {(popupState) => (
                            <div>
                              <Button
                                variant="text"
                                {...bindTrigger(popupState)}
                              >
                                <InfoIcon />
                              </Button>
                              <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                              >
                                {/* {console.log(row)} */}
                                {/* {this.getBuyer_details(row.consumer_id)} */}
                                <Typography sx={{ p: 2 }}>
                                  <h5>
                                    Pick Up Address For The Product{" "}
                                    <DoubleArrowIcon />{" "}
                                  </h5>{" "}
                                  <br />
                                  <div
                                    style={{
                                      backgroundColor: "#ffd089",
                                      padding: "15px",
                                      borderRadius: "30px",
                                    }}
                                  >
                                    {" "}
                                    Address : {row.Address}
                                    {console.log(row)}
                                    {row.in_time && row.out_time ? (
                                      <>
                                        <br /> Available between {row.in_time}{" "}
                                        and {row.out_time}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>{" "}
                                  <br /> <br />
                                  <iframe
                                    width="400"
                                    height="270"
                                    frameborder="1"
                                    scrolling="no"
                                    style={{
                                      // marginLeft: "50px",
                                      // marginTop: "50px",
                                      borderRadius: "30px",
                                      boxShadow:
                                        "0 5px 10px rgba(154, 160, 185, 0.05),0 15px 40px rgba(166, 173, 201, 0.2)",
                                    }}
                                    src="https://maps.google.com/maps?q=16.0282584,80.845985&hl=es;z=14&amp;output=embed"
                                  ></iframe>
                                  <br /> <br />
                                  {!row.is_delivered && (
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      size="medium"
                                      style={{
                                        marginLeft: "300px",
                                        marginTop: "10px",
                                      }}
                                      onClick={(e) => {
                                        this.deleveredProduct(row._id);
                                      }}
                                    >
                                      Recevied
                                    </Button>
                                  )}
                                  {row.is_delivered && (
                                    <Button
                                      variant="outlined"
                                      color="success"
                                      size="large"
                                      style={{
                                        marginLeft: "40px",
                                        marginTop: "10px",
                                      }}
                                      // onClick={(e) => {
                                      //   this.deleveredProduct(row._id);
                                      // }}
                                    >
                                      <CheckCircleIcon /> Order Sucussfully
                                      Delevered
                                    </Button>
                                  )}
                                </Typography>
                              </Popover>
                            </div>
                          )}
                        </PopupState>
                      }
                    </TableCell>
                    {/* <TableCell align="center">{row.discount}</TableCell> */}
                    <TableCell align="center">
                      {/* <Button
                    id='b2'
                    className="button_style"
                    variant="outlined"
                    color="primary"
                    size="medium"
                    onClick={(e) => this.handleProductEditOpen(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    id='b1'
                    className="button_style"
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    onClick={(e) => this.deleteProduct(row._id)}
                  >
                    Delete
                  </Button> */}
                      <Button
                        id="change"
                        variant="outlined"
                        disabled={row.is_delivered}
                        onClick={() =>
                          this.cancleProduct(row._id, row.price, row.user_id)
                        }
                      >
                        Cancel Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <br />
          <Pagination
            count={this.state.pages1}
            page={this.state.page1}
            onChange={this.pageChange1}
            color="primary"
          />
        </TableContainer>
      </div>
    );
  }
}
