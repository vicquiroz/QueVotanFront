import React from 'react'
import {Container} from 'reactstrap'
import { Link } from "react-router-dom";


function Tabla({busqueda,primerasVotaciones}){

    const posts = [
        { id: '1', name: 'Votacion por covid' },
        { id: '2', name: 'Votacion retiro afp' },
        { id: '3', name: 'Votacion deporte de alto rendimiento' },
        { id: '4', name: 'Votacion modificacion de leyes' }
    ];
   
    const filteredPosts = filterPosts(posts, busqueda);

    return(
        <Container>
            <ul className="list-group">
                {
                //filteredPost.map
                }
                {primerasVotaciones.map((post) => ( 
                    <Link to={"/grafico/"+post.id} style={{ textDecoration: 'none' }}>
                        <li className="list-group-item list-group-item-action" key={post.id}>
                            {
                            //post.name
                            post.id
                            }
                        </li>
                    </Link>
                ))}
            </ul>
        </Container>
    )
}

const filterPosts = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query.toLowerCase());
    });
};
export default Tabla;