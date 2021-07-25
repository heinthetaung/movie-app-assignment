import React, { useState } from 'react';
import Header from '../common/header/Header';
import Login from './login/Login';


let Controller = () => {

    const [showLogin, setShowLogin] = useState(false)
    let loginHandler = () => {
        console.log('login clicked')
        setShowLogin(true)
    }

    let logoutHandler = () => {
        console.log('logout clicked')
    }

    let registerHandler = () => {
        console.log('register clicked')
    }

    let loginCloseHandler = () => {
        console.log('login modal closed')
        setShowLogin(false)
    }

    return (
        <div>
            <Header name='Login'
                access='logged-i'
                loginAction={loginHandler}
                logoutAction={logoutHandler}
                registerAction={registerHandler}></Header>
            <Login open={showLogin} closeHandler={loginCloseHandler}></Login>
        </div>

    )
}

export default Controller