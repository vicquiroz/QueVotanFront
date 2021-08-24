import React, {useState} from 'react';
import { Container,Card,CardBody } from 'reactstrap';
import Prueba from './grafico.jsx';
import datos from '../Coord.json'


function MostrarLista(){

    const [idCon, setId] = useState(); 
    const filteredPosts = filterPosts(datos, idCon);

    return(
        <Container>
            <div>
                <Prueba setId={setId}/>
            </div>
            <div>
                <Card>
                    <CardBody>
                        <ul className="list-group">
                            {filteredPosts.map((post) => ( 
                                <li className="list-group-item list-group-item-action" key={post["Id_P"]}>{post["Nombre"]}</li>
                            ))}
                            {
                                /*
                                Aquí se debe de cambiar el listado para que, al igual que la barra de búsqueda, cada vez que se usa
                                un brush o se clickea a un punto, esta lista se actualice con los seleccionados
                                */
                            }
                        </ul>
                    </CardBody>
                </Card>
            </div>
        </Container>
    )
}

const filterPosts = (posts, id) => {
    if (!id) {
        return posts;
    }
    return posts.filter((post) => {
        return post.Id_P===id;
    });
};

export default MostrarLista;