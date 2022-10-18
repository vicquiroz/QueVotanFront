import React from 'react';
import paleta from "../resources/paleta.json"
import {Button,NavItem,Nav,Container} from 'reactstrap';
import { Link } from "react-router-dom";
import Logo from '../resources/Logo.webp'
import LogoDptIng from '../resources/Logo_depto_ing_informatica.webp'
import LogoIngCivil from '../resources/Logo_ing_civil_informatica.webp'
import Help from "./ayuda";
import {isMobile} from 'react-device-detect'

/**
 * It creates the navbar of the page and has the origin as internal parameter, to know from which section of the page it is being viewed and manage its components.
 * @returns {JSX.Element} the navigation bar of the page
 */
function Bar({origin}){
    //const toggle = () => set_Open(!dropdownOpen);
    //const [dropdownOpen, set_Open] = useState(false);
    var ImgWidthSize;
    var ImgHeightSize;
    if(isMobile===true){
        ImgWidthSize="100px"
        ImgHeightSize="26px"
    }
    else{
        ImgWidthSize="150px"
        ImgHeightSize="39px"
    }

/**
 * Function that checks that the origin is different from "about" to show the help button
 * @returns Help button for all pages other than "About"
 */
    function See_Origin(){
        if(origin!=="acercade") return(<Help origin={origin}/>)
    }
    return (
        <div>
                <Nav className="navbar navbar-inverse fixed-top" style={{backgroundColor:paleta.colorNavbar}}>
                <Container className="container-fluid">
                    <NavItem>
                        <span className="navbar-brand mb-0 h1 text-light">
                            <img onClick={()=>{window.location.href="/"}} style={{cursor:'pointer'}} src={Logo} alt="Logo Página" width={ImgWidthSize} height={ImgHeightSize}/>
                            <a href="https://www.inf.uct.cl/">
                            <img src={LogoDptIng} alt="Logo Departamento" width={ImgWidthSize} height={ImgHeightSize}/>
                            </a>
                            <a href="https://facultadingenieria.uct.cl/carreras/ingenieria-civil-en-informatica/">
                                <img src={LogoIngCivil} alt="Logo Carrera" width={ImgWidthSize} height={ImgHeightSize}/>
                            </a>
                        </span>

                    </NavItem>
                    <NavItem>
                        <div className="btn-group">
                            <Button onClick={()=>{window.location.href="/"}} style={{ textDecoration: 'none' }} className="text-light btn-sm" color="primary">
                                Inicio
                            </Button>
                            <Button onClick={()=>{window.location.href="/VotacionesImportantes/Nombre/Covid-19"}} style={{ textDecoration: 'none'}} className="text-light btn-sm" color="primary">
                                Votaciones Importantes
                            </Button>
                            {See_Origin()}
                            <Button onClick={()=>{window.location.href="/acerca"}} style={{ textDecoration: 'none' }} className="text-light btn-sm" color="danger" >
                                Acerca de
                            </Button>
                        </div>
                    </NavItem>
                    </Container>
                </Nav>
                <br /><br />
                </div>
    );
  }

export default Bar;