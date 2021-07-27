import React, { useState } from 'react';
import Header from '../common/header/Header';
import Login from './login/Login';
import Register from './register/Register';



let Controller = () => {

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [registerTab, setregisterTab] = React.useState(1);


    const registerTabChangeHandler = (event, newValue) => {
        setregisterTab(newValue);
    };

    let loginHandler = () => {
        console.log('login clicked')
        setShowLogin(true)
        setShowRegister(false)
    }

    let logoutHandler = () => {
        console.log('logout clicked')
    }

    let registerHandler = () => {
        console.log('register clicked')
        setShowLogin(false)
        setShowRegister(true)
    }

    let loginCloseHandler = () => {
        console.log('login modal closed')
        setShowLogin(false)
    }

    let registerCloseHandler = () => {
        console.log('register modal closed')
        setShowRegister(false)
    }

    let closeHandler = () => {
        console.log('login/register modal closed')
        setShowLogin(false)
        setShowRegister(false)
    }

    return (
        <div>
            <Header name='Login'
                access='logged-i'
                loginAction={loginHandler}
                logoutAction={logoutHandler}
                registerAction={registerHandler}></Header>
            <Login open={showLogin}
                closeHandler={closeHandler}
                tabChangeHandler={registerHandler}></Login>
            <Register open={showRegister}
                closeHandler={closeHandler}
                tabChangeHandler={loginHandler}></Register>
        </div>

    )
}

export default Controller