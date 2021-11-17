/* eslint-disable camelcase */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import NavBar from "./NavBar.js";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import image from "../images/profile.png";
import { serverUrl } from "../Pages/ServerUrl";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    const data = localStorage.getItem("user");
    this.state = {
      validated: false,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone"),
      mileage: localStorage.getItem("mileage"),
    };
    // this.props.getUser();
  }

  componentDidMount() {
    const id = localStorage.getItem("id");
    axios.get(`${serverUrl}/api/profile/${id}`).then((res) => {
      const { name, email, phone, mileage } = res.data;
      this.setState({
        ...this.state,
        name,
        email,
        phone,
        mileage,
      });
    });
  }

  persist = () => {
    const data = localStorage.getItem("user");
    console.log("check profile", data);
    this.setState.email = data.email;
    this.setState.name = data.name;
    this.setState.phone = data.phone;
    this.setState.mileage = data.mileage;
  };

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  phoneChangeHandler = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onAvatarChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };

  onUpload = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
    } else {
      e.preventDefault();
      const data = this.state.file;
      //   this.props.updateUserImage(data);
    }
  };

  // onSave = (e) => {
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     this.setState({
  //       validated: true,
  //     });
  //   } else {
  //     e.preventDefault();
  //     const data = { ...this.state };
  //   //   this.props.updateUser(data);
  //   }
  // }

  onSave = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
    } else {
    e.preventDefault();
    console.log(this.state.email);
    //send POST request to "/login"
    const { email, name, phone } = this.state
   axios.put(`${serverUrl}/api/profile`, this.state)
       .then((response) => {
           console.log(response.data);
           const { password, ...user } = response.data

          if (response.status === 200) {
            // localStorage.removeItem('idToken');
            localStorage.removeItem("name");
            localStorage.removeItem("phone");
            localStorage.removeItem("mileage");
            localStorage.removeItem("user");
            // localStorage.setItem("idToken", response.data.idToken)
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("phone", response.data.phone);
            localStorage.setItem("mileage", response.data.mileage);
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "/searchflight";
            //    const navigate  = useNavigate();
            //    navigate('/profile');
          } else if (response.status === 404) {
            toast.error("User Profile not found", {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
        })
        .catch(() => {
          toast.error("Incorrect Profile Changes", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  render() {
    // this.persist();
    let redirectVar = null;
    // if (this.state.message === 'PROFILE_UPDATE_SUCCESS') {
    //   localStorage.setItem('name', this.props.user.name);
    //   redirectVar = <Navigate to="/home" />;
    // }
    // let image = null;
    let filename = "Select image file";
    // if (this.props.user.message === 'PROFILE_UPDATE_IMAGE_SUCCESS') {
    //   filename = 'Select image file';
    // }
    // if (this.state.image) {
    //   image = this.state.image;
    // }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div className="mt-5">
          <Row className="mt-3">
            <Col md={{ span: 3, offset: 1 }}>
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.onUpload}
              >
                <Form.Row>
                  <Form.Group as={Col} md={{ span: 3, offset: 1 }}>
                    <Image style={{ width: "12rem" }} src={image} />
                  </Form.Group>
                </Form.Row>
                {/* <Form.Row>
                  <Form.Group as={Col} md={3}>
                    <Form.File
                      className="mt-3"
                      name="image"
                      id="image"
                      style={{ width: '15rem' }}
                      accept="image/*"
                      label={filename}
                      onChange={this.onAvatarChange}
                      custom
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please upload valid profile picture.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={3} className="d-flex" style={{ justifyContent: 'flex-end' }}>
                    <Button type="submit">Upload</Button>
                  </Form.Group>
                </Form.Row> */}
              </Form>
            </Col>

            <Col md={{ offset: 1 }} className="mt-5 pt-5">
              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.onSave}
              >
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.nameChangeHandler}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={this.state.email}
                      // onChange={this.onChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name="phone"
                      type="number"
                      value={this.state.phone}
                      onChange={this.onChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter valid phone number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label>Airline Mileage</Form.Label>
                    <div>{this.state.mileage}</div>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Button
                      variant="info"
                      type="submit"
                      style={{ width: "4.5rem" }}
                    >
                      Save
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

// Profile.propTypes = {
//   getUser: PropTypes.func.isRequired,
//   updateUser: PropTypes.func.isRequired,
//   updateUserImage: PropTypes.func.isRequired,
// };

// // const mapState = (state) => ({
// //   user: state.userProfile.user,
// // });

// // export default connect(mapState, { getUser, updateUser, updateUserImage })(Profile);
