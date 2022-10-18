import React, {useState,useEffect}  from "react";
import Barra from "../components/barra";
import Tabla from "../components/tabla";
import Buscador from "../components/buscador";
import {Container, Col, Row,Alert} from "reactstrap";
import {useParams} from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import {get_Tags_Action} from '../redux/TagsDucks'
import {CustomView,isMobile} from 'react-device-detect'
import {get_By_Matter_Action} from '../redux/busqueda/porMateria'
import {get_By_Id_Action} from '../redux/busqueda/porId'
import {get_By_Bulletin_Action} from '../redux/busqueda/porBoletin'
import {get_By_Name_Action} from '../redux/busqueda/porNombre'
import {get_By_Date_Action} from '../redux/busqueda/porFecha'
/**
 *Page where the searches are rendered, first the actions are made to search the votes according to a method, when they are updated in the store they will be updated in "Votations" with the "SetVotations" to be able to be rendered.
 * @returns < Container > with all the structure to draw the Table with the corresponding cards.
 */
function Busqueda(){
    const {handleMetodo,handleValor} = useParams()
    const [votaciones,setVotaciones] = useState([]);
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)
    const by_Matter = useSelector(store=>store.by_Matter.array)
    const by_Id = useSelector(store=>store.by_Id.array)
    const by_Bulletin = useSelector(store=>store.by_Bulletin.array)
    const by_Name = useSelector(store=>store.by_Name.array)
    const by_Date = useSelector(store=>store.by_Date.array)
    useEffect(()=> {
        dispatch(get_Tags_Action())
        switch (handleMetodo) {
            case "ID":
                dispatch(get_By_Id_Action(handleValor))
                break;
            case "Boletín":
                dispatch(get_By_Bulletin_Action(handleValor,1))//segundo parametro idica que es desde la pagina 1
                break;
            case "Materia":
                dispatch(get_By_Matter_Action(handleValor,1))
                break;
            case "Nombre":
                dispatch(get_By_Name_Action(handleValor,1))
                break;
            case "Fecha":
                dispatch(get_By_Date_Action(handleValor,1))
                break;
            default:
                break;
        }
    },[]);
    useEffect(()=> {
        switch (handleMetodo) {
            case "ID":
                if(typeof(by_Matter!=="string")) setVotaciones(by_Id)
                break;
            case "Materia":
                if(typeof(by_Matter!=="string")) setVotaciones(by_Matter)
                break;
            case "Boletín":
                if(typeof(by_Bulletin)!=="string") setVotaciones(by_Bulletin)
                break;
            case "Nombre":
                if(typeof(by_Name)!=="string") setVotaciones(by_Name)
                break;
            case "Fecha":
                if(typeof(by_Date)!=="string") setVotaciones(by_Date)
                break;
            default:
                break;
        }
    },[by_Matter,by_Id,by_Bulletin,by_Name,by_Date]);//Cambios en los array de las votaciones
    return(
        <Container>
            <Row>
                <Col>
                    <Barra
                        origen={"principal"}
                    />
                </Col>
            </Row>
            <CustomView condition={isMobile===true}>
                <br/>
                <br/>
            </CustomView>
            <br/>
            <Row style={{
                "marginTop":"30px",
                "marginBottom":"10px"
                }}>
                <Col>
                    <Buscador
                        tags={tags}
                        estado={handleMetodo}
                        valor={handleValor}
                    />
                </Col>
            </Row >
            <Row>
                <Col>
                {votaciones.length>0?
                    <Tabla
                        first_Votations={votaciones} metodo={handleMetodo}
                    />
                    :
                <Alert color="danger">
                    <h4 className="alert-heading">Error</h4>
                    <p>No se han encontrado votaciones con los parámetros especificados</p>
                    <hr />
                    <p>{handleMetodo}: {handleValor}</p>
                </Alert>
                }
                </Col>
            </Row>
        </Container>
    );
}

export default Busqueda;