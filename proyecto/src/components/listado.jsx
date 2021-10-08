import React,{useEffect} from 'react';
import { Container,Row,Col,Label} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux'
//import { obtenerInfoDiputadosAccion } from '../redux/InfoDipDucks';
import { Link } from "react-router-dom";
import datos from '../Coord.json';
function MostrarLista({idCon,datoswnominate}){
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
                        <h3>Votantes</h3>
                        </Col>
                    </Row>
                    <Row>
                        {filteredPosts.map((post) => ( 
                        <Col className="col-6 col-sm-3" key={post["ID"]}>
                            <Link onClick={()=>window.location.href="/congresista/"+post["ID"]} style={{ textDecoration: 'none' }} className="list-group-flush list-group-item-action">
                                {post["Nombre"]}
                            </Link>
                        </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
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
            nuevosDat.push({ID: id[i], Nombre: nombres[i]});
        }
        nuevosDat.splice(0,1);
        return nuevosDat;
    }
    
};

export default MostrarLista;