import React, {useState,useEffect}  from "react";
import Bar from "../components/barra";
import Table from "../components/tabla";
import Seeker from "../components/buscador";
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
/**
 *Page where the searches carried out are rendered, first the actions to search for the votes are carried out according to a method, when they are updated in the store they are updated in "Votaciones" with the "SetVotaciones" to be able to be rendered.
 * @returns < Container > with the entire structure to draw the Table with the corresponding cards.
 */
function Busqueda(){
    const {handleMetodo,handle_Value} = useParams()
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
                dispatch(obtenerPorIdAccion(handle_Value))
                break;
            case "Boletín":
                dispatch(obtenerPorBoletinAccion(handle_Value,1))//second parameter is the page
                break;
            case "Materia":
                dispatch(obtenerPorMateriaAccion(handle_Value,1))
                break;
            case "Nombre":
                dispatch(obtenerPorNombreAccion(handle_Value,1))
                break;
            case "Fecha":
                dispatch(obtenerPorFechaAccion(handle_Value,1))
                break;
            default:
                break;
        }
    },[]);
    useEffect(()=> {
        switch (handleMetodo) {
            case "ID":
                if(typeof(porMateria!=="string")) setVotaciones(porId)
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
    },[porMateria,porId,porBoletin,porNombre,porFecha]);//changes in the voting array are updated
    return(
        <Container>
            <Row>
                <Col>
                    <Bar
                        origin={"principal"}
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
                    <Seeker
                        tags={tags}
                        condition={handleMetodo}
                        value={handle_Value}
                    />
                </Col>
            </Row >
            <Row>
                <Col>
                {votaciones.length>0?
                    <Table
                        first_Votes={votaciones} method={handleMetodo}
                    />
                    :
                <Alert color="danger">
                    <h4 className="alert-heading">Error</h4>
                    <p>No se han encontrado votaciones con los parámetros especificados</p>
                    <hr />
                    <p>{handleMetodo}: {handle_Value}</p>
                </Alert>
                }
                </Col>
            </Row>
        </Container>
    );
}

export default Busqueda;