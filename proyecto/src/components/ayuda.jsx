import React,{useState} from 'react';
import {Button,Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';

function Ayuda({origen}){
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <strong>
            <Button color="info" onClick={toggle} className="btn-sm">Ayuda</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Ayuda</ModalHeader>
                    <ModalBody>
                        {texto(origen)}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
        </strong>
        );
    
}

function texto(origen){
    if(origen==="principal"){
    return(
        <div>
        <h5>Búsqueda</h5>
            Para realizar búsquedas sobre votaciones realizadas, se debe de ingresar el texto
            de búsqueda en el cuadro gris que dice "Buscar". El texto que se debe de ingresar
            depende según el método de búsqueda que se seleccione.
            Existen 4 métodos:
            <ul>
                <li>
                    Materia asociada: En este modo, se debe de escribir lo que se desea buscar
                    y seleccionar el 'tag' correspondiente el cual aparece debajo del cuadro de búsqueda.
                    Esta búsqueda solo admite el texto como es mostrado en la lista de 'tags'.
                </li>
                <li>
                    Nombre de votación: En este modo, se debe de escribir palabras que sean contenidas
                    dentro de la descripción de la votación. A diferencia del método anterior, este admite
                    cualquier tipo de texto, siempre que esté contenido en las descripciones.
                </li>
                <li>
                    Número de boletín: En este modo, se debe de ingresar el número con guión correspondiente
                    al boletín del proyecto. Este se muestra en cada detalle de las votaciones.
                </li>
                <li>
                    ID de votación: En este modo, se ingresa el identificador único de la votación.
                </li>
            </ul>
        </div>
        )}
    if(origen==="grafico"){
        return(
            <div>
                <h5>Gráfico</h5>
                El gráfico permite interactuar de distintas maneras, ya sea para hacer selecciones específicas
                o mostrar cierto tipo de datos. Las interacciones que se pueden realizar son:
                <ul>
                    <li>
                        Selección a puntos específicos: El gráfico permite seleccionar cada uno de los puntos
                        presentes. Si el cursor se encuentra sobre uno de estos puntos, se muestra el nombre
                        del votante a la derecha del cursor. Si se hace click sobre uno de estos puntos, se mostrarán
                        los datos de interés sobre dicho punto y se mostrará sus detalles en la lista de votantes.
                    </li>
                    <li>
                        Selección múltiple: Se puede realizar una selección de varios puntos a la vez, para esto se debe
                        de mantener el click sobre el gráfico y arrastrar el cursor hasta encerrar todos los puntos deseados. 
                    </li>
                    <li>
                        Selección por partidos: Se puede hacer click en la simbología de partidos para así seleccionar sólo
                        los votantes de dicho partido, mostrando al mismo tiempo un polígono que encierra a dichos votantes.
                    </li>
                    <li>
                        Selección por moción del votante: Al hacer click en la simbología de puntos, se hace una selección de todos
                        los puntos que posean la misma moción en la votación.
                    </li>
                </ul>
                <h5>Listado de votantes</h5>
                La lista de votantes muestra todos aquellos que se encuentran seleccionados por el gráfico.
                Si no se realiza ninguna selección, se muestran todos. En cada uno de los votantes se puede realizar
                click para ir a la página específica de dicho votante.
            </div>
        )
    }
    if(origen==="congresista"){
        return(
            <div>
                <h5>Congresista</h5>
                Al seleccionar un diputado, se realiza una comparación de su ideología entre él y
                los pertenecientes a su partido. Para esto, se contabiliza la cantidad de personas
                ubicadas en la aproximación de la dimensión 1, lo cual se muestra en el listado, y
                se muestra el punto al cual dicho diputado pertenece.
                <h5>Votaciones de las que es patrocinante</h5>
                Este listado muestra cada una de las votaciones en las cuales dicho diputado patrocinó,
                en conjunto con su información. Se puede realizar un click en cada una de estas votaciones,
                para así ir al gráfico pertinente.
            </div>
        )
    }
}
export default Ayuda