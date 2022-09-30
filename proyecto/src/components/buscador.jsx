import React, {useEffect, useState} from 'react'
import paleta from "../resources/paleta.json"
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
        Button
    } from 'reactstrap'
import './estilo.css'
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import { createTheme,ThemeProvider } from '@mui/material/styles';
/**
 * Funcion encargada de crear la estructura y logica del funcionamiento del buscador de la pagina.
 * @param {*} tags ?
 * @param {*} estado El metodo por el cual se esta buscando
 * @param {*} valor El valor a ser buscado
 * @returns un < Container > con toda la estructura del buscador
 */
function Buscador({tags,estado,valor}){
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
    /**
     * Recive el texto introducido en el buscador, verifica que este en la eleccion "materia" y entrega ? ademas de crear el nuevo estado de sugerencia y de texto.
     * @param {String} tex 
     */
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

    /**
     * Llamada cuando la eleccion es "Materia", recibe el texto perteneciente la oracion que reprecenta la materia y un ID identificador de esta misma.
     * @param {String} texto 
     * @param {*} id 
     */

    const seleccion = (texto, id) =>{
        setTexto(texto);
        setId(id);
        setSuge("");
        document.getElementById('buscador').select();
    }
    /**
     * Funcion que al ser apretada la tecla Enter verifica el estado de la variable "eleccion" y realiza la busqueda verifiando que el parametro a buscar coincida con su espectivo formato, sino, devuelve una alerta.
     * @param {*} tecla 
     */
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

    /** UseEffect que analiza el cambio de la tag para guardar la eleccion y el nuevo estado de Texto o de ID */
    useEffect(()=>{
        if(estado!==undefined){
            setEleccion(estado)
            switch (estado) {
                case "Materia":
                    if(tags.length>0){
                        let materia = tags.find(tag=>{return tag.id==valor})
                        seleccion(materia.descripcion,valor)
                    }
                    break;
                case "Nombre":
                    setTexto(valor)
                    break;
                case "ID":
                    setTexto(valor)
                    break;
                case "Boletín":
                    setTexto(valor)
                    break;
                case "Fecha":
                    //window.location.href=`/Buscar/Fecha/${String(fechaInicio.split("T")[0])}!${String(fechaFin.split("T")[0])}`
                    let Fechas=valor.split("!")
                    let NewFechaInicio=Fechas[0]
                    let NewFechaFinal=Fechas[1]
                    setFechaInicio(new Date(NewFechaInicio+"T12:00:00.000Z"))
                    setFechaFin(new Date(NewFechaFinal+"T12:00:00.000Z"))
                    break;
                default:
                    break;
            }
        }
    },[tags])


    return(
        <Container>
            <h3 className={paleta.colorTextoBootstrap}>Buscar votaciones</h3>
            <Row>
            <InputGroup>
                <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggle} direction='right'>
                    <DropdownToggle caret split color="primary" style={{width:"100%"}}>{eleccion} </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>
                            Seleccione el método de búsqueda
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            setEleccion("Materia")
                            setTexto("")
                        }}>
                            Buscar por materia asociada
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            setEleccion("Nombre")
                            setSuge("")
                            setTexto("")
                            }}>
                            Buscar por nombre de votación
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            setEleccion("Boletín")
                            setTexto("")
                        }}>
                            Buscar por número de boletín
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            setEleccion("ID")
                            setTexto("")
                        }}>
                            Buscar por ID de votación
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            setEleccion("Fecha")
                            setTexto("")
                        }}>
                            Buscar por fecha de votación
                        </DropdownItem>
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
                    className={"input "+paleta.colorTextoBootstrap}
                    type="search" 
                    placeholder="Buscar"
                    value={texto || ""}
                    style={{backgroundColor:paleta.colorFondoInput}}
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
                <div className="border border-dark">
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