import React from 'react'
import Header from '../../common/header/Header'
import { useLocation, useParams } from 'react-router-dom';


const Details = (props) => {

    let location = useLocation();
    let params = useParams();
    console.log(location.pathname)
    console.log(params)

    return (

        <div>
            <Header></Header>
            {params.movie_id}
        </div>
    )
};

export default Details