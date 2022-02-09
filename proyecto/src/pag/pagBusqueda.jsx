import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row,Alert} from "reactstrap";
import {useParams} from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import {obtenerTagsAccion} from '../redux/TagsDucks'
import {CustomView,isMobile} from 'react-device-detect'
import {obtenerPorMateriaAccion} from '../redux/busqueda/porMateria'
import {obtenerPorIdAccion} from '../redux/busqueda/porId'
import {obtenerPorBoletinAccion} from '../redux/busqueda/porBoletin'
import {obtenerPorNombreAccion} from '../redux/busqueda/porNombre'
import {obtenerPorFechaAccion} from '../redux/busqueda/porFecha'
function Busqueda(){
    const {handleMetodo,handleValor} = useParams()
    const [votaciones,setVotaciones] = useState([]);
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)
    const porMateria = useSelector(store=>store.porMateria.array)
    const porId = useSelector(store=>store.porId.array)
    const porBoletin = useSelector(store=>store.porBoletin.array)
    const porNombre = useSelector(store=>store.porNombre.array)
    const porFecha = useSelector(store=>store.porFecha.array)
    useEffect(()=> {
        dispatch(obtenerTagsAccion())
        switch (handleMetodo) {
            case "ID":
                dispatch(obtenerPorIdAccion(handleValor))
                break;
            case "Boletín":
                dispatch(obtenerPorBoletinAccion(handleValor,1))
                break;
            case "Materia":
                dispatch(obtenerPorMateriaAccion(handleValor,1))
                break;
            case "Nombre":
                dispatch(obtenerPorNombreAccion(handleValor,1))
                break;
            case "Fecha":
                dispatch(obtenerPorFechaAccion(handleValor,1))
                break;
            default:
                break;
        }
    },[]);
    useEffect(()=> {
        switch (handleMetodo) {
            case "ID":
                setVotaciones(porId)
                break;
            case "Materia":
                if(typeof(porMateria!=="string")) setVotaciones(porMateria)
                break;
            case "Boletín":
                if(typeof(porBoletin)!=="string") setVotaciones(porBoletin)
                break;
            case "Nombre":
                if(typeof(porNombre)!=="string") setVotaciones(porNombre)
                break;
            case "Fecha":
                if(typeof(porFecha)!=="string") setVotaciones(porFecha)
                break;
            default:
                break;
        }
    },[porMateria,porId,porBoletin,porNombre,porFecha]);
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
                <br/>
            </CustomView>
            <br/>
            <Row style={{
                "marginTop":"30px",
                "marginBottom":"10px"
                }}>
                <Col>
                    <Buscador
                        tags={tags}
                        estado={handleMetodo}
                        valor={handleValor}
                    />
                </Col>
            </Row >
            <Row>
                <Col>
                {votaciones.length>0?
                    <Tabla
                        primerasVotaciones={votaciones} metodo={handleMetodo}
                    />
                    :
                <Alert color="danger">
                    <h4 className="alert-heading">Error</h4>
                    <p>No se han encontrado votaciones con los parámetros especificados</p>
                    <hr />
                    <p>{handleMetodo}: {handleValor}</p>
                </Alert>
                }
                </Col>
            </Row>
        </Container>
    );
}

export default Busqueda;