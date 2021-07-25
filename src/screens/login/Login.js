import React from 'react';
import './Login.css'
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


let loginForm1 = (
    <div>
        <input type='text' placeholder='username'></input>
        <input type='password' placeholder='password'></input>
    </div>
)

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


// let LoginForm = () => {

//     function a11yProps(index) {
//         return {
//             id: `simple-tab-${index}`,
//             'aria-controls': `simple-tabpanel-${index}`,
//         };
//     }

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const [value, setValue] = React.useState(0);

//     return (
//         <div className='container'>
//             <AppBar position="static">
//                 <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//                     <Tab label="Item One" {...a11yProps(0)} />
//                     <Tab label="Item Two" {...a11yProps(1)} />
//                 </Tabs>
//             </AppBar>
//             <TabPanel value={value} index={0}>
//                 <FormControl>
//                     <InputLabel htmlFor="my-input">Email address</InputLabel>
//                     <Input id="my-input" aria-describedby="my-helper-text" />
//                     <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
//                 </FormControl>
//             </TabPanel>
//             <TabPanel value={value} index={1}>
//                 <FormControl>
//                     <InputLabel htmlFor="my-input">username</InputLabel>
//                     <Input id="my-input" aria-describedby="my-helper-text" />
//                     <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
//                 </FormControl>
//             </TabPanel>

//         </div>
//     )
// }

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

    const [value, setValue] = React.useState(0);

    return (
        <div >
            <Modal
                open={props.open}
                onClose={props.closeHandler}>
                {/* <div >
                    <LoginForm></LoginForm>
                </div> */}
                <div className='container'>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Email address</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FormControl>
                            <InputLabel htmlFor="my-input">username</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>
                    </TabPanel>

                </div>
            </Modal>
        </div>
    )
}
