import React, { useState } from 'react';
import './LoginRegister.css'
import Modal from 'react-modal';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
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
            {...other}>
            {value === index && (<div>{children}</div>)}
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

    //for login tab
    const [userName, setUserName] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [requiredUserName, setRequiredUserName] = useState('displayNone')
    const [requiredLoginPassword, setRequiredLoginPassword] = useState('displayNone')

    //for register tab
    const [firstName, setfirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [contactNumber, setContactNumber] = useState('')

    const [requiredFirstName, setRequiredFirstName] = useState('displayNone')
    const [requiredLastName, setRequiredLastName] = useState('displayNone')
    const [requiredEmail, setRequiredEmail] = useState('displayNone')
    const [requiredPassword, setRequiredPassword] = useState('displayNone')
    const [requiredContactNumber, setRequiredContactNumber] = useState('displayNone')

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    let inputOnChangeHandler = (event) => {
        switch (event.target.id) {
            case 'first-input':
                event.target.value === '' ? setRequiredFirstName('displayBlock') : setRequiredFirstName('displayNone')
                setfirstName(event.target.value)
                break;
            case 'last-input':
                event.target.value === '' ? setRequiredLastName('displayBlock') : setRequiredLastName('displayNone')
                setLastName(event.target.value)
                break;
            case 'email-input':
                event.target.value === '' ? setRequiredEmail('displayBlock') : setRequiredEmail('displayNone')
                setEmail(event.target.value)
                break;
            case 'password-input':
                event.target.value === '' ? setRequiredPassword('displayBlock') : setRequiredPassword('displayNone')
                setPassword(event.target.value)
                break;
            case 'contactNumber-input':
                event.target.value === '' ? setRequiredContactNumber('displayBlock') : setRequiredContactNumber('displayNone')
                setContactNumber(event.target.value)
                break;
            case 'username-input':
                event.target.value === '' ? setRequiredUserName('displayBlock') : setRequiredUserName('displayNone')
                setUserName(event.target.value)
                break;
            case 'loginPassword-input':
                event.target.value === '' ? setRequiredLoginPassword('displayBlock') : setRequiredLoginPassword('displayNone')
                setLoginPassword(event.target.value)
                break;
            default:
        }
    }

    let resetInputValidation = () => {
        setRequiredUserName('displayNone')
        setRequiredLoginPassword('displayNone')
        setRequiredFirstName('displayNone')
        setRequiredLastName('displayNone')
        setRequiredEmail('displayNone')
        setRequiredPassword('displayNone')
        setRequiredContactNumber('displayNone')
    }

    let loginAPI = async () => {
        const baseURL = 'http://localhost:8085/api/v1/'
        const loginURL = 'auth/login'
        console.log(userName, loginPassword)
        const myHeaders = new Headers();
        // myHeaders.set()
        const config = {
            mode: 'cors',
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json',
                // "Authorization": "Basic " + window.btoa(userName + ":" + loginPassword),
            },
            
            // body: {
            //     "email": "eve.holt@reqres.in",
            //     "password": "cityslicka"
            // },
        }
        console.log("Basic " + window.btoa(userName + ":" + loginPassword))
        // let rawResponse = await fetch(baseURL+loginURL, config)
        // let rawResponse = await fetch('https://cors-demo.glitch.me/', config)
        let rawResponse = await fetch('https://cors-demo.glitch.me/allow-cors', config)

        
    }

    let loginButtonHandler = () => {
        userName === '' ? setRequiredUserName('displayBlock') : setRequiredUserName('displayNone')
        loginPassword === '' ? setRequiredLoginPassword('displayBlock') : setRequiredLoginPassword('displayNone')
        loginAPI()
    }

    let registerButtonHandler = () => {
        firstName === '' ? setRequiredFirstName('displayBlock') : setRequiredFirstName('displayNone')
        lastName === '' ? setRequiredLastName('displayBlock') : setRequiredLastName('displayNone')
        email === '' ? setRequiredEmail('displayBlock') : setRequiredEmail('displayNone')
        password === '' ? setRequiredPassword('displayBlock') : setRequiredPassword('displayNone')
        contactNumber === '' ? setRequiredContactNumber('displayBlock') : setRequiredContactNumber('displayNone')
        console.log(firstName, lastName, email, password, contactNumber)
    }

    let tabChangeHandler = (event, newValue) => {
        props.tabChangeHandler(event, newValue)
        resetInputValidation()
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
                    onChange={tabChangeHandler}
                    variant="fullWidth"
                    aria-label="simple tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={props.value} index={0}>

                    <div className='text-input'>
                        <FormControl required={true}>
                            <InputLabel htmlFor="my-input">Username</InputLabel>
                            <Input id="username-input" aria-describedby="my-helper-text" onChange={inputOnChangeHandler}/>
                            <FormHelperText id={requiredUserName}>required</FormHelperText>
                        </FormControl>
                    </div>

                    <div className='text-input'>
                        <FormControl required={true}>
                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input id="loginPassword-input" aria-describedby="my-helper-text" onChange={inputOnChangeHandler}/>
                            <FormHelperText id={requiredLoginPassword}>required</FormHelperText>
                        </FormControl>
                    </div>

                    <div className='button'>
                        <Button variant="contained" color='primary' onClick={loginButtonHandler}>Login</Button>
                    </div>

                </TabPanel>
                <TabPanel value={props.value} index={1}>

                    <div className='text-input'>
                        <FormControl required={true}>
                            <InputLabel htmlFor="my-input">First Name</InputLabel>
                            <Input id="first-input" aria-describedby="my-helper-text" onChange={inputOnChangeHandler} />
                            <FormHelperText id={requiredFirstName}>required</FormHelperText>
                        </FormControl>
                    </div>

                    <div className='text-input'>
                        <FormControl required={true}>
                            <InputLabel htmlFor="my-input">Last Name</InputLabel>
                            <Input id="last-input" aria-describedby="my-helper-text" onChange={inputOnChangeHandler} />
                            <FormHelperText id={requiredLastName}>required</FormHelperText>
                        </FormControl>
                    </div>

                    <div className='text-input'>
                        <FormControl required={true}>
                            <InputLabel htmlFor="my-input">Email</InputLabel>
                            <Input id="email-input" aria-describedby="my-helper-text" onChange={inputOnChangeHandler} />
                            <FormHelperText id={requiredEmail}>required</FormHelperText>
                        </FormControl>
                    </div>

                    <div className='text-input'>
                        <FormControl required={true}>
                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input id="password-input" aria-describedby="my-helper-text" onChange={inputOnChangeHandler} />
                            <FormHelperText id={requiredPassword}>required</FormHelperText>
                        </FormControl>
                    </div>

                    <div className='text-input'>
                        <FormControl required={true}>
                            <InputLabel htmlFor="my-input">Contact Number.</InputLabel>
                            <Input id="contactNumber-input" onChange={inputOnChangeHandler} />
                            <FormHelperText id={requiredContactNumber}>required</FormHelperText>
                        </FormControl>
                    </div>

                    <div id='login-status'>
                        login successful
                    </div>

                    <div className='button'>
                        <Button variant="contained" color='primary' onClick={registerButtonHandler}>Register</Button>
                    </div>

                </TabPanel>
            </Modal>
        </div>
    )
}
