import {React, useEffect,useState} from 'react'
import paleta from "../resources/paleta.json"
import {Container,Row,Col, Button,Alert} from 'reactstrap'
import {isMobile,CustomView} from 'react-device-detect'
import { Link,useParams } from "react-router-dom";
import Barra from '../components/barra'
import {obtenerPorNombreAccion} from '../redux/busqueda/porNombre'
import Tabla from '../components/tabla';
import {useSelector,useDispatch} from 'react-redux'
function VotacionesImportantes(){
    const {handleMetodo,handleValor} = useParams()
    const [votaciones,setVotaciones] = useState([]);
    const dispatch = useDispatch()
    const porNombre = useSelector(store=>store.porNombre.array)
    useEffect(()=> {
        if(handleMetodo==="Nombre"){
            dispatch(obtenerPorNombreAccion(handleValor,1))
        }
    },[handleValor]);
    useEffect(()=>{
        setVotaciones(porNombre)
    },[porNombre])
    const MostrarVot = (metodo) =>{
        window.location.href="/VotacionesImportantes/Nombre/"+metodo
    }
    return(
        <Container>
            <Row>
                <Col>
                    <Barra
                        origen={"vot-importantes"}
                    />
                </Col>
            </Row>
            <CustomView condition={isMobile===true}>
                <br/>
                <br/>
            </CustomView>
            <br/>
            <br/>
            <Row>
                <Col>
                    <h2 className={paleta.colorTextoBootstrap}>Votaciones Importantes</h2>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Link onClick={()=>{MostrarVot("Covid-19")}} style={{width:"100%"}}>
                        <Button size="lg" style={{borderRadius:"10px",width:"100%"}} outline color={paleta.colorBotonesVotImp}>Covid-19</Button>
                    </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Link onClick={()=>{MostrarVot("Retiro")}} style={{width:"100%"}}>
                        <Button size="lg" style={{borderRadius:"10px",width:"100%"}} outline color={paleta.colorBotonesVotImp}>Retiro de fondos</Button>
                    </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Link onClick={()=>{MostrarVot("Constituyente")}} style={{width:"100%"}}>
                        <Button size="lg" style={{borderRadius:"10px",width:"100%"}} outline color={paleta.colorBotonesVotImp}>Constituyentes</Button>
                    </Link>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                {votaciones.length>0?
                    <Tabla
                        primerasVotaciones={votaciones} metodo={handleMetodo}
                    />
                    :<Alert color="danger">
                        <h4 className="alert-heading">Error</h4>
                        <p>No se han encontrado votaciones con los parámetros especificados</p>
                        <hr />
                        <p>{handleMetodo}: {handleValor}</p>
                    </Alert>}
                </Col>
            </Row>
        </Container>
    )
}

export default VotacionesImportantes