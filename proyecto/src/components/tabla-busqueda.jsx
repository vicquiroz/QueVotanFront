import React from 'react'
import {Container, CardBody, Card, CardHeader, CardText} from 'reactstrap'
import statuscolor from '../resources/statuscolor.json'
function Tabla({primerasVotaciones}){
    console.log(primerasVotaciones)
    function isEmpty(obj) {
        return Object.keys(obj).length === 0
    }
    return(
        <Container>
                {!isEmpty(primerasVotaciones)?
                primerasVotaciones.map((post,index) => (
                    <div key={index}>
                    <div onClick={()=> window.location.href="/grafico/"+post.id} style={{ cursor:"pointer",textDecoration: 'none' }}>
                        <Card className="text-light" style={{backgroundColor:"rgba(50,50,50,0.95)"}}>
                            <CardHeader><b>Camara de diputados - Votacion {post.id} </b>- Ingresada en {post.fechaIngresoBoletin.slice(0,10)} - Realizada en {post.fechaSalidaBoletin.slice(0,10)}</CardHeader>
                            <CardBody>
                                <CardText>
                                    <b>Boletin N°: </b>{post.boletin.slice(10,20)}
                                    <br/>
                                    <b>Tipo: </b>{post.tipoProyecto}
                                    <br/>
                                    <b>Estado: </b>{post.tramiteConst} - {post.tramiteRegla}
                                    <br/>
                                    <b>Votos: {post.totalSi} - {post.totalNo} - {post.totalAbs} - {post.totalDis}</b> (A favor - En contra - Abstenidos - Dispensados)
                                    <br/>
                                    <b>Resultado: </b><strong style={{color:statuscolor[post.resultado]}}>{post.resultado}</strong>
                                    <br/>
                                    <b>Descripcion: </b>{post.nombre}
                                    <br/>
                                    <b>Quórum: </b>{post.quorum}
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <br/>
                    </div>
                ))
                :[]}
        </Container>
    )
}
export default Tabla;