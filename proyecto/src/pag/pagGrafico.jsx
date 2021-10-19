import React, {useState,useEffect}  from "react";
import GraficoPrincipal from "../components/grafico";
import GraficoBarra from "../components/graficobarra";
import Inform from "../components/infoBrush";
import MostrarLista from "../components/listado";
import Barra from "../components/barra";
import {Container, Col, Row} from "reactstrap";
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {obtenerInfoGraficoAccion} from '../redux/InfoGrafDucks'
import {obtenerPreviewVotacionAccion} from '../redux/previewVotDucks'
function PagGrafico(){
    function isEmpty(obj){
        return Object.keys(obj).length===0
    }
    const {handle} = useParams()
    const [idCon, setId] = useState();
    const [xyBrush, setXY] = useState();
    const dispatch = useDispatch()
    const infoGrafico = useSelector(store => store.infoGrafico.array)
    const previewVot = useSelector(store => store.previewVotacion.array)
    
    useEffect(()=>{
        dispatch(obtenerInfoGraficoAccion(handle))
        dispatch(obtenerPreviewVotacionAccion(handle))
    },[])
    console.log(previewVot[0])
    return(
        <Container>
            {!isEmpty(infoGrafico) && !isEmpty(previewVot)?
            <div>
            <Row>
                <Col>
                    <Barra/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <br />
                    <h2 className="text-light"  style={{backgroundColor:"rgba(50,50,50,0.95)",borderRadius:"10px"}}>
                        <Container>{previewVot[0].detalle[0].nombre}</Container>
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="d-flex justify-content-center">
                        <GraficoPrincipal className="col-12"
                            setId={setId}
                            setXY={setXY}
                            datoswnominate={infoGrafico}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                
            </Row>
            <Row>
                <Col className="col-12 col-sm-6">
                    <div className="d-flex justify-content-center">
                        <GraficoBarra
                            idCon={idCon}
                            datoswnominate={infoGrafico}
                        />
                    </div>
                </Col>
                <Col className="col-12 col-sm-6">
                    <Inform
                        pos={xyBrush}
                        datoswnominate={infoGrafico}
                    />
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <MostrarLista
                        idCon={idCon}
                        datoswnominate={infoGrafico}
                    />
                </Col>
            </Row>
            </div>
            :[]}
        </Container>
    )
    
}

export default PagGrafico;