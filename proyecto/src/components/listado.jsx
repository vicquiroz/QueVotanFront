import React,{useEffect} from 'react';
import { Container,Row,Col,Label, TabPane} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux'
//import { obtenerInfoDiputadosAccion } from '../redux/InfoDipDucks';
import partidos from './partidos.json'
import { Link } from "react-router-dom";
function MostrarLista({idCon,datoswnominate}){
    const vot=["▽","△","○","▢","◇"]
    var nombres = [];
    for(let i in idCon) nombres.push(datoswnominate.wnominate.find(d => d.ID ===idCon[i]).Nombre);
    const filteredPosts = filterPosts(datoswnominate.wnominate, idCon,nombres);
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
                        </Col>
                    </Row>
                    <Row className="text-light" style={{backgroundColor:"rgba(50,50,50,0.95)",borderRadius:"10px"}}>
                        {filteredPosts.map((post) => ( 
                        <Col className="col-6 col-sm-3" key={post["ID"]}>
                            <Link onClick={()=>window.location.href="/congresista/"+post["ID"]+"/"+datoswnominate.id} style={{ textDecoration: 'none' }} className="text-light list-group-flush list-group-item-action">
                                <table style={{width:"100%"}}>
                                    <tbody>
                                    <tr>
                                        <td style={{textAlign: 'left',verticalAlign:'top'}}>{post["Nombre"]}</td>
                                        <td style={{textAlign: 'right',verticalAlign:'top',color:partidos[datoswnominate.wnominate.find(d => d.ID ===post["ID"]).party]}}>({datoswnominate.wnominate.find(d => d.ID ===post["ID"]).party})[{vot[datoswnominate.votacion[0][post["ID"]]]}]</td>
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

const filterPosts = (posts, id, nombres) => {
    if (!id) {
        return posts;
    }
    if(typeof(id)==="number"){
        return posts.filter((post) => {
            return Number(post.ID)===id;
        });
    }
    else{
        var nuevosDat = [{ID: "1", Nombre: "Snatch"}];
        for(let i in id){
            nuevosDat.push({ID: id[i], Nombre: nombres[i],});
        }
        nuevosDat.splice(0,1);
        return nuevosDat;
    }
    
};

export default MostrarLista;