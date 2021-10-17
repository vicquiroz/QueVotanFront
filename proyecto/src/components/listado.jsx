import React,{useEffect, useState} from 'react';
import { Container,Row,Col,Button} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux'
//import { obtenerInfoDiputadosAccion } from '../redux/InfoDipDucks';
import partidosInvertidos from './partidos-invertidos.json'
import partidos from './partidos.json'
import { Link } from "react-router-dom";
import {sortBy} from 'lodash'

function MostrarLista({idCon,datoswnominate}){
    const vot=["▽","△","○","▢","◇"]
    var nombres = [];
    var part = [];
    for(let i in idCon) {
        nombres.push(datoswnominate.wnominate.find(d => d.ID ===idCon[i]).Nombre);
        part.push(datoswnominate.wnominate.find(d => d.ID ===idCon[i]).party);
    }
    const [filtro,setFiltro]=useState([])
    var filteredPosts = filterPosts(datoswnominate.wnominate, idCon,nombres,part);
    
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
    var TestNombre=[]
    useEffect(()=> {
        for(let i in idCon){
            dispatch(obtenerInfoDiputadosAccion(idCon[i]))
            TestNombre.push(infoDip["Apellido Paterno"])
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
                        <Col className="col-6 col-sm-3" key={post["ID"]}>
                            <Link onClick={()=>window.location.href="/congresista/"+post["ID"]+"/"+datoswnominate.id} style={{ textDecoration: 'none' }} className="text-light list-group-flush list-group-item-action">
                                <table style={{width:"100%"}} >
                                    <tbody>
                                    <tr>
                                        <td style={{textAlign: 'left',verticalAlign:'top'}}>{post["Nombre"]}</td>
                                        <td style={{textAlign: 'right',verticalAlign:'top'}}>
                                            <span style={{backgroundColor:partidos[post["Partido"]],borderRadius:"5px",color:partidosInvertidos[post["Partido"]]}}>
                                                 {post["Partido"]} - {vot[datoswnominate.votacion[0][post["ID"]]]} 
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Link>
                        </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <br />
        </Container>
    )
}

const filterPosts = (posts, id, nombres, partido) => {
    if (!id) {
        return posts;
    }
    if(typeof(id)==="number"){
        return posts.filter((post) => {
            return Number(post.ID)===id;
        });
    }
    else{
        var nuevosDat = [{ID: "1", Nombre: "Snatch", Partido: "test"}];
        for(let i in id){
            nuevosDat.push({ID: id[i], Nombre: nombres[i], Partido: partido[i]});
        }
        nuevosDat.splice(0,1);
        return nuevosDat;
    }
    
};

export default MostrarLista;