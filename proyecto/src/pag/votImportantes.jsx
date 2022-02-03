import {React, useEffect,useState} from 'react'
import paleta from "../resources/paleta.json"
import {Container,Row,Col, Button} from 'reactstrap'
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
    },[handleMetodo,handleValor]);
    useEffect(()=>{
        setVotaciones(porNombre)
    },[porNombre])
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
                    <Link to='/VotacionesImportantes/Nombre/Covid-19' style={{width:"100%"}}>
                        <Button size="lg" style={{borderRadius:"10px",width:"100%"}} outline color={paleta.colorBotonesVotImp}>Covid-19</Button>
                    </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Link to='/VotacionesImportantes/Nombre/Retiro' style={{width:"100%"}}>
                        <Button size="lg" style={{borderRadius:"10px",width:"100%"}} outline color={paleta.colorBotonesVotImp}>Retiro de fondos</Button>
                    </Link>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Link to='/VotacionesImportantes/Nombre/Constituyente' style={{width:"100%"}}>
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
                    :""}
                </Col>
            </Row>
        </Container>
    )
}

export default VotacionesImportantes