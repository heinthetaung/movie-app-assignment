import React from 'react'
import logo from '../../assets/logo.svg'
import './Header.css';
import Button from "@material-ui/core/Button";

let Header = (props) => {
    return (
        <div className='header'>
            <img src={logo} alt='logo' className='movie-icon'></img >
            <span className='button-container'>
                <Button
                    variant="contained"
                    color='default'
                    onClick={props.action}>
                    {props.name}
                </Button>
            </span>
            <span className='button-container'>
                <Button
                    variant="contained"
                    color='default'
                    onClick={props.action}>
                    Register
                </Button>
            </span>
        </div>
    )
}

export default Header