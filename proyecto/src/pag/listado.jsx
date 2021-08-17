import React from 'react';
import { Container,Card,CardBody } from 'reactstrap';
import datos from '../datos.json'


function MostrarLista(){
    return(
        <Container>
            <div>
                <Card>
                    <CardBody>
                        <ul className="list-group">
                            {datos.map((post) => ( 
                                <li className="list-group-item list-group-item-action" key={post["id"]}>{post["nombre"]}</li>
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

export default MostrarLista;