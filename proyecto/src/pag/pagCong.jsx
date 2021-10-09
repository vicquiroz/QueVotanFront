import React,{useEffect, useState} from "react";
import Barra from "../components/barra";
import {Container, Col, Row, Button} from "reactstrap";
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { obtenerInfoDiputadosAccion } from '../redux/InfoDipDucks';
import { obtenerIntervenCongresAccion} from '../redux/IntervenCongresDucks'
import InfiniteScroll from 'react-infinite-scroll-component'

function Congresista(){
    const [iCL,setICL] = useState([])
    const [limit,setLimit]=useState()
    const {handle} = useParams()
    const dispatch = useDispatch()
    const infoDip = useSelector(store => store.infoDiputados.array)
    const intervenCongres = useSelector(store => store.intervenCongres.array)
    useEffect(()=> {
            dispatch(obtenerInfoDiputadosAccion(handle))
            dispatch(obtenerIntervenCongresAccion(handle))
    },[]);
    useEffect(()=>{
        setICL(intervenCongres.slice(0,30))
        setLimit(60)
    },[intervenCongres])
    var infoD="";
    var titleD;
    if(typeof(infoDip)==="string"){
        if(infoDip.includes("Error")){
            titleD=handle
            infoD="No se ha encontrado información sobre dicho diputado en la base de datos. Esto puede deberse a que este diputado pertenece a un congreso antiguo, o no existen datos sobre el mismo."
        }
    }
    else if(typeof(infoDip)=="object"){
        titleD=infoDip.Nombre+" "+infoDip["Apellido Paterno"]+" "+infoDip["Apellido Materno"]
    }
    const fetchData = () =>{
        setTimeout(() => {
            setICL(intervenCongres.slice(0,limit))
            if(limit<intervenCongres.length){
                setLimit(limit+30)
            }
        },500);
    }
    //console.log(Lista(intervenCongres))
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
                        <h1>{titleD}</h1>
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
                <InfiniteScroll
                dataLength={iCL.length}
                next={fetchData}
                hasMore={true}
                >
                    {iCL.map((post)=>(
                    <li key={post["id"]}>
                            {post["Titulo"]}
                    </li>
                    ))}
                </InfiniteScroll>
            </Container>
        </Container>
    );
}

export default Congresista;