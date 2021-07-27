import React from 'react';
import './Register.css'
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

export default function Login(props) {
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [value, setValue] = React.useState(1);

    return (
        <div>
            <Modal className='modal-container'
                isOpen={props.open}
                onRequestClose={props.closeHandler}
                appElement={root}>
                <Tabs
                    value={value}
                    onChange={props.tabChangeHandler}
                    variant="fullWidth"
                    aria-label="simple tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Register" {...a11yProps(1)} />
                </Tabs>
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
            </Modal>
        </div>
    )
}
