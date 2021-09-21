import React, {useState} from 'react'
import {Container, Input} from 'reactstrap'
import './estilo.css'

function Buscador({setBusqueda,tags}){

    const [texto, setTexto] = useState();
    const [sugerencia, setSuge] = useState();
    console.log(tags)

    const enCambio = (tex) =>{
        let coincide = [];
        if(tex.length>0){
            coincide = tags.filter(tag=>{
                const tagname = tag.desc.toLowerCase();
                return tagname.includes(tex.toLowerCase());
            })
        }
        setSuge(coincide);
        setTexto(tex)
    }


    return(
        <Container>
                <Input
                    onChange={e => enCambio(e.target.value)}
                    className="input" 
                    type="search" 
                    placeholder="Buscar"
                    value={texto}
                >
                </Input>
                {sugerencia && sugerencia.slice(0,10).map((sugerencia, id) =>
                    <div className="sugerencia list-group-item" key={id}
                     onClick={()=> setTexto(sugerencia.desc)}>
                        {sugerencia.desc}  
                    </div>
                )}
        </Container>
    )
}
export default Buscador;