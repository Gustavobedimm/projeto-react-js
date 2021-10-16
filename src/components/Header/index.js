import React from 'react';
import  {Link }  from 'react-router-dom';
import {AreaHeader} from './styled';
import { Navbar, Container, Nav } from 'react-bootstrap';



function Header(){
   return (
  <AreaHeader>
  <Navbar bg="dark" expand="lg" variant="dark">
  <Container>
    <Navbar.Brand><img src={process.env.PUBLIC_URL + '/casafer.png'} className="img"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Link to="/" className="links">Pedidos de Venda</Link>
      <Link to="/Logout" className="links">Notas de Venda</Link>
        
        
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</AreaHeader>

  );
}
export default Header;
//<Link to="/" className="links">Inicio</Link>
//<Link to="/Logout" className="links">Sair</Link>