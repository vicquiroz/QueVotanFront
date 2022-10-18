import React, {useState,useEffect}  from "react";
import Bar from "../components/barra";
import Table from "../components/tabla";
import Seeker from "../components/buscador";
import {Container, Col, Row,Alert} from "reactstrap";
import {CustomView,isMobile} from 'react-device-detect'
import {useDispatch, useSelector} from 'react-redux'
import {get_Tags_Action} from '../redux/TagsDucks'
import {get_First_Votes_Action} from '../redux/VotacionDucks'

function Principal(){
    const dispatch = useDispatch()
    const tags = useSelector(store => store.tags.array)
    const first_Votations = useSelector(store => store.first_Votations.array)
    useEffect(()=> {
        dispatch(get_Tags_Action())
        dispatch(get_First_Votes_Action(1))
    },[]);

    return(
        <Container>
            <Row>
                <Col>
                    <Bar
                        origin={"principal"}
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
                    <Seeker
                        tags={tags}
                    />
                </Col>
            </Row >
            <Row>
                <Col>
                {first_Votations.length>0?
                    <Table
                    first_Votations={first_Votations} method="principal"
                />
                :
                <Alert color="danger">
                    <h4 className="alert-heading">Error</h4>
                    <p>Se ha producido un error al mostrar las consultas más recientes</p>
                    <hr />
                    <p>Intente recargar la página más tarde</p>
                </Alert>
                }
                </Col>
            </Row>
        </Container>
    );
}

export default Principal;