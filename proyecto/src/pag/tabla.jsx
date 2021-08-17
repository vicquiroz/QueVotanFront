import React, {useState} from 'react'
import {Container} from 'reactstrap'
import Buscador from './buscador.jsx';
import { Link } from "react-router-dom";

function Tabla(){

    const posts = [
        { id: '1', name: 'Votacion por covid' },
        { id: '2', name: 'Votacion retiro afp' },
        { id: '3', name: 'Votacion deporte de alto rendimiento' },
        { id: '4', name: 'Votacion modificacion de leyes' }
    ];

    const [searchQuery, setSearchQuery] = useState();    
    const filteredPosts = filterPosts(posts, searchQuery);

    return(
        <Container>
            <Buscador               
                setSearchQuery={setSearchQuery}
            />
            <ul className="list-group">
                {filteredPosts.map((post) => ( 
                    <li className="list-group-item list-group-item-action" key={post.id}><Link to="/grafico">{post.name}</Link></li>
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