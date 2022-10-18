import React from 'react'
import {Container, CardBody, Card, CardHeader, CardText} from 'reactstrap'
import statuscolor from '../resources/statuscolor.json'

/**
 * Function in charge of creating the component of the cards of each vote.
 * @param {*} first_Votes the set of votes.
 * @returns < Container > with the entire structure of the cards embedded with their reference URL when they click.
 */
function Table({first_Votes}){
    console.log(first_Votes)
    function isEmpty(obj) {
        return Object.keys(obj).length === 0
    }
    return(
        <Container>
                {!isEmpty(first_Votes)?//if not empty
                first_Votes.map((post,index) => (
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
export default Table;