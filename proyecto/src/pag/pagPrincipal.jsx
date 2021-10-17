import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row} from "reactstrap";

import {useDispatch, useSelector} from 'react-redux'
import {obtenerTagsAccion} from '../redux/TagsDucks'
import {obtenerPrimerasVotacionesAccion} from '../redux/VotacionDucks'
function Principal(){

    const [busqueda, setBusqueda] = useState(); 
    const [idTag, setIdTag] = useState();
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)
    const primerasVotaciones = useSelector(store => store.primerasVotaciones.array)

    useEffect(()=> {
        dispatch(obtenerTagsAccion())
        dispatch(obtenerPrimerasVotacionesAccion())
    },[]);
    
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
                        setBusqueda={setBusqueda}
                        setIdTag={setIdTag}
                        tags={tags}
                        
                    />
                </Col>
            </Row >
            <Row>
                <Col>
                    <Tabla
                        busqueda={busqueda}
                        primerasVotaciones={primerasVotaciones.filter((dat)=>{return dat.detalle[0].camaraOrigen!=="Senado"})}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Principal;