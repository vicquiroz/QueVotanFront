import React from 'react';
import {Button,NavItem,Nav,Container} from 'reactstrap';
import { Link } from "react-router-dom";
import Logo from '../resources/Logo.webp'
import Ayuda from "./ayuda";
function Barra({origen}){
    //const toggle = () => setOpen(!dropdownOpen);
    //const [dropdownOpen, setOpen] = useState(false);
    function verorigen(){
        if(origen!=="acercade") return(<Ayuda origen={origen}/>)
    }
    return (
        <div>
                <Nav className="navbar navbar-inverse bg-dark bg-gradient fixed-top">
                <Container className="container-fluid">
                    <NavItem>
                    <Link to="/" style={{ textDecoration: 'none' }} className="text-light">
                        <span className="navbar-brand mb-0 h1 text-light"><img src={Logo} alt="logo de la pagina" width="150px"/></span>
                    </Link>
                    </NavItem>
                    <NavItem>
                        <div className="btn-group">
                            <ul>
                            <Link to="/" style={{ textDecoration: 'none' }} className="text-light">
                                <Button className="btn-sm" color="primary">Inicio</Button>
                            </Link>
                            {verorigen()}
                                {/*<Button className="btn-sm" color="secondary">Congreso</Button>*/}
                                {/*<Button className="btn-sm" color="secondary">Partidos</Button>*/}
                                {/*<Button className="btn-sm" color="secondary">Datos</Button>*/}
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
                <br /><br />
                </div>
    );
  }

export default Barra;