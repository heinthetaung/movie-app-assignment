import React from 'react';
import Header from '../common/header/Header';

let Controller = () => {
    let loginHandler = () => {
        console.log('login clicked')
    }

    let logoutHandler = () => {
        console.log('logout clicked')
    }

    let registerHandler = () => {
        console.log('register clicked')
    }

    return (
        <div>
            <Header name='Login'
            access='logged-in'
            loginAction={loginHandler}
            logoutAction={logoutHandler}
            registerAction={registerHandler}></Header>
        </div>
    )
}

export default Controller