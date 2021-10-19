import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row} from "reactstrap";
import { useParams } from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import {obtenerTagsAccion} from '../redux/TagsDucks'
import {obtenerInfoConsultaAccion} from '../redux/InfoConsultaDucks'
function Busqueda(){
    const {handleMetodo,handleValor} = useParams()
    const [idTag, setIdTag] = useState();
    const [votaciones,setVotaciones] = useState([]);
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)
    const infoConsulta = useSelector(store => store.infoConsulta.array)
    useEffect(()=> {
        dispatch(obtenerTagsAccion())
        dispatch(obtenerInfoConsultaAccion(handleMetodo,handleValor))
    },[]);

    useEffect(()=>{
        setVotaciones(infoConsulta.filter((dat)=>{return dat.detalle[0].camaraOrigen!=="Senado"}))
    },[infoConsulta])

    return(
        <Container>
            <Row>
                <Col>
                    <Barra/>
                </Col>
            </Row>
            <Row style={{
                "marginTop":"30px",
                "marginBottom":"10px"
                }}>
                <Col>
                    <Buscador
                        tags={tags}
                    />
                </Col>
            </Row >
            <Row>
                <Col>
                    <Tabla
                        primerasVotaciones={votaciones.filter((dat)=>{return dat.detalle!=="No encontrado"})}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Busqueda;