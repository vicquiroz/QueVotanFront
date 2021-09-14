import React, {useRef, useEffect} from 'react';
import { Row, Col, CardBody, Card, CardTitle } from 'reactstrap';

function Inform({pos}){
    if (pos!=undefined){
        var maxX = Math.max(...pos[0]);
        var maxY = Math.max(...pos[1]);
        var minX = Math.min(...pos[0]);
        var minY = Math.min(...pos[1]);
        var promX = pos[0].reduce((a,b)=> a+b,0);
        var promY = pos[1].reduce((a,b)=> a+b,0);
        promX = "X: "+String(promX/pos[0].length);
        promY = "Y: "+String(promY/pos[1].length);
        //var mensaje = "X: "+String(promX)+" Y: "+String(promY);
    }
    return(
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle><h5>Centroide:</h5> </CardTitle>
                            {promX} {promY}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle><h5>Maximo en X:</h5></CardTitle>
                            {maxX}
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle><h5>Maximo en Y:</h5></CardTitle>
                            {maxY}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle><h5>Minimo en X:</h5></CardTitle>
                            {minX}
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle><h5>Minimo en Y:</h5></CardTitle>
                            {minY}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Inform;
