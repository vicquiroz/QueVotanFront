import React, {useState,useEffect}  from "react";
import paleta from "../resources/paleta.json"
import GraficoPrincipal from "../components/grafico";
import GraficoBarra from "../components/graficobarra";
import Inform from "../components/infoBrush";
import MostrarLista from "../components/listado";
import Barra from "../components/barra";
import {Container, Col, Row} from "reactstrap";
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {obtenerInfoGraficoAccion} from '../redux/InfoGrafDucks'
import {CustomView,isMobile} from 'react-device-detect'


function PagGrafico(){
    function isEmpty(obj){
        return Object.keys(obj).length===0
    }
    const {handle} = useParams()
    const [idCon, setId] = useState();
    const [xyBrush, setXY] = useState();
    const [Titulo,setTitulo] = useState("")
    const [TFlag,setTFlag] = useState(true)
    const [FlagUE,setFlagUE] = useState(false)
    const dispatch = useDispatch()
    const infoGrafico = useSelector(store => store.infoGrafico.array)
    useEffect(()=>{
        dispatch(obtenerInfoGraficoAccion(handle))
    },[])
    useEffect(()=>{
        //Filtro++
        if(!isEmpty(infoGrafico)){
            setFlagUE(true)
        }
    },[infoGrafico])

    useEffect(()=>{
        if(!isEmpty(infoGrafico)){
            setTitulo(infoGrafico.votaciones.nombre.substring(0,80)+"...")
        }
    },[infoGrafico])
    return(
        <Container>
            {!isEmpty(infoGrafico) && FlagUE===true?
            <div>
            <Row>
                <Col>
                    <Barra
                        origen={"grafico"}
                    />
                </Col>
            </Row>
            <CustomView condition={isMobile===true}>
                <br/>
                <br/>
            </CustomView>
            <br/>
            <Row>
                <Col>
                    <br />
                    <h3 className={paleta.colorTextoBootstrap}  style={{cursor:"pointer",backgroundColor:paleta.fondoClaro,borderRadius:"10px"}}>
                        <Container onClick={()=>{
                            if(TFlag===true){
                                setTitulo(infoGrafico.votaciones.nombre)
                                setTFlag(false)
                            }
                            else{
                                setTitulo(infoGrafico.votaciones.nombre.substring(0,80)+"...")
                                setTFlag(true)
                            }
                        }}>
                            {Titulo}
                        </Container>
                    </h3>
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