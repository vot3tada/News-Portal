import React, {useState, useContext, useEffect} from 'react';
import {post as GetPost} from "../http/postApi";
import {useParams} from "react-router-dom";
import {UserContext} from "../AppProviders/UserProvider";
import NotFound from "../components/NotFound";


const Post = () => {
    const {id} = useParams()
    const {user, setUser} = useContext(UserContext);
    const [post, setPost] = useState();
    const [error, setError] = useState();
    useEffect(() => {
        GetPost(id).then((res) => {
            setPost(res)
        }).catch(err => {
                setError(err);
            }
        )
    }, [])
    if (error) return <NotFound/>;
    return (
        <div>
            {
                post &&
                <div>
                    <h1>{post?.title}</h1>
                    <p>{post?.content}</p>
                    {
                        post?.image &&
                        <img src={'http://localhost:5000/' + post.image}/>
                    }
                    {(post?.userId === user?.id && user?.id !== undefined) &&
                        <div>
                            <button>Редактировать</button>
                            <button>Удалить</button>
                        </div>
                    }
                </div>
            }

        </div>
    );
};

export default Post;