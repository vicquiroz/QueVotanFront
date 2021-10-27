import {React, useEffect,useState} from 'react'
import {Container,Row,Col, Button} from 'reactstrap'
import {isMobile,CustomView} from 'react-device-detect'
import { Link,useParams } from "react-router-dom";
import Barra from '../components/barra'
import {obtenerInfoConsultaAccion} from '../redux/InfoConsultaDucks'
import Tabla from '../components/tabla';
import {useSelector,useDispatch} from 'react-redux'
function VotacionesImportantes(){
    const {handleMetodo,handleValor} = useParams()
    const [votaciones,setVotaciones] = useState([]);
    const dispatch = useDispatch()
    const infoConsulta = useSelector(store => store.infoConsulta.array)
    useEffect(()=> {
        if(handleMetodo==="Nombre"){
            dispatch(obtenerInfoConsultaAccion("nombre",handleValor))
        }
    },[handleMetodo,handleValor]);
    useEffect(()=>{
        setVotaciones(infoConsulta.filter((dat)=>{return (dat.detalle!=="No encontrado" && dat.detalle[0].camaraOrigen!=="Senado" && dat.detalle[0].VotacionesAsoc[0].quorum!=="Quórum Simple")}))
        
    },[infoConsulta])
    return(
        <Container>
            <Row>
                <Col>
                    <Barra
                        origen={"principal"}
                    />
                </Col>
            </Row>
            <CustomView condition={isMobile===true}>
                <br/>
            </CustomView>
            <br/>
            <Row>
                <Col>
                    <h2 className="text-light">Votaciones Importantes</h2>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Link to='/VotacionesImportantes/Nombre/"Covid-19"' style={{width:"100%"}}>
                        <Button size="lg" style={{borderRadius:"10px",width:"100%"}} outline color="light">Covid-19</Button>
                    </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Link to='/VotacionesImportantes/Nombre/"Retiro"' style={{width:"100%"}}>
                        <Button size="lg" style={{borderRadius:"10px",width:"100%"}} outline color="light">Retiro de fondos</Button>
                    </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Link to='/VotacionesImportantes/Nombre/"Constituyente"&"Constituyentes' style={{width:"100%"}}>
                        <Button size="lg" style={{borderRadius:"10px",width:"100%"}} outline color="light">Constituyentes</Button>
                    </Link>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Tabla
                        primerasVotaciones={votaciones}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default VotacionesImportantes