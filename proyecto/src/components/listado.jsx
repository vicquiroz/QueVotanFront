import React from 'react';
import { Container,Row,Col } from 'reactstrap';
import datos from '../Coord.json';


function MostrarLista({idCon}){
    var nombres = [];
    for(let i in idCon) nombres.push(datos["Legislatura"].find(d => d.Id_P ===idCon[i]).Nombre);
    const filteredPosts = filterPosts(datos["Legislatura"], idCon,nombres);
    return(
        <Container>
            <Row>
                <Col className="g-3">
                <ul className="list-group">
                    <Row>
                        {filteredPosts.map((post) => ( 
                        <Col className="col-sm-3">
                            <li className="list-group-item list-group-item-action" key={post["Id_P"]}>{post["Nombre"]}</li>
                        </Col>
                        ))}
                    </Row>
                </ul>
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
            return Number(post.Id_P)===id;
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