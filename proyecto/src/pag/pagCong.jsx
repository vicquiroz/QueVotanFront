import React,{useEffect} from "react";
import Barra from "../components/barra";
import {Container, Col, Row} from "reactstrap";
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { obtenerInfoDiputadosAccion } from '../redux/InfoDipDucks';
function Congresista(){
    const {handle} = useParams()
    const dispatch = useDispatch()
    const infoDip = useSelector(store => store.infoDiputados.array)
    useEffect(()=> {
            dispatch(obtenerInfoDiputadosAccion(handle))
    },[]);
    var infoD="";
    var titleD;
    if(typeof(infoDip)==="string"){
        if(infoDip.includes("Error")){
            titleD=handle
            infoD="No se ha encontrado información sobre dicho congresista en la base de datos. Esto puede deberse a que este diputado pertenece a un congreso antiguo, o no existen datos sobre el mismo."
        }
        else{
            infoD=infoDip
        }
    }
    return(
        <Container>
            <Row>
                <Col>
                    <Barra/>
                </Col>
            </Row>
            <Container>
                <Row>
                    <Col>
                        <h1>Congresista {titleD}</h1>
                    </Col>  
                </Row>
                <Row>
                    <p>
                        {infoD} 
                    </p>
                </Row>
            </Container>
        </Container>
    );
}

export default Congresista;