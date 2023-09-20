import { Outlet } from 'react-router-dom';
import NavBar from './components/layouts/NavBar';


/* This function is used for nested routes */
export default function NavigationBar () {
    return(
        <>
            <nav className="sticky"><NavBar /></nav>
            <Outlet />
        </>
    )
}