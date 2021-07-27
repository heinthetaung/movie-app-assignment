import React from 'react';
import './LoginRegister.css'
import Modal from 'react-modal';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
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

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
    },
};

export default function LoginRegister(props) {
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div>
            <Modal
                style={modalStyle}
                isOpen={props.open}
                onRequestClose={props.closeHandler}
                appElement={root}>
                <Tabs
                    value={props.value}
                    onChange={props.tabChangeHandler}
                    variant="fullWidth"
                    aria-label="simple tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={props.value} index={0}>
                    <div className='text-input'>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Username*</InputLabel>
                            <Input id="username-input" aria-describedby="my-helper-text" />
                        </FormControl>
                    </div>
                    <div className='text-input'>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Password*</InputLabel>
                            <Input id="password-input" aria-describedby="my-helper-text" />
                        </FormControl>
                    </div>
                    <div className='button'>
                        <Button variant="contained" color='primary'>Login</Button>
                    </div>
                </TabPanel>
                <TabPanel value={props.value} index={1}>
                    <div className='text-input'>
                        <FormControl>
                            <InputLabel htmlFor="my-input">First Name*</InputLabel>
                            <Input id="first-input" aria-describedby="my-helper-text" />
                        </FormControl>
                    </div>
                    <div className='text-input'>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Last Name*</InputLabel>
                            <Input id="last-input" aria-describedby="my-helper-text" />
                        </FormControl>
                    </div>
                    <div className='text-input'>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Email*</InputLabel>
                            <Input id="email-input" aria-describedby="my-helper-text" />
                        </FormControl>
                    </div>
                    <div className='text-input'>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Password*</InputLabel>
                            <Input id="password-input" aria-describedby="my-helper-text" />
                        </FormControl>
                    </div>
                    <div className='text-input'>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Contact Number.*</InputLabel>
                            <Input id="phone-input" />
                        </FormControl>
                    </div>
                    <div id='login-status'>
                        login successful
                    </div>
                    <div className='button'>
                        <Button variant="contained" color='primary'>Register</Button>
                    </div>
                </TabPanel>
            </Modal>
        </div>
    )
}
