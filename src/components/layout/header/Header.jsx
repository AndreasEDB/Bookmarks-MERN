import React from 'react'
import {Link} from 'react-router-dom'
import Nav from './Nav'
import './Header.scss'

const Header = () => {
    return (
        <header>
            <Link className="logo" to="/">Fantastiske links</Link>
            <Nav />
        </header>
    )
}

export default Header
