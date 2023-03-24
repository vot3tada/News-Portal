import React, {useState, useContext} from 'react';
import {post as GetPost} from "../http/postApi";
import UserContext from "../App"


const Post = () => {
    const user = useContext(UserContext)
    const [post, setPost] = useState([]);
    GetPost().then((res) => {
        setPost(res.data)
    })
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {
                post.image ?
                    <img src={}/>
                    :
                    ''
            }
            <div>
                {post.userId == user.id ?
                    <div>
                        <button>Редактировать</button>
                        <button>Удалить</button>
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default Post;