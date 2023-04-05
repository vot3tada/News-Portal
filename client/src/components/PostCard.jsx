import '../styles/PostCard.css'

import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {POSTS_ROUTE} from "../utils/consts";

const PostCard = (props) => {
    return (
        <div className={'Card'}>
            <Card style={{width: '35rem'}} key={props.id}>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    {props.image &&
                        <Card.Img variant="top" src={'http://localhost:5000/' + props.image}/>}
                    <Card.Text>
                        <p className={'contentText'}>{props.content.substring(0, 200)+'...'}</p>
                    </Card.Text>
                </Card.Body>
                <Link to={POSTS_ROUTE + '/' + props.id} className={'CardButton'}>
                    <Button variant="primary" size="lg">Прочитать полностью</Button>
                </Link>
            </Card>
        </div>
    );
};
// <div key={props.id}>
//     <p className={'title'}>{props.title}</p>
//     <div className={'content'}>
//         <p className={'contentText'}>{props.content}</p>
//     </div>
//     {
//         props.image &&
//         <div className={'image'}>
//             <img src={'http://localhost:5000/' + props.image}/>
//         </div>
//     }
// </div>
export default PostCard;