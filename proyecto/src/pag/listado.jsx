import React, {useState} from 'react';
import { Container,Card,CardBody,Row,Col } from 'reactstrap';
import Prueba from './grafico.jsx';
import datos from '../Coord.json';


function MostrarLista(){

    const [idCon, setId] = useState(); 
    var nombres = [];
    for(let i in idCon)nombres.push(datos.find(d => d.Id_P === idCon[i]).Nombre);
    const filteredPosts = filterPosts(datos, idCon,nombres);

    return(
        <Container>
            <div>
                <Prueba setId={setId}/>
            </div>
            <div>
                <ul className="list-group">
                    <Row>
                        {filteredPosts.map((post) => ( 
                        <Col className="col-sm-3">
                            <li className="list-group-item list-group-item-action" key={post["Id_P"]}>{post["Nombre"]}</li>
                        </Col>
                        ))}
                    </Row>
                </ul>
            </div>
        </Container>
    )
}

const filterPosts = (posts, id, nombres) => {
    if (!id) {
        return posts;
    }
    if(typeof(id)==="number"){
        return posts.filter((post) => {
            return post.Id_P===id;
        });
    }
    else{
        var nuevosDat = [{Id_P: "1", Nombre: "Snatch"}];
        for(let i in id){
            nuevosDat.push({Id_P: id[i], Nombre: nombres[i]});
        }
        nuevosDat.splice(0,1);
        return nuevosDat;
    }
    
};

export default MostrarLista;