import '../styles/PostCard.css'

import {Button, Card, Container, Row, Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {POSTS_ROUTE} from "../utils/consts";
import React, {useContext, useEffect} from "react";
import {UserContext} from "../AppProviders/UserProvider";
import ModalPostCard from "./ModalPostCard";
import {post as GetPost} from "../http/postApi";


const PostCard = (props) => {
    const {user, setUser} = useContext(UserContext);
    const [modalShow, setModalShow] = React.useState(false);
    const ShowModal = () => {
            setModalShow(true);
            GetPost(props.id).then();
        }
    return (
        <div key={props.id} style={{paddingTop:'10px'}}>
            <Container>
                <Card onClick={ShowModal}>
                    <Card.Body>
                        <Row>
                            {props.image &&
                                <Col xl={'5'}>
                                    <Card.Img src={'http://localhost:5000/' + props.image}/>
                                </Col>
                            }
                            <Col xl={'7'}>
                                <Card.Title>{props.title}</Card.Title>
                                <Card.Text className={'cardText'}>
                                    {props.content}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            <ModalPostCard
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={props.id}
                title={props.title}
                content={props.content}
                image={props.image}
            />
        </div>
    );
};
export default PostCard;