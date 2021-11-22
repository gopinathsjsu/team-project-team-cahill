// import {
//   Container,
//   Navbar,
//   Nav,
//   Form,
//   NavDropdown,
//   FormControl,
//   Button,
// } from "react-bootstrap";

// function App() {
//   return (
//     <Container fluid>
//       <Navbar bg="light" expand="lg">
//         <Container>
//           <Navbar.Brand href="#home">SJSU Airlines</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <Nav.Link href="#home">Home</Nav.Link>
//               <Nav.Link href="#link">Link</Nav.Link>
//               <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                 <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.2">
//                   Another action
//                 </NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.3">
//                   Something
//                 </NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="#action/3.4">
//                   Separated link
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </Container>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Purchase from "./Pages/Purchase";
import SearchFlight from "./Pages/SearchFlight";
import MyBooking from "./Pages/MyBooking";
import AdminHome from "./Pages/AdminHome";

function Routing() {
  return (
    // console.log("inside routing");
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/purchase" element={<Purchase />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/searchflight" element={<SearchFlight />} />
      <Route exact path="/booking" element={<MyBooking />} />
      <Route exact path="/adminhome" element={<AdminHome />} />
    </Routes>
  );
}

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
    //  {/* </Provider> */}
  );
}

export default App;
