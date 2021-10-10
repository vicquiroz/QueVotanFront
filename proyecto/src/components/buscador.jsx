import React, {useState} from 'react'
import {Container, Input, Label} from 'reactstrap'
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
        document.getElementById('buscador').select();
    }

    const teclaAbajo = (tecla) => {
        if (tecla.key === 'Enter') {
          setIdTag(id);
        }
      }


    return(
        <Container>
            <h3>Buscar votaciones por materias asociadas</h3>
                <Input
                    id="buscador"
                    onChange={e => enCambio(e.target.value)}
                    onKeyDown={teclaAbajo}
                    className="input" 
                    type="search" 
                    placeholder="Buscar"
                    value={texto || ""}
                >
                </Input>
                <div className="border border-gray" >
                {sugerencia && sugerencia.slice(0,10).map((sugerencia, id) =>
                    <Label className="list-group-flush list-group-item-action" key={id}
                     onClick={()=> seleccion(sugerencia.desc,sugerencia.id)}>
                        {sugerencia.desc}  
                    </Label>
                )}
                </div>
                <br /><br />
        </Container>
    )
}
export default Buscador;