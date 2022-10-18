import React,{useEffect, useState} from 'react';
import paleta from "../resources/paleta.json"
import { Container,Row,Col,Button} from 'reactstrap';
import partidosInvertidos from './partidos-invertidos.json'
import partidos from './partidos.json'
import {sortBy} from 'lodash'


/**
 * Function in charge of creating the voter list component that appears below the graph.
 * @param {*} idCon Congressman ID or iterable array of IDs
 * @param {*} datoswnominate Data from the nominate file
 * @returns < Container > with the entire list of voters and their respective political party and participation.
 */
function MostrarLista({idCon,datoswnominate}){
    const vot = {1:"△", 0:"▽", 2:"○", 3:"▢", 4:"◇",9:"◇" }// Represent the participation of the congressman in the vote
    var nombres = [];
    var partido = [];
    var participacion = [];
    for(let i in idCon) { //Congressman ID
        nombres.push(datoswnominate.diputados.find(d => d.id ===idCon[i]).nombre);
        partido.push(datoswnominate.diputados.find(d => d.id ===idCon[i]).partido);
        participacion.push(datoswnominate.diputados.find(d => d.id ===idCon[i]).participacion);
    }
    if(typeof(idCon)==="number"){// if it is only number
        nombres.push(datoswnominate.diputados.find(d => d.id ===idCon).nombre);
        partido.push(datoswnominate.diputados.find(d => d.id ===idCon).partido);
        participacion.push(datoswnominate.diputados.find(d => d.id ===idCon).participacion);
    }
    const [filtro,setFiltro]=useState([])
    var filteredPosts = filterPosts(datoswnominate.diputados, idCon,nombres,partido,participacion);// Funtion to unify all the data of a congressman according to his ID.
    useEffect(()=>{
        ordenPart()
    },[idCon])

/**
 * sort them by party.
 */
    function ordenPart(){
        filteredPosts = sortBy(filteredPosts, function(item){
            return Object.keys(partidos).indexOf(item.Partido)
        });
        setFiltro(filteredPosts)
    }
    /**
     * sort them by name.
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
 * Function to unify all the data of a congressman according to his ID.
 * @param {*} posts
 * @param {*} id congressman ID.
 * @param {*} nombres Name.
 * @param {*} partido Party to which he belongs.
 * @param {*} participacion your participation according to 1:"△", 0:"▽", 2:"○", 3:"▢", 4:"◇",9:"◇"
 * @returns An array with the data belonging to each little congress.
 */
const filterPosts = (posts, id, nombres, partido, participacion) => {
    if (!id) { //id =0
        return posts;
    }
    if(typeof(id)==="number"){// if it is only number
        return [{id: id, nombre: nombres, Partido: partido, participacion:participacion}];;
    }
    else{
        var nuevosDat = [{id: "1", nombre: "Snatch", Partido: "test", participacion: "0"}];// Create a new array with the data of the congressman
        for(let i in id){
            nuevosDat.push({id: id[i], nombre: nombres[i], Partido: partido[i],participacion: participacion[i]});// unifies all data into a single structure.
        }
        nuevosDat.splice(0,1);//delete the first element
        return nuevosDat;
    }

};

export default MostrarLista;