import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {
    LOGIN_ROUTE,
    LOGOUT_ROUTE,
    POSTS_ROUTE,
    REGISTRATION_ROUTE,
    CREATE_POST_ROUTE,
    SMART_POSTS_ROUTE,
    MY_POSTS_ROUTE, ADMIN_ROUTE
} from "../utils/consts";
import {UserContext} from "../AppProviders/UserProvider";
import {Navbar as NavbarBoot, Container, Nav, NavDropdown, Form, Button} from "react-bootstrap";
import '../styles/Navbar.css'
import CreatePost from "../pages/CreatePost";

const Navbar = () => {
    const {user} = useContext(UserContext);
    return (
        <div>
            <NavbarBoot collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <NavbarBoot.Brand><NavLink className={'Brand'} to={POSTS_ROUTE}>Новости</NavLink></NavbarBoot.Brand>
                    <NavbarBoot.Toggle aria-controls="responsive-navbar-nav"/>
                    <NavbarBoot.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            {user &&
                                <Nav.Link>
                                    <NavLink to={SMART_POSTS_ROUTE} className={'Link'}>
                                        Новости для вас
                                    </NavLink>
                                </Nav.Link>
                            }


                            {(user?.role === 'ADMIN' || user?.role === 'CREATOR') &&
                                <Nav.Link>
                                    <NavLink className={'Link'} to={CREATE_POST_ROUTE}>
                                        Добавить новость
                                    </NavLink>
                                </Nav.Link>
                            }


                            {(user?.role === 'CREATOR') &&
                                <Nav.Link>
                                    <NavLink className={'Link'} to={MY_POSTS_ROUTE}>
                                        Мои новости
                                    </NavLink>
                                </Nav.Link>
                            }

                            {user?.role === 'ADMIN' &&
                                <NavDropdown
                                    title={<span className="text-primary my-auto">Панель администратора</span>}
                                    id="nav-dropdown">
                                    <NavDropdown.Item>
                                        <NavLink className={'Link'} to={MY_POSTS_ROUTE}>
                                            Все новости
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink className={'Link'} to={ADMIN_ROUTE}>
                                            Изменение ролей
                                        </NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <Nav.Link>
                                        <NavLink className={'Link'} to={LOGOUT_ROUTE}>
                                            Выйти
                                        </NavLink>
                                    </Nav.Link>
                                    :
                                    <Nav.Link>
                                        <NavLink className={'Link'} to={LOGIN_ROUTE}>
                                            Войти
                                        </NavLink>
                                        <NavLink className={'Link'} to={REGISTRATION_ROUTE}>
                                            Регистрация
                                        </NavLink>
                                    </Nav.Link>
                            }
                        </Nav>
                    </NavbarBoot.Collapse>
                </Container>
            </NavbarBoot>
        </div>
    );
};

export default Navbar;

