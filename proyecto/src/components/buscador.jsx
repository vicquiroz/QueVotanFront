import React, {useState} from 'react'
import {Container, Input} from 'reactstrap'
import './estilo.css'

function Buscador({setBusqueda,tags,setIdTag}){

    const [texto, setTexto] = useState();
    const [sugerencia, setSuge] = useState();
    const [id, setId] = useState();

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

    const seleccion = (texto, id) =>{
        setTexto(texto);
        setId(id);
    }

    const teclaAbajo = (tecla) => {
        if (tecla.key === 'Enter') {
          setIdTag(id);
        }
      }


    return(
        <Container>
                <Input
                    onChange={e => enCambio(e.target.value)}
                    onKeyDown={teclaAbajo}
                    className="input" 
                    type="search" 
                    placeholder="Buscar"
                    value={texto || ""}
                >
                </Input>
                {sugerencia && sugerencia.slice(0,10).map((sugerencia, id) =>
                    <div className="sugerencias list-group-item list-group-item-action" key={id}
                     onClick={()=> seleccion(sugerencia.desc,sugerencia.id)}>
                        {sugerencia.desc}  
                    </div>
                )}
        </Container>
    )
}
export default Buscador;