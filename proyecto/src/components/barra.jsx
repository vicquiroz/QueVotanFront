import React from 'react';
import {Button,NavItem,Nav,Container} from 'reactstrap';
import { Link } from "react-router-dom";
import Logo from '../resources/Logo.webp'
import LogoDptIng from '../resources/Logo_depto_ing_informatica.webp'
import LogoIngCivil from '../resources/Logo_ing_civil_informatica.webp'
import Ayuda from "./ayuda";
import {isMobile} from 'react-device-detect'
function Barra({origen}){
    //const toggle = () => setOpen(!dropdownOpen);
    //const [dropdownOpen, setOpen] = useState(false);
    var ImgSize;
    if(isMobile===true){
        ImgSize="100px"
    }
    else{
        ImgSize="150px"
    }
    function verorigen(){
        if(origen!=="acercade") return(<Ayuda origen={origen}/>)
    }
    return (
        <div>
                <Nav className="navbar navbar-inverse bg-dark bg-gradient fixed-top">
                <Container className="container-fluid">
                    <NavItem>
                        <span className="navbar-brand mb-0 h1 text-light">
                            <Link to="/" style={{ textDecoration: 'none' }} className="text-light">
                                <img src={Logo} alt="Logo Página" width="150px"/>
                            </Link>
                            <a href="https://www.inf.uct.cl/">
                            <img src={LogoDptIng} alt="Logo Departamento" width={ImgSize}/>
                            </a>
                            <a href="https://facultadingenieria.uct.cl/carreras/ingenieria-civil-en-informatica/">
                                <img src={LogoIngCivil} alt="Logo Carrera" width={ImgSize}/>
                            </a>
                        </span>
                    
                    </NavItem>
                    <NavItem>
                        <div className="btn-group">
                            <ul>
                            <Link to="/" style={{ textDecoration: 'none' }} className="text-light">
                                <Button className="btn-sm" color="success">Inicio</Button>
                            </Link>
                            <Link to='/VotacionesImportantes/Nombre/"Covid-19"' style={{ textDecoration: 'none'}} className="text-light">
                                <Button className="btn-sm" color="primary">Votaciones Importantes</Button>
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