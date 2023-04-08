import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {UserContext} from "../AppProviders/UserProvider";
import NotFound from "../components/NotFound";
import {changeRole} from "../http/userAPI";

const Admin = () => {
    const {user, setUser} = useContext(UserContext);
    const [login, setLogin] = useState('');
    const [role, setRole] = useState('USER');
    const [tag, setTag] = useState('');
    const ChangeRole = () => {
        changeRole(login, role).then().catch(err => console.log(err))
    }
    const addTag = () => {

    }
    if (!user || user?.role != 'ADMIN') return <NotFound/>
    return (
        <div className={'centerCreateCard'}>
            <Card style={{width: '35rem'}}>
                <Card.Body className={'Center'} style={{flexDirection: 'column'}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Сменить роль пользователя</Form.Label>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Control type="input" value={login} onChange={e => setLogin(e.target.value)} placeholder="Логин"/>
                                    </Col>
                                    <Col>
                                        <Form.Select name={'Роли'} onChange={e => setRole(e.target.value)}>
                                            <option key={1} value={'USER'}>Читатель</option>
                                            <option key={2} value={'CREATOR'}>Редактор</option>
                                            <option key={3} value={'ADMIN'}>Админ</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Button onClick={ChangeRole}>Назначить</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Добавить новый тег</Form.Label>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Control type="input" placeholder="Название тега" value={tag} onChange={e => setTag(e.target.value)}/>
                                    </Col>
                                    <Col>
                                        <Button>Добавить</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Удалить тег</Form.Label>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Select name={'Роли'}>
                                            <option key={1} value={'USER'}>Читатель</option>
                                            <option key={2} value={'CREATOR'}>Редактор</option>
                                            <option key={3} value={'ADMIN'}>Админ</option>
                                        </Form.Select>
                                    </Col>
                                    <Col >
                                        <Button>Удалить</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Form.Group>
                </Card.Body>

            </Card>

        </div>
    );
};

export default Admin;