import React, { useState } from 'react';
import Header from '../common/header/Header';
import LoginRegister from '../common/header/LoginRegister';


let Controller = () => {

    const [showLoginRegister, setShowLoginRegister] = useState(false)

    const [tabValue, setTabValue] = React.useState(0);


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

    return (
        <div>
            <Header name='Login'
                access='logged-i'
                loginAction={loginHandler}
                logoutAction={logoutHandler}
                registerAction={registerHandler}></Header>
            <LoginRegister open={showLoginRegister}
                value={tabValue}
                closeHandler={modalCloseHandler}
                tabChangeHandler={tabChangeHandler}></LoginRegister>
        </div>

    )
}

export default Controller