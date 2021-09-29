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
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <span className="navbar-brand mb-0 h1 text-light">¿Qué votan?</span>
                            </Link>
                    </NavItem>
                    <NavItem>
                        <div className="btn-group">
                            <ul>
                                <Button className="btn-sm" color="secondary">Congreso</Button>
                                <Button className="btn-sm" color="secondary">Partidos</Button>
                                <Button className="btn-sm" color="secondary">Datos</Button>
                                <Button className="btn-sm" color="secondary" >
                                    <Link to="/acerca" className="text-light" style={{ textDecoration: 'none' }}>
                                        Acerca de
                                    </Link>
                                </Button>
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