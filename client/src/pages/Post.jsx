import React, {useState, useContext, useEffect} from 'react';
import {post as GetPost, deletePost} from "../http/postApi";
import {Link, useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../AppProviders/UserProvider";
import NotFound from "../components/NotFound";
import {Card, Button} from "react-bootstrap";
import '../styles/PostCard.css'
import {EDIT_POST_ROUTE, POSTS_ROUTE} from "../utils/consts";


const Post = () => {
    const {id} = useParams()
    const {user, setUser} = useContext(UserContext);
    const [post, setPost] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        GetPost(id).then((res) => {
            setPost(res)
        }).catch(err => {
                setError(err);
            }
        )
    }, [])

    let DeletePost = () =>
    {
        deletePost(id).then();
        navigate(POSTS_ROUTE);
    }
    if (error) return <NotFound/>;
    return (
        <div className={'Center'}>
            {
                post &&
                <Card style={{width: '35rem'}}>
                    <Card.Body>
                        <div className={'head'}>
                            {(post?.userId === user?.id && user?.id !== undefined) &&
                                <div className={'headButtons'}>
                                    <Link to={EDIT_POST_ROUTE.substring(0, EDIT_POST_ROUTE.length - 3) + id}><Button
                                        variant="warning">Редактировать</Button></Link>
                                    <Button variant="danger" onClick={DeletePost}>
                                        Удалить
                                    </Button>
                                </div>
                            }
                        </div>
                        <div>
                            <h2>{post?.title}</h2>
                        </div>
                        {post?.image &&
                            <Card.Img variant="top" src={'http://localhost:5000/' + post?.image}/>}
                        <Card.Text>
                            <p className={'contentText'}>{post?.content}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            }
        </div>
    );
};

export default Post;