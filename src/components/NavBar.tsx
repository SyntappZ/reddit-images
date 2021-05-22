import React from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  Container,
} from "react-bootstrap";
import "../css/nav.css";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" className="py-4">
      <Container>
        <Navbar.Brand href="#home">Reddit Images</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Images</Nav.Link>
          <Nav.Link href="#features">Gifs</Nav.Link>
          
        </Nav>

        <Form inline>
          <FormControl type="text" placeholder="/r/Subreddit" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar;
