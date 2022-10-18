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
 * Function in charge of creating the structure and logic of the operation of the search engine of the page.
 * @param {*} tags  array of tags that will be used to filter the votes.
 * @param {*} condition The method by which you are searching.
 * @param {*} value The value to be searched.
 * @returns a < Container > with all the structure of the browser.
 */
function Seeker({tags,condition,value}){
    const [text, set_Text] = useState();
    const [suggestion, set_Suge] = useState();
    const [id, set_Id] = useState();
    const [election, set_Election] = useState("Materia");
    const [dropdownOpen, set_Open] = useState(false);
    const [start_Date, set_Start_Date] = useState(new Date());
    const [end_Date, set_End_Date] = useState(new Date());
    const toggle = () => set_Open(!dropdownOpen);
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        }
      });
    /**
     * Receives the text entered in the search engine, verifies that it is in the "subject" choice and returns the filtered matrix in addition to creating the new text and suggestion state.
     * @param {String} tex
     */
    const instead = (tex) =>{
        if(election==="Materia"){
            let matches = [];
            if(tex.length>0){
                matches = tags.filter(tag=>{
                    const tagname = tag.descripcion.toLowerCase();
                    return tagname.includes(tex.toLowerCase());
            })
        }
        set_Suge(matches);
        }
        set_Text(tex)
    }

    /**
     * Called when the choice is "Subject", it receives the text belonging to the sentence that represents the subject and an ID identifying it.
     * @param {String} text
     * @param {*} id
     */

    const selection = (text, id) =>{
        set_Text(text);
        set_Id(id);
        set_Suge("");
        document.getElementById('buscador').select();
    }
    /**
     * Function that, when the Enter key is pressed, verifies the status of the "choice" variable and performs the search, verifying that the parameter to be searched matches its specific format, if not, it returns an alert.
     * @param {*} Key
     */
    const down_Key = (key) => {
        if (key.key === 'Enter') {
            switch (election) {
                case "Materia":
                    if(id!=="" && id!==undefined){
                        window.location.href="/Buscar/Materia/"+id
                    }
                    else{
                        alert("Debe seleccionar una materia antes de hacer una consulta")
                    }
                    break;
                case "Nombre":
                    if(text!=="" && text !==undefined){
                        window.location.href=`/Buscar/Nombre/${String(text)}`
                    }
                    else{
                        alert("Debe de ingresar un nombre de una votación antes de hacer una consulta")
                    }
                    break;
                case "ID":
                    if(text!=="" && text !==undefined){
                        window.location.href="/Buscar/ID/"+text
                    }
                    else{
                        alert("Debe de ingresar un identificador antes de hacer una consulta")
                    }
                    break;
                case "Boletín":
                    if(text!=="" && text !==undefined){
                        window.location.href=`/Buscar/Boletín/${String(text)}`
                    }
                    else{
                        alert("Debe de ingresar un número de boletín antes de hacer una consulta")
                    }
                    break;
                case "Fecha":
                    window.location.href=`/Buscar/Fecha/${String(start_Date.split("T")[0])}!${String(end_Date.split("T")[0])}`
                    break;
                default:
                    break;
            }
        }
    }

    /** UseEffect that analyzes the change of the tag to save the choice and the new status of Text or ID */
    useEffect(()=>{
        if(condition!==undefined){
            set_Election(condition)
            switch (condition) {
                case "Materia":
                    if(tags.length>0){
                        let materia = tags.find(tag=>{return tag.id==value})
                        selection(materia.descripcion,value)
                    }
                    break;
                case "Nombre":
                    set_Text(value)
                    break;
                case "ID":
                    set_Text(value)
                    break;
                case "Boletín":
                    set_Text(value)
                    break;
                case "Fecha":
                    //window.location.href=`/Buscar/Fecha/${String(start_Date.split("T")[0])}!${String(end_Date.split("T")[0])}`
                    let Fechas=value.split("!")
                    let NewFechaInicio=Fechas[0]
                    let NewFechaFinal=Fechas[1]
                    set_Start_Date(new Date(NewFechaInicio+"T12:00:00.000Z"))
                    set_End_Date(new Date(NewFechaFinal+"T12:00:00.000Z"))
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
                    <DropdownToggle caret split color="primary" style={{width:"100%"}}>{election} </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>
                            Seleccione el método de búsqueda
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            set_Election("Materia")
                            set_Text("")
                        }}>
                            Buscar por materia asociada
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            set_Election("Nombre")
                            set_Suge("")
                            set_Text("")
                            }}>
                            Buscar por nombre de votación
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            set_Election("Boletín")
                            set_Text("")
                        }}>
                            Buscar por número de boletín
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            set_Election("ID")
                            set_Text("")
                        }}>
                            Buscar por ID de votación
                        </DropdownItem>
                        <DropdownItem onClick={()=>{
                            set_Election("Fecha")
                            set_Text("")
                        }}>
                            Buscar por fecha de votación
                        </DropdownItem>
                    </DropdownMenu>
                </InputGroupButtonDropdown>
                {election!="Fecha"?
                <Input
                    id="buscador"
                    onChange={e =>{
                        const reId = /^[0-9\b]+$/;
                        const renB = /^[0-9-\b]+$/;
                        switch (election) {
                            case "ID":
                                if (e.target.value === '' || reId.test(e.target.value)) {
                                    instead(e.target.value)
                                }
                                break;
                            case "Boletín":
                                if (e.target.value === '' || renB.test(e.target.value)) {
                                    instead(e.target.value)
                                }
                                break;
                            default:
                                instead(e.target.value)
                                break;
                        }
                    }}
                    onKeyDown={down_Key}
                    className={"input "+paleta.colorTextoBootstrap}
                    type="search"
                    placeholder="Buscar"
                    value={text || ""}
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
                            value={start_Date}
                            onChange={(newValue) => {
                                set_Start_Date(newValue);
                            }}
                            renderInput={(params) => <TextField {...params}
                            style={{backgroundColor:"rgba(50,50,50,0.95)"}}
                            />}
                        />
                        <DatePicker
                            disableFuture
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={end_Date}
                            onChange={(newValue) => {
                                set_End_Date(newValue);
                            }}
                            renderInput={(params) => <TextField {...params}
                            style={{backgroundColor:"rgba(50,50,50,0.95)"}}
                            />}
                        />
                    </LocalizationProvider>
                    </ThemeProvider>
                    <Button onClick={()=>{
                        window.location.href=`/Buscar/Fecha/${String(start_Date.toISOString().split("T")[0])}!${String(end_Date.toISOString().split("T")[0])}`}
                        }>Buscar</Button>
                </div>
                }
                </InputGroup>
                {election==="Materia"?
                <Container>
                <div className="border border-dark">
                {suggestion && suggestion.slice(0,10).map((suggestion, id) =>
                    <Label className="list-group-flush list-group-item-dark list-group-item-action" key={id}
                     onClick={()=> selection(suggestion.descripcion,suggestion.id)}>
                        {suggestion.descripcion}
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
export default Seeker;