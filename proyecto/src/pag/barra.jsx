import React, {useState} from 'react';
import {Button,NavItem,Nav,ButtonDropdown,DropdownItem,DropdownToggle,DropdownMenu,Container,} from 'reactstrap';
import { Link } from "react-router-dom";
function Barra(){
    const toggle = () => setOpen(!dropdownOpen);
    const [dropdownOpen, setOpen] = useState(false);
    return (
        <Container>
                <Nav className="navbar bg-dark bg-gradient rounded-bottom">
                    <NavItem>
                        <Container>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <span className="navbar-brand mb-0 h1 text-light">¿Qué votan?</span>
                            </Link>
                        </Container>
                    </NavItem>
                    <NavItem>
                        <div className="btn-group btn-sm">
                            <Button color="secondary">Congreso</Button>
                            <Button color="secondary">Partidos</Button>
                            <Button color="secondary">Datos</Button>
                            <Button color="secondary">Acerca de</Button>
                            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle split color="primary">Listado</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Item 1</DropdownItem>
                                    <DropdownItem>Item 2</DropdownItem>
                                    <DropdownItem>Item 3</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </div>
                    </NavItem>
                </Nav>
        </Container>
    );
  }

export default Barra;