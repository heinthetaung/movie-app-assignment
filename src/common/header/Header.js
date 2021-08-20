import React, {useState} from 'react'
import logo from '../../assets/logo.svg'
import './Header.css';
import LoginRegister from './LoginRegister';
import Button from "@material-ui/core/Button";

let Header = (props) => {

    const [showLoginRegister, setShowLoginRegister] = useState(false)

    const [tabValue, setTabValue] = React.useState(0);
    const [loginStatus, setLoginStatus] = useState(sessionStorage.getItem('access-token') === null ? false : true)


    const tabChangeHandler = (event, newValue) => {
        setTabValue(newValue);
    };

    let loginHandler = () => {
        console.log('login clicked')
        setTabValue(0)
        setShowLoginRegister(true)
    }

    let logoutHandler = () => {
        console.log('logout clicked')
        sessionStorage.removeItem('access-token')
        setLoginStatus(false)
    }

    let registerHandler = () => {
        console.log('register clicked')
        setTabValue(1)
        setShowLoginRegister(true)
    }

    let modalCloseHandler = () => {
        console.log('login/register modal closed')
        setShowLoginRegister(false)
    }

    let accessTokenHandler = (token) => {
        sessionStorage.setItem('access-token', token)
        setLoginStatus(true)
    }

    if (loginStatus === true) {
        return (
            <div className='header'>
                <img src={logo} alt='logo' className='movie-icon'></img >
                <span className='button-container'>
                    <Button
                        variant="contained"
                        color='default'
                        onClick={logoutHandler}>
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
                        onClick={loginHandler}>
                        Login
                    </Button>
                </span>
                <span className='button-container'>
                    <Button
                        variant="contained"
                        color='default'
                        onClick={registerHandler}>
                        Register
                    </Button>
                </span>
                <span>
                    <LoginRegister open={showLoginRegister}
                        value={tabValue}
                        closeHandler={modalCloseHandler}
                        tabChangeHandler={tabChangeHandler}
                        accessTokenHandler={accessTokenHandler}></LoginRegister>
                </span>
            </div>
        )
    }

}

export default Header