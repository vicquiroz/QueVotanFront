import React, {useState} from 'react'
import {Container, Input, Label,DropdownItem,DropdownToggle,DropdownMenu,ButtonDropdown,Col,Row} from 'reactstrap'
import './estilo.css'

function Buscador({setBusqueda,tags,setIdTag}){
    const [texto, setTexto] = useState();
    const [sugerencia, setSuge] = useState();
    const [id, setId] = useState();
    const [eleccion, setEleccion] = useState("Materia");
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    
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
        setSuge("");
        document.getElementById('buscador').select();
    }

    const teclaAbajo = (tecla) => {
        if (tecla.key === 'Enter') {
            if(eleccion==="Materia"){
                setIdTag(id);
                setBusqueda("Materias")
            }
            if(eleccion==="Nombre"){
                setIdTag('"'+String(texto)+'"');
                setBusqueda("nombre")
            }
            if(eleccion==="Id"){
                setIdTag(texto)
                setBusqueda(0)
            }
        }
      }
    return(
        <Container>
            <h3 className="text-light">Buscar votaciones por materias asociadas</h3>
            <Row>
            <Col className="col-sm-2" style={{paddingRight:"0px"}}>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle split color="primary" style={{width:"100%"}}>{eleccion}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={()=>setEleccion("Materia")}>Buscar por materia asociada</DropdownItem>
                        <DropdownItem onClick={()=>setEleccion("Nombre")}>Buscar por nombre de votacion</DropdownItem>
                        {/*<DropdownItem onClick={()=>setEleccion("Id")}>Buscar por id de votacion</DropdownItem>*/}
                    </DropdownMenu>
                </ButtonDropdown>
            </Col>
            <Col className="col-sm-10" style={{paddingLeft:"0px"}}>
                <Input
                    id="buscador"
                    onChange={e => enCambio(e.target.value)}
                    onKeyDown={teclaAbajo}
                    className="input text-light" 
                    type="search" 
                    placeholder="Buscar"
                    value={texto || ""}
                    style={{backgroundColor:"rgba(50,50,50,0.95)"}}
                >
                </Input>
                <div className="border border-dark" >
                {sugerencia && sugerencia.slice(0,10).map((sugerencia, id) =>
                    <Label className="list-group-flush list-group-item-dark list-group-item-action" key={id}
                     onClick={()=> seleccion(sugerencia.desc,sugerencia.id)}>
                        {sugerencia.desc} 
                    </Label>
                )}
                </div>
                </Col>
                </Row>
                <br /><br />
        </Container>
    )
}
export default Buscador;