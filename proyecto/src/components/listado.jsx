import React,{useEffect, useState} from 'react';
import { Container,Row,Col,Button} from 'reactstrap';
//import { obtenerInfoDiputadosAccion } from '../redux/InfoDipDucks';
import partidosInvertidos from './partidos-invertidos.json'
import partidos from './partidos.json'
import {sortBy} from 'lodash'

function MostrarLista({idCon,datoswnominate}){
    //const vot=["▽","△","○","▢","◇","","",]
    const vot = {1:"△", 0:"▽", 2:"○", 3:"▢", 4:"◇",9:"◇" }
    var nombres = [];
    var partido = [];
    var participacion = [];
    for(let i in idCon) {
        nombres.push(datoswnominate.diputados.find(d => d.id ===idCon[i]).nombre);
        partido.push(datoswnominate.diputados.find(d => d.id ===idCon[i]).partido);
        participacion.push(datoswnominate.diputados.find(d => d.id ===idCon[i]).participacion);
    }
    if(typeof(idCon)==="number"){
        nombres.push(datoswnominate.diputados.find(d => d.id ===idCon).nombre);
        partido.push(datoswnominate.diputados.find(d => d.id ===idCon).partido);
        participacion.push(datoswnominate.diputados.find(d => d.id ===idCon).participacion);
    }
    const [filtro,setFiltro]=useState([])
    var filteredPosts = filterPosts(datoswnominate.diputados, idCon,nombres,partido,participacion);
    
    useEffect(()=>{
        ordenPart()
    },[idCon])
    

    function ordenPart(){
        filteredPosts = sortBy(filteredPosts, function(item){
            return Object.keys(partidos).indexOf(item.Partido)
        });
        setFiltro(filteredPosts)
    }
    function ordenNomb(){
        setFiltro(filteredPosts)
    }

    /*const dispatch = useDispatch()
    const infoDip = useSelector(store => store.infoDiputados.array)
    var Testnombre=[]
    useEffect(()=> {
        for(let i in idCon){
            dispatch(obtenerInfoDiputadosAccion(idCon[i]))
            Testnombre.push(infoDip["Apellido Paterno"])
        }
    },[]);
    */
    return(
        <Container>
            <Row>
                <Col className="g-3">
                    <Row>
                        <Col>
                        <h3 className="text-light">Votantes</h3>
                        <h5 className="text-light">Ordenar por: 
                        {' '}<Button style={{borderRadius:"10px"}} outline color="light" onClick={ordenPart}> Partido</Button>{' '}   
                            <Button style={{borderRadius:"10px"}} outline color="light" onClick={ordenNomb}> Nombre</Button>
                        </h5>
                        </Col>
                    </Row>
                    <Row className="text-light" style={{backgroundColor:"rgba(50,50,50,0.95)",borderRadius:"10px"}}>
                        {filtro.map((post) => ( 
                        <Col className="col-6 col-sm-3" key={post["id"]}>
                            <div onClick={()=>window.location.href="/congresista/"+post["id"]+"/"+datoswnominate.id} style={{ cursor:"pointer", textDecoration: 'none' }} className="text-light list-group-flush">
                                <table style={{width:"100%"}} >
                                    <tbody>
                                    <tr>
                                        <td style={{textAlign: 'left',verticalAlign:'top'}}>{post["nombre"]}</td>
                                        <td style={{textAlign: 'right',verticalAlign:'top'}}>
                                            <span style={{backgroundColor:partidos[post["Partido"]],borderRadius:"5px",color:partidosInvertidos[post["Partido"]]}}>
                                                 {post["Partido"]} - {vot[post.participacion]}
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <br />
        </Container>
    )
}

const filterPosts = (posts, id, nombres, partido, participacion) => {
    if (!id) {
        return posts;
    }
    if(typeof(id)==="number"){
        return [{id: id, nombre: nombres, Partido: partido, participacion:participacion}];;
    }
    else{
        var nuevosDat = [{id: "1", nombre: "Snatch", Partido: "test", participacion: "0"}];
        for(let i in id){
            nuevosDat.push({id: id[i], nombre: nombres[i], Partido: partido[i],participacion: participacion[i]});
        }
        nuevosDat.splice(0,1);
        return nuevosDat;
    }
    
};

export default MostrarLista;