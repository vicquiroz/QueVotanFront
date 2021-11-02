import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row} from "reactstrap";
import {CustomView,isMobile} from 'react-device-detect'
import {useDispatch, useSelector} from 'react-redux'
import {obtenerTagsAccion} from '../redux/TagsDucks'
import {obtenerPrimerasVotacionesAccion} from '../redux/VotacionDucks'
function Principal(){
    const [votaciones,setVotaciones] = useState([]);
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)
    const primerasVotaciones = useSelector(store => store.primerasVotaciones.array)

    useEffect(()=> {
        dispatch(obtenerTagsAccion())
        dispatch(obtenerPrimerasVotacionesAccion())
    },[]);
    useEffect(()=>{
        setVotaciones(primerasVotaciones.filter((dat)=>{return dat.detalle[0].camaraOrigen!=="Senado"}))
    },[primerasVotaciones])

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

export default Principal;