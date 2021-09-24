import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row} from "reactstrap";

import {useDispatch, useSelector} from 'react-redux'
import {obtenerTagsAccion} from '../redux/TagsDucks'
function Principal(){

    const [busqueda, setBusqueda] = useState(); 
    const [idTag, setIdTag] = useState();
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)

    useEffect(()=> {
        dispatch(obtenerTagsAccion())
    },[]);
    return(
        <Container>
            <Row>
                <Col>
                    <Barra/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Buscador
                        setBusqueda={setBusqueda}
                        setIdTag={setIdTag}
                        tags={tags}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabla
                        busqueda={busqueda}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Principal;