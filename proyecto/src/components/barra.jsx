import React from 'react';
import paleta from "../resources/paleta.json"
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
    function verorigen(){
        if(origen!=="acercade") return(<Ayuda origen={origen}/>)
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
                            {verorigen()}
                            <Button onClick={()=>{window.location.href="/acerca"}} style={{ textDecoration: 'none' }} className="text-light btn-sm" color="primary" >
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

export default Barra;