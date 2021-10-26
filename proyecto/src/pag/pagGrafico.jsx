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
    const dispatch = useDispatch()
    const infoGrafico = useSelector(store => store.infoGrafico.array)
    const previewVot = useSelector(store => store.previewVotacion.array)
    useEffect(()=>{
        dispatch(obtenerInfoGraficoAccion(handle))
        dispatch(obtenerPreviewVotacionAccion(handle))
    },[])
    //Filtro
    if(!isEmpty(infoGrafico)){
        infoGrafico.wnominate=infoGrafico.wnominate.filter((dat)=> {
            return dat.coord1D!==undefined && dat.coord2D!==undefined && dat.party!==undefined && dat.Nombre!==undefined && dat.ID!==undefined && Object.keys(infoGrafico.votacion[0]).includes(String(dat.ID))
        })
    }
    useEffect(()=>{
        if(!isEmpty(previewVot)){
            setTitulo(previewVot[0].detalle[0].nombre.substring(0,80)+"...")
        }
    },[previewVot])
    return(
        <Container>
            {!isEmpty(infoGrafico) && !isEmpty(previewVot)?
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
            </CustomView>
            <Row>
                <Col>
                    <br />
                    <h3 className="text-light"  style={{cursor:"pointer",backgroundColor:"rgba(50,50,50,0.95)",borderRadius:"10px"}}>
                        <Container onClick={()=>{
                            if(TFlag===true){
                                setTitulo(previewVot[0].detalle[0].nombre)
                                setTFlag(false)
                            }
                            else{
                                setTitulo(previewVot[0].detalle[0].nombre.substring(0,80)+"...")
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
                            datosvot={previewVot}
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