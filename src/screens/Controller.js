import React, { useState } from 'react';
import Header from '../common/header/Header';
import { Modal } from "@material-ui/core"


let Controller = () => {
    let loginHandler = () => {
        console.log('login clicked')
    }

    let logoutHandler = () => {
        console.log('logout clicked')
    }

    let registerHandler = () => {
        console.log('register clicked')
        setOpen(true)
    }

    let handleClose = () => {
        console.log('register clicked')
        setOpen(false)
    }

    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Header name='Login'
                access='logged-i'
                loginAction={loginHandler}
                logoutAction={logoutHandler}
                registerAction={registerHandler}></Header>
            <Modal
                open={open}
                onClose={handleClose}>
                <div>
                    <text>test box</text>
                </div>
            </Modal>
        </div>

    )
}

export default Controller