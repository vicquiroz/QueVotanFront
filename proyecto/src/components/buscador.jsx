import React, {useEffect, useState} from 'react'
import es from 'date-fns/locale/es';
import {InputGroup,
        InputGroupButtonDropdown,
        Container, 
        Input, 
        Label,
        DropdownItem,
        DropdownToggle,
        DropdownMenu,
        Row,
        Button,
        Alert,
        UncontrolledAlert
    } from 'reactstrap'
import './estilo.css'
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import { createTheme,ThemeProvider } from '@mui/material/styles';
function Buscador({tags,estado}){
    const [texto, setTexto] = useState();
    const [sugerencia, setSuge] = useState();
    const [id, setId] = useState();
    const [eleccion, setEleccion] = useState("Materia");
    const [dropdownOpen, setOpen] = useState(false);
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const toggle = () => setOpen(!dropdownOpen);
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        }
      });
    const enCambio = (tex) =>{
        if(eleccion==="Materia"){
            let coincide = [];
            if(tex.length>0){
                coincide = tags.filter(tag=>{
                    const tagname = tag.descripcion.toLowerCase();
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
            switch (eleccion) {
                case "Materia":
                    if(id!=="" && id!==undefined){
                        window.location.href="/Buscar/Materia/"+id
                    }
                    else{
                        alert("Debe seleccionar una materia antes de hacer una consulta")
                    }
                    break;
                case "Nombre":
                    if(texto!=="" && texto !==undefined){
                        window.location.href=`/Buscar/Nombre/${String(texto)}`
                    }
                    else{
                        alert("Debe de ingresar un nombre de una votación antes de hacer una consulta")
                    }
                    break;
                case "ID":
                    if(texto!=="" && texto !==undefined){
                        window.location.href="/Buscar/ID/"+texto
                    }
                    else{
                        alert("Debe de ingresar un identificador antes de hacer una consulta")
                    }
                    break;
                case "Boletín":
                    if(texto!=="" && texto !==undefined){
                        window.location.href=`/Buscar/Boletín/${String(texto)}`
                    }
                    else{
                        alert("Debe de ingresar un número de boletín antes de hacer una consulta")
                    }
                    break;
                case "Fecha":
                    window.location.href=`/Buscar/Fecha/${String(fechaInicio.split("T")[0])}!${String(fechaFin.split("T")[0])}`
                    break;
                default:
                    break;
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
                        <DropdownItem onClick={()=>{setEleccion("Fecha")
                        setTexto("")
                        }}>Buscar por fecha de votación</DropdownItem>
                    </DropdownMenu>
                </InputGroupButtonDropdown>
                {eleccion!="Fecha"?
                <Input
                    id="buscador"
                    onChange={e =>{
                        const reId = /^[0-9\b]+$/;
                        const renB = /^[0-9-\b]+$/;
                        switch (eleccion) {
                            case "ID":
                                if (e.target.value === '' || reId.test(e.target.value)) {
                                    enCambio(e.target.value)
                                }
                                break;
                            case "Boletín":
                                if (e.target.value === '' || renB.test(e.target.value)) {
                                    enCambio(e.target.value)
                                }
                                break;
                            default:
                                enCambio(e.target.value)
                                break;
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
                :
                <div>
                 <ThemeProvider theme={darkTheme}> 
  
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                        <DatePicker
                            disableFuture
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={fechaInicio}
                            onChange={(newValue) => {
                                setFechaInicio(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} 
                            style={{backgroundColor:"rgba(50,50,50,0.95)"}}
                            />}
                        />
                        <DatePicker
                            disableFuture
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={fechaFin}
                            onChange={(newValue) => {
                                setFechaFin(newValue);
                            }}
                            renderInput={(params) => <TextField {...params}
                            style={{backgroundColor:"rgba(50,50,50,0.95)"}}
                            />}
                        />
                    </LocalizationProvider>
                    </ThemeProvider>
                    <Button onClick={()=>{
                        window.location.href=`/Buscar/Fecha/${String(fechaInicio.toISOString().split("T")[0])}!${String(fechaFin.toISOString().split("T")[0])}`}
                        }>Buscar</Button>
                </div>
                }
                </InputGroup>
                {eleccion==="Materia"?
                <Container>
                <div className="border border-dark" >
                {sugerencia && sugerencia.slice(0,10).map((sugerencia, id) =>
                    <Label className="list-group-flush list-group-item-dark list-group-item-action" key={id}
                     onClick={()=> seleccion(sugerencia.descripcion,sugerencia.id)}>
                        {sugerencia.descripcion} 
                    </Label>
                )}
                </div>
                </Container>
                :""}
                </Row>
                <br /><br />
        </Container>
    )
}
export default Buscador;