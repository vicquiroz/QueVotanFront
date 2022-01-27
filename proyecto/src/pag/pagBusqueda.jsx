import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row} from "reactstrap";
import { useParams } from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import {obtenerTagsAccion} from '../redux/TagsDucks'
import {obtenerInfoConsultaAccion} from '../redux/InfoConsultaDucks'
import {obtenerPreviewVotacionAccion} from '../redux/previewVotDucks'
import {CustomView,isMobile} from 'react-device-detect'
function Busqueda(){
    const {handleMetodo,handleValor} = useParams()
    const [votaciones,setVotaciones] = useState([]);
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)
    const infoConsulta = useSelector(store => store.infoConsulta.array)
    const previewVot = useSelector(store=> store.previewVotacion.array)
    useEffect(()=> {
        dispatch(obtenerTagsAccion())
        if(handleMetodo==="ID"){
            dispatch(obtenerPreviewVotacionAccion(handleValor))
        }
        else{
            if(handleMetodo==="Boletín"){
                dispatch(obtenerInfoConsultaAccion("numeroBoletin",handleValor))
            }
            else{
                if(handleMetodo==="Materia"){
                    dispatch(obtenerInfoConsultaAccion("Materias",handleValor))
                }
                else if(handleMetodo==="Nombre"){
                    dispatch(obtenerInfoConsultaAccion("nombre",handleValor))
                }
            }
        }
    },[]);
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
                    <Tabla
                        primerasVotaciones={votaciones.filter((dat)=>{return dat.detalle!=="No encontrado"})}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Busqueda;