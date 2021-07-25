import React from 'react';
import Header from '../common/header/Header';

let Controller = () => {
    let loginHandler = () => {
        console.log('login clicked')
    }
    return (
        <div>
            <Header name='Login' action={loginHandler}></Header>
        </div>
    )
}

export default Controller