import React,{useEffect, useState} from 'react';
import paleta from "../resources/paleta.json"
import { Container,Row,Col,Button} from 'reactstrap';
import partidosInvertidos from './partidos-invertidos.json'
import partidos from './partidos.json'
import {sortBy} from 'lodash'

function MostrarLista({idCon,datoswnominate}){
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
    return(
        <Container>
            <Row>
                <Col className="g-3">
                    <Row>
                        <Col>
                        <h3 className={paleta.colorTextoBootstrap}>Votantes</h3>
                        <h5 className={paleta.colorTextoBootstrap}>Ordenar por: 
                        {' '}<Button style={{borderRadius:"10px"}} outline color={paleta.colorBotonesGraf} onClick={ordenPart}> Partido</Button>{' '}   
                            <Button style={{borderRadius:"10px"}} outline color={paleta.colorBotonesGraf} onClick={ordenNomb}> Nombre</Button>
                        </h5>
                        </Col>
                    </Row>
                    <Row className={paleta.colorTextoBootstrap} style={{backgroundColor:paleta.fondoMid,borderRadius:"10px"}}>
                        {filtro.map((post) => ( 
                        <Col className="col-6 col-sm-3" key={post["id"]}>
                            <div onClick={()=>window.location.href="/congresista/"+post["id"]+"/"+datoswnominate.id} style={{ cursor:"pointer", textDecoration: 'none' }} className={paleta.colorTextoBootstrap+" list-group-flush"} >
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