import {useContext} from 'react';
import {useRoutes} from 'react-router-dom'
import {privateRoutes, publicRoutes} from "../routes";
import {UserContext} from "../AppProviders/UserProvider";

const AppRouter = () => {
    const {user, setUser} = useContext(UserContext);
    return useRoutes(
        [...publicRoutes.map(({path, Component}) =>
            ({path: path, element: <Component/>})),
            ...(user ? privateRoutes.map(({path, Component}) =>
                ({path: path, element: <Component/>})) : [])
        ]
    );
};

export default AppRouter;