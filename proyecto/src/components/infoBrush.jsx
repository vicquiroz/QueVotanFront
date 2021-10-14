import React from 'react';
import { Row, Col, CardBody, Card, CardHeader, CardText,Container } from 'reactstrap';
import partidos from './partidos.json'
function Inform({pos,datoswnominate}){
    if (pos!==undefined){
        datoswnominate.wnominate=datoswnominate.wnominate.filter((dat)=> {return dat.party!==partidos.key})
        var maxX = Math.max(...pos[0]).toFixed(2);
        var maxY = Math.max(...pos[1]).toFixed(2);
        var minX = Math.min(...pos[0]).toFixed(2);
        var minY = Math.min(...pos[1]).toFixed(2);
        var promX = pos[0].reduce((a,b)=> a+b,0);
        var promY = pos[1].reduce((a,b)=> a+b,0);
        promX = "X: "+String((promX/pos[0].length).toFixed(2));
        promY = "Y: "+String((promY/pos[1].length).toFixed(2));
        if(pos[0].length != 0 && pos[1].length !=0){
            var nameMXX=" por "+datoswnominate.wnominate.filter((dat)=> {return dat.coord1D==Math.max(...pos[0])})[0].Nombre
            var nameMXY=" por "+datoswnominate.wnominate.filter((dat)=> {return dat.coord2D==Math.max(...pos[1])})[0].Nombre
            var nameMNX=" por "+datoswnominate.wnominate.filter((dat)=> {return dat.coord1D==Math.min(...pos[0])})[0].Nombre
            var nameMNY=" por "+datoswnominate.wnominate.filter((dat)=> {return dat.coord2D==Math.min(...pos[1])})[0].Nombre
        }
    }
    return(
        <Container>
            <Row>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader style={{height:"35px"}} className="d-flex justify-content-center"><h5>Centroide</h5></CardHeader>
                        <CardBody>
                            <CardText className="d-flex justify-content-center">{promX} {promY}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader style={{height:"35px"}} className="d-flex justify-content-center"><h5>Maximo en X</h5></CardHeader>
                        <CardBody>
                            <CardText className="d-flex justify-content-center">{maxX} {nameMXX}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader style={{height:"35px"}} className="d-flex justify-content-center"><h5>Maximo en Y</h5></CardHeader>
                        <CardBody>
                            <CardText className="d-flex justify-content-center">{maxY} {nameMXY}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader style={{height:"35px"}} className="d-flex justify-content-center"><h5>Minimo en X</h5></CardHeader>
                        <CardBody>
                            <CardText className="d-flex justify-content-center">{minX} {nameMNX}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader style={{height:"35px"}} className="d-flex justify-content-center"><h5>Minimo en Y</h5></CardHeader>
                        <CardBody>
                            <CardText className="d-flex justify-content-center">{minY} {nameMNY}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Inform;
