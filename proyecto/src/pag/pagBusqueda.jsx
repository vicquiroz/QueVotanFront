import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row} from "reactstrap";
import {useParams} from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import {obtenerTagsAccion} from '../redux/TagsDucks'
import {obtenerInfoConsultaAccion} from '../redux/InfoConsultaDucks'
import {CustomView,isMobile} from 'react-device-detect'
import {obtenerPorMateriaAccion} from '../redux/busqueda/porMateria'
import {obtenerPorIdAccion} from '../redux/busqueda/porId'
function Busqueda(){
    const {handleMetodo,handleValor} = useParams()
    const [votaciones,setVotaciones] = useState([]);
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)
    const porMateria = useSelector(store=>store.porMateria.array)
    const porId = useSelector(store=>store.porId.array)
    useEffect(()=> {
        dispatch(obtenerTagsAccion())
        switch (handleMetodo) {
            case "ID":
                dispatch(obtenerPorIdAccion(handleValor))
                break;
            case "Boletín":
                dispatch(obtenerInfoConsultaAccion("numeroBoletin",handleValor))
                break;
            case "Materia":
                dispatch(obtenerPorMateriaAccion(handleValor,1))
                break;
            case "Nombre":
                dispatch(obtenerInfoConsultaAccion("nombre",handleValor))
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
                setVotaciones(porMateria)
                break;
            default:
                break;
        }
    },[porMateria,porId]);
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
                    />
                </Col>
            </Row >
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
    );
}

export default Busqueda;