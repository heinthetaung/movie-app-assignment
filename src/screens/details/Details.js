import React from 'react'
import Header from '../../common/header/Header'
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import './Details.css'

const Details = () => {

    let location = useLocation();
    let params = useParams();
    console.log(location.pathname)
    console.log(params)

    let history = useHistory();

    let homeButtonStyle = {
        cursor: 'pointer',
        width: 'max-content',
        marginLeft: '24px',
        marginTop: '8px',
        marginBottom: '0px',
        height: '24px'
    }

    return (

        <div>
            <Header></Header>
            <Typography style={homeButtonStyle} onClick={history.goBack}>
                {`< Back to Home`}
            </Typography>
            <div className='main-container'>
                <div className='left'>
                    left
                </div>
                <div className='center'>
                    center
                </div>
                <div className='right'>
                    right
                </div>
            </div>
            {params.movie_id}
        </div>
    )
};

export default Details