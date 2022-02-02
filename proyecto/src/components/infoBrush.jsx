import React from 'react';
import paleta from "../resources/paleta.json"
import { Row, Col,Container, Table } from 'reactstrap';
function Inform({pos,datoswnominate}){
    if (pos!==undefined){
        var maxX = Math.max(...pos[0]).toFixed(2);
        var maxY = Math.max(...pos[1]).toFixed(2);
        var minX = Math.min(...pos[0]).toFixed(2);
        var minY = Math.min(...pos[1]).toFixed(2);
        var promX = pos[0].reduce((a,b)=> a+b,0);
        var promY = pos[1].reduce((a,b)=> a+b,0);
        promX = "X: "+String((promX/pos[0].length).toFixed(2));
        promY = "Y: "+String((promY/pos[1].length).toFixed(2));
        if(pos[0].length !== 0 && pos[1].length !==0){
            var nameMXX=" por "+datoswnominate.diputados.filter((dat)=> {return dat.coordX===Math.max(...pos[0])})[0].nombre
            var nameMXY=" por "+datoswnominate.diputados.filter((dat)=> {return dat.coordY===Math.max(...pos[1])})[0].nombre
            var nameMNX=" por "+datoswnominate.diputados.filter((dat)=> {return dat.coordX===Math.min(...pos[0])})[0].nombre
            var nameMNY=" por "+datoswnominate.diputados.filter((dat)=> {return dat.coordY===Math.min(...pos[1])})[0].nombre
        }
    }
    return(
        <Container>
            <Row>
                <Col className="g-0">
                    <Table className={paleta.colorTextoBootstrap} style={{backgroundColor:paleta.fondoOscuro,borderRadius:"10px"}} responsive borderless>
                        <thead>
                            <tr >
                                <th><h6>Datos de interés</h6></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Centroide:</strong></td>
                                <td className="d-flex justify-content-end">{promX}</td>
                                <td>{promY}</td>
                            </tr>
                            <tr>
                                <td><strong>Máximo en X:</strong></td>
                                <td className="d-flex justify-content-end">{maxX}</td>
                                <td>{nameMXX}</td>
                            </tr>
                            <tr>
                                <td><strong>Máximo en Y:</strong></td>
                                <td className="d-flex justify-content-end">{maxY}</td>
                                <td>{nameMXY}</td>
                            </tr>
                            <tr>
                                <td><strong>Mínimo en X:</strong></td>
                                <td className="d-flex justify-content-end">{minX}</td>
                                <td>{nameMNX}</td>
                            </tr>
                            <tr>
                                <td><strong>Mínimo en Y:</strong></td>
                                <td className="d-flex justify-content-end">{minY}</td>
                                <td>{nameMNY}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Inform;
