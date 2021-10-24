import React, {useEffect, useState} from 'react'
import {InputGroup,
        InputGroupButtonDropdown,
        Container, 
        Input, 
        Label,
        DropdownItem,
        DropdownToggle,
        DropdownMenu,
        Row} from 'reactstrap'
import './estilo.css'

function Buscador({tags,estado}){
    const [texto, setTexto] = useState();
    const [sugerencia, setSuge] = useState();
    const [id, setId] = useState();
    const [eleccion, setEleccion] = useState("Materia");
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    
    const enCambio = (tex) =>{
        if(eleccion==="Materia"){
            let coincide = [];
            if(tex.length>0){
                coincide = tags.filter(tag=>{
                    const tagname = tag.desc.toLowerCase();
                    return tagname.includes(tex.toLowerCase());
            })
        }
        setSuge(coincide);
        }
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
                window.location.href="/Buscar/Materia/"+id
            }
            if(eleccion==="Nombre"){
                window.location.href=`/Buscar/Nombre/"${String(texto)}"`
            }
            if(eleccion==="ID"){
                window.location.href="/Buscar/ID/"+texto
            }
            if(eleccion==="Boletín"){
                window.location.href=`/Buscar/Boletín/"${String(texto)}"`
            }
        }
      }
    useEffect(()=>{
        if(estado!==undefined){
            setEleccion(estado)
        }
    },[])
    return(
        <Container>
            <h3 className="text-light">Buscar votaciones</h3>
            <Row>
            <InputGroup>
                <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle split color="primary" style={{width:"100%"}}>{eleccion} </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={()=>{setEleccion("Materia")}}>Buscar por materia asociada</DropdownItem>
                        <DropdownItem onClick={()=>{setEleccion("Nombre")
                        setSuge("")}}>Buscar por nombre de votación</DropdownItem>
                        <DropdownItem onClick={()=>{setEleccion("Boletín")
                        setTexto("")
                        }}>Buscar por número de boletín</DropdownItem>
                        <DropdownItem onClick={()=>{setEleccion("ID")
                        setTexto("")
                        }}>Buscar por ID de votación</DropdownItem>
                    </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input
                    id="buscador"
                    onChange={e =>{
                        const reId = /^[0-9\b]+$/;
                        const renB = /^[0-9-\b]+$/;
                        if(eleccion==="ID"){
                            if (e.target.value === '' || reId.test(e.target.value)) {
                                enCambio(e.target.value)
                            }
                        }
                        else{
                            if(eleccion==="Boletín"){
                                if (e.target.value === '' || renB.test(e.target.value)) {
                                    enCambio(e.target.value)
                                }
                            }
                            else{
                                enCambio(e.target.value)
                            }
                        }
                        
                    }}
                    onKeyDown={teclaAbajo}
                    className="input text-light" 
                    type="search" 
                    placeholder="Buscar"
                    value={texto || ""}
                    style={{backgroundColor:"rgba(50,50,50,0.95)"}}
                >
                </Input>
                </InputGroup>
                <Container>
                <div className="border border-dark" >
                {sugerencia && sugerencia.slice(0,10).map((sugerencia, id) =>
                    <Label className="list-group-flush list-group-item-dark list-group-item-action" key={id}
                     onClick={()=> seleccion(sugerencia.desc,sugerencia.id)}>
                        {sugerencia.desc} 
                    </Label>
                )}
                </div>
                </Container>
                </Row>
                <br /><br />
        </Container>
    )
}
export default Buscador;