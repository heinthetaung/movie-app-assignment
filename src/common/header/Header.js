import React from 'react'
import logo from '../../assets/logo.svg'
import './Header.css';
import Button from "@material-ui/core/Button";

let Header = (props) => {
    if(props.access === 'logged-in') {
        return (
            <div className='header'>
                <img src={logo} alt='logo' className='movie-icon'></img >
                <span className='button-container'>
                    <Button
                        variant="contained"
                        color='default'
                        onClick={props.logoutAction}>
                        Logout
                    </Button>
                </span>
            </div>
        )
    } else {
        return (
            <div className='header'>
                <img src={logo} alt='logo' className='movie-icon'></img >
                <span className='button-container'>
                    <Button
                        variant="contained"
                        color='default'
                        onClick={props.loginAction}>
                        Login
                    </Button>
                </span>
                <span className='button-container'>
                    <Button
                        variant="contained"
                        color='default'
                        onClick={props.registerAction}>
                        Register
                    </Button>
                </span>
            </div>
        )
    }
    
}

export default Header