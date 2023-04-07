import React, {useContext} from 'react';
import {UserContext} from "../AppProviders/UserProvider";
import {Button, Card, Col, Container, Row, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {EDIT_POST_ROUTE, MY_POSTS_ROUTE, POSTS_ROUTE} from "../utils/consts";
import {deletePost} from "../http/postApi";

const ModalPostCard = (props) => {
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext);
    let DeletePost = () => {
        deletePost(props.id).then();
        navigate(POSTS_ROUTE)
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Card>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.image &&
                        <Card.Img src={'http://localhost:5000/' + props.image}/>
                    }
                    <Card.Text>
                        {props.content}
                    </Card.Text>
                </Modal.Body>
                <Modal.Footer>
                    {window.location.pathname == '/my' &&
                        <>
                            <Link
                                to={EDIT_POST_ROUTE.substring(0, EDIT_POST_ROUTE.length - 3) + props.id}><Button
                                variant="warning">Редактировать</Button></Link>
                            <Button variant="danger" onClick={DeletePost}>
                                Удалить
                            </Button>
                        </>
                    }
                    <Button onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Card>
        </Modal>
    );
};

export default ModalPostCard;