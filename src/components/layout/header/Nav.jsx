import React from "react";
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <Link to="/">CITATER</Link>
            <Link to="/admin">ADMIN</Link>
        </nav>
    );
};

export default Nav;
