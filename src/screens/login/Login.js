import React from 'react';
import './Login.css'
import Modal from 'react-modal';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from "@material-ui/core/Button";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}

export default function Login(props) {
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div>
            <Modal className='modal-container'
                isOpen={props.open}
                onRequestClose={props.closeHandler}
                appElement={root}>
                <Tabs
                    value={0}
                    onChange={props.tabChangeHandler}
                    variant="fullWidth"
                    aria-label="simple tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />
                </Tabs>
                <div className='text-input'>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Username</InputLabel>
                        <Input id="username-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
                <div className='text-input'>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Password</InputLabel>
                        <Input id="password-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
                <div className='button'>
                    <Button variant="contained" color='primary'>Login</Button>
                </div>
            </Modal>
        </div>
    )
}
