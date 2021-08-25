import React, { useState } from 'react'
import logo from '../../assets/logo.svg'
import './Header.css';
import LoginRegister from './LoginRegister';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';

let Header = (props) => {

    const history = useHistory()

    const [showLoginRegister, setShowLoginRegister] = useState(false)

    const [tabValue, setTabValue] = React.useState(0);
    const [loginStatus, setLoginStatus] = useState(
        sessionStorage.getItem('access-token') === null ? false : true)

    const [loginLogoutButtonText, setLoginLogoutButtonText] = useState(
        loginStatus === true ? 'Logout' : 'Login')


    const tabChangeHandler = (event, newValue) => {
        setTabValue(newValue);
    };

    let loginLogoutHandler = () => {

        if (loginStatus === true) {
            //user is logged in
            console.log('logout clicked')
            setLoginLogoutButtonText('Login')
            sessionStorage.removeItem('access-token')
            setLoginStatus(false)
            setShowLoginRegister(false)
        } else {
            //user is logged out
            console.log('login clicked')
            setTabValue(0)
            setShowLoginRegister(true)
        }
    }

    let modalCloseHandler = () => {
        console.log('login/register modal closed')
        setShowLoginRegister(false)
    }

    let accessTokenHandler = (token) => {
        sessionStorage.setItem('access-token', token)
        setLoginStatus(true)
        setShowLoginRegister(false)
        setLoginLogoutButtonText('Logout')
    }

    let bookShowHandler = () => {
        console.log('bookshow clicked')
        if (loginStatus === false) {
            //if user is not logged in, show login/register modal
            loginLogoutHandler()
        } else {
            //if user is logged in, show booking modal
            if (props.movie_id !== undefined) {
                console.log('bookshowHandler', props.movie_id)
                console.log('bookshowHandler', props.match)
                history.push(
                    '/bookshow/' + props.movie_id
                )
            }
        }
    }



    return (
        <div className='header'>
            <img src={logo} alt='logo' className='movie-icon'></img >
            <span className='button-container'>
                <Button
                    variant="contained"
                    color='default'
                    onClick={loginLogoutHandler}>
                    {loginLogoutButtonText}
                </Button>
            </span>
            <span className='button-container'>
                <Button
                    disabled={!props.enableBookShow}
                    variant="contained"
                    color='primary'
                    onClick={bookShowHandler}>
                    BOOK SHOW
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

export default Header