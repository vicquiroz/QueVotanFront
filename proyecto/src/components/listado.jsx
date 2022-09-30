import React,{useEffect, useState} from 'react';
import paleta from "../resources/paleta.json"
import { Container,Row,Col,Button} from 'reactstrap';
import partidosInvertidos from './partidos-invertidos.json'
import partidos from './partidos.json'
import {sortBy} from 'lodash'


/**
 * Funcion encargada de crear el componente del listado de votantes que aparece debajo del grafico
 * @param {*} idCon ID del congresista o cumulo iterable de IDs
 * @param {*} datoswnominate datoswnominate
 * @returns < Container > con toda la lista de los votantes y su respectivo partido politico y participacion.
 */
function MostrarLista({idCon,datoswnominate}){
    const vot = {1:"△", 0:"▽", 2:"○", 3:"▢", 4:"◇",9:"◇" }// reprecenta su participacion.
    var nombres = [];
    var partido = [];
    var participacion = [];
    for(let i in idCon) { //id congresista
        nombres.push(datoswnominate.diputados.find(d => d.id ===idCon[i]).nombre);
        partido.push(datoswnominate.diputados.find(d => d.id ===idCon[i]).partido);
        participacion.push(datoswnominate.diputados.find(d => d.id ===idCon[i]).participacion);
    }
    if(typeof(idCon)==="number"){// por si en idCon solo se tiene un numero
        nombres.push(datoswnominate.diputados.find(d => d.id ===idCon).nombre);
        partido.push(datoswnominate.diputados.find(d => d.id ===idCon).partido);
        participacion.push(datoswnominate.diputados.find(d => d.id ===idCon).participacion);
    }
    const [filtro,setFiltro]=useState([])
    var filteredPosts = filterPosts(datoswnominate.diputados, idCon,nombres,partido,participacion);// funcion para unificar
    
    useEffect(()=>{
        ordenPart()
    },[idCon])
    
/**
 * Los ordena por partido
 */
    function ordenPart(){
        filteredPosts = sortBy(filteredPosts, function(item){
            return Object.keys(partidos).indexOf(item.Partido)
        });
        setFiltro(filteredPosts)
    }
    /**
     * Los ordena por nombre
     */
    function ordenNomb(){
        setFiltro(filteredPosts)
    }
    return(
        <Container>
            <Row>
                <Col className="g-3" style={{borderRadius: "10px",backgroundColor:paleta.fondoMid,padding:"10px"}}>
                    <Row>
                        <Col>
                        <h3 className={paleta.colorTextoBootstrap}>Votantes</h3>
                        <h5 className={paleta.colorTextoBootstrap}>Ordenar por:
                        {' '}<Button style={{borderRadius:"10px"}} color={paleta.colorBotonesGraf} onClick={ordenPart}> Partido</Button>{' '}   
                            <Button style={{borderRadius:"10px"}} color="danger" onClick={ordenNomb}> Nombre</Button>
                        </h5>
                        </Col>
                    </Row>
                    <br/>
                    <Row className={paleta.colorTextoBootstrap}>
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

/**
 * Funcion para unificar todos los datos de un congresista segun su ID.
 * @param {*} posts 
 * @param {*} id ID del congresista.
 * @param {*} nombres Su nombre.
 * @param {*} partido Partido al que pertenece.
 * @param {*} participacion su participacion segun 1:"△", 0:"▽", 2:"○", 3:"▢", 4:"◇",9:"◇" 
 * @returns Un arreglo con los datos pertenecientes a cada congresita.
 */
const filterPosts = (posts, id, nombres, partido, participacion) => {
    if (!id) { //id =0
        return posts;
    }
    if(typeof(id)==="number"){// si es solo uno
        return [{id: id, nombre: nombres, Partido: partido, participacion:participacion}];;
    }
    else{
        var nuevosDat = [{id: "1", nombre: "Snatch", Partido: "test", participacion: "0"}];// crea el elemento con datos de test para crear la estructura
        for(let i in id){
            nuevosDat.push({id: id[i], nombre: nombres[i], Partido: partido[i],participacion: participacion[i]});// unifica todos los datos en una sola estructura
        }
        nuevosDat.splice(0,1);//elimina el primer elemento que es el test
        return nuevosDat;
    }
    
};

export default MostrarLista;