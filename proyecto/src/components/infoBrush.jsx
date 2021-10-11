import React from 'react';
import { Row, Col, CardBody, Card, CardHeader, CardText } from 'reactstrap';

function Inform({pos}){
    if (pos!==undefined){
        var maxX = Math.max(...pos[0]).toFixed(2);
        var maxY = Math.max(...pos[1]).toFixed(2);
        var minX = Math.min(...pos[0]).toFixed(2);
        var minY = Math.min(...pos[1]).toFixed(2);
        var promX = pos[0].reduce((a,b)=> a+b,0);
        var promY = pos[1].reduce((a,b)=> a+b,0);
        promX = "X: "+String((promX/pos[0].length).toFixed(2));
        promY = "Y: "+String((promY/pos[1].length).toFixed(2));
        //var mensaje = "X: "+String(promX)+" Y: "+String(promY);
    }
    return(
        <div>
            <Row>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader><h5>Centroide</h5></CardHeader>
                        <CardBody>
                            <CardText>{promX} {promY}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader><h5>Maximo en X</h5></CardHeader>
                        <CardBody>
                            <CardText>{maxX}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader><h5>Maximo en Y</h5></CardHeader>
                        <CardBody>
                            <CardText>{maxY}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader><h5>Minimo en X</h5></CardHeader>
                        <CardBody>
                            <CardText>{minX}</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="g-0">
                    <Card className="text-light" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                        <CardHeader><h5>Minimo en Y</h5></CardHeader>
                        <CardBody>
                            <CardText>{minY}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Inform;
