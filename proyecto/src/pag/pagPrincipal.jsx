import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row} from "reactstrap";

import {useDispatch, useSelector} from 'react-redux'
import {obtenerTagsAccion} from '../redux/TagsDucks'
import {obtenerPrimerasVotacionesAccion} from '../redux/VotacionDucks'
import {obtenerInfoConsultaAccion} from '../redux/InfoConsultaDucks'
import {obtenerPreviewVotacionAccion} from '../redux/previewVotDucks'
function Principal(){
    function isEmpty(obj){
        return Object.keys(obj).length===0
    }
    const [busqueda, setBusqueda] = useState(); 
    const [idTag, setIdTag] = useState();
    const [votaciones,setVotaciones] = useState([]);
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)
    const primerasVotaciones = useSelector(store => store.primerasVotaciones.array)
    const consulta = useSelector(store => store.infoConsulta.array)
    const previewVotacion = useSelector(store => store.previewVotacion.array)
    useEffect(()=> {
        dispatch(obtenerTagsAccion())
        dispatch(obtenerPrimerasVotacionesAccion())
    },[]);
    useEffect(()=>{
        setVotaciones(primerasVotaciones.filter((dat)=>{return dat.detalle[0].camaraOrigen!=="Senado"}))
    },[primerasVotaciones])

    useEffect(()=>{
        /*if(busqueda===0){
            dispatch(obtenerPreviewVotacionAccion(idTag))
            if(previewVotacion!==[]){
                setVotaciones(previewVotacion)
            }
        }
        else if(busqueda!==0){*/
            dispatch(obtenerInfoConsultaAccion(busqueda,idTag))
            if(consulta!=="Not valid"){
                setVotaciones(consulta)
            }
        //}
    },[busqueda,idTag])

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
                        primerasVotaciones={votaciones}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Principal;