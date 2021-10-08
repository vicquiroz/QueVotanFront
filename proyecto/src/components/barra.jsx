import React, {useState} from 'react';
import {Button,NavItem,Nav,ButtonDropdown,DropdownItem,DropdownToggle,DropdownMenu,Container,Row,Col} from 'reactstrap';
import { Link } from "react-router-dom";
function Barra(){
    const toggle = () => setOpen(!dropdownOpen);
    const [dropdownOpen, setOpen] = useState(false);
    return (
        <Container>
            <Row>
                <Nav className="navbar navbar-inverse bg-dark bg-gradient rounded-bottom">
                <Container className="container-fluid">
                    <NavItem>
                        <span className="navbar-brand mb-0 h1 text-light">¿Qué votan?</span>
                    </NavItem>
                    <NavItem>
                        <div className="btn-group">
                            <ul>
                            <Link to="/" style={{ textDecoration: 'none' }} className="text-light">
                                <Button className="btn-sm" color="primary">Inicio</Button>
                            </Link>
                                <Button className="btn-sm" color="secondary">Congreso</Button>
                                <Button className="btn-sm" color="secondary">Partidos</Button>
                                <Button className="btn-sm" color="secondary">Datos</Button>
                                <Link to="/acerca" className="text-light" style={{ textDecoration: 'none' }}>
                                    <Button className="btn-sm" color="secondary" >
                                    Acerca de
                                    </Button>
                                </Link>
                                
                                {/*
                                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle className="btn-sm" split color="primary">Listado</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Item 1</DropdownItem>
                                        <DropdownItem>Item 2</DropdownItem>
                                        <DropdownItem>Item 3</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                                */}
                            </ul>
                        </div>
                    </NavItem>
                    </Container>
                </Nav>
            </Row>
        </Container>
    );
  }

export default Barra;