import React,{useEffect} from "react";
import Barra from "../components/barra";
import {Container, Col, Row} from "reactstrap";
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { obtenerInfoDiputadosAccion } from '../redux/InfoDipDucks';
import { obtenerIntervenCongresAccion} from '../redux/IntervenCongresDucks'
function Congresista(){
    const {handle} = useParams()
    const dispatch = useDispatch()
    const infoDip = useSelector(store => store.infoDiputados.array)
    const intervenCongres = useSelector(store => store.intervenCongres.array)
    useEffect(()=> {
            dispatch(obtenerInfoDiputadosAccion(handle))
            dispatch(obtenerIntervenCongresAccion(handle))
    },[]);
    //console.log(intervenCongres)
    var infoD="";
    var titleD;
    if(typeof(infoDip)==="string"){
        if(infoDip.includes("Error")){
            titleD=handle
            infoD="No se ha encontrado información sobre dicho diputado en la base de datos. Esto puede deberse a que este diputado pertenece a un congreso antiguo, o no existen datos sobre el mismo."
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
                        <h1>Diputado {titleD}</h1>
                    </Col>  
                </Row>
                <Row>
                    <Col>
                        <p>
                            {infoD} 
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Votaciones donde ha participado</h4>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Congresista;