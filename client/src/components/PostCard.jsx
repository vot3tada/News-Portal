import '../styles/PostCard.css'

import {Button, Card, Container, Row, Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {POSTS_ROUTE} from "../utils/consts";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../AppProviders/UserProvider";
import ModalPostCard from "./ModalPostCard";
import {post as GetPost, getLike, setLike} from "../http/postApi";


const PostCard = (props) => {
    const {user, setUser} = useContext(UserContext);
    const [modalShow, setModalShow] = React.useState(false);
    const [userLike, setUserLike] = useState(false);
    const [likes, setLikes] = useState([])
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        getLike(props.id).then(res => {
            setLikes(res)
            setUserLike(false);
            if (res.find(like => like.userId == user?.id))
            {
                setUserLike(true);
            }
        });
    }, [user, props.update])
    const Like = (event) => {
        setLike(props.id).then(() => {
            if (userLike) likes.pop()
            else likes.push({})
            setUserLike(!userLike);
        })
        event.stopPropagation();
    }
    const ShowModal = () => {
        setModalShow(true);
        GetPost(props.id).then();
    }
    return (
        <div style={{paddingTop: '10px'}} className={!visible ? 'deleted' : undefined}>
            <Container>
                <Card onClick={ShowModal}>
                    <Card.Body>
                        <div >
                            <Row>
                                {props.image &&
                                    <Col xl={'5'}>
                                        <Card.Img src={process.env.REACT_APP_API_URL + props.image}/>
                                    </Col>
                                }
                                <Col xl={'7'}>
                                    <Card.Title className={'noselect'}>{props.title}</Card.Title>
                                    <Card.Text className={'cardText noselect'}>
                                        <Form.Control className={'cardText noselect'} readOnly={true} as="textarea" rows={11} value={props.content}/>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </div>
                        <div className={'cardFooter'}>
                            <div className={'noselect'}>
                                {`${props.createdAt.substring(0,10)} ${props.tag}`}
                            </div>
                            <div>
                                <Button variant={userLike?'danger':'primary'} onClick={Like}>{'♥ ' + (likes.length)}</Button>
                            </div>
                        </div>
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
                tag={props.tag}
                createdAt={props.createdAt}
                userLike={userLike}
                likes={likes}
                Like={Like}
                setVisible={setVisible}
            />
        </div>
    );
};
export default PostCard;