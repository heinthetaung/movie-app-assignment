import React, { useEffect, useState } from 'react';
import Header from '../../common/header/Header';
import './Home.css'
import Button from '@material-ui/core/Button'

let Home = () => {

    const [movies, setMovies] = useState({})
    const [value, setValue] = useState(true)
    let getMovieData = async () => {
        const baseURL = 'http://localhost:8085/api/v1/movies'
        const url = baseURL + '?page=1&limit=6'
        console.log(url)
        try {
            let rawResponse = await fetch(url, {
                headers: { "Accept": "application/json;charset=UTF-8" }
            })
            if (rawResponse.ok) {
                return await rawResponse.json();
            }
        } catch (e) {
            console.error(e)
        }

    }


    useEffect(() => {
        getMovieData().then(movies => setMovies(movies))
    }, [value])


    const updateMovieHandler = () => {
        setValue(!value)
    }
    return (
        <div>
            <Header name='Login' access='logged-i'></Header>
            <p id='heading'>Upcoming Movies</p>
            <Button onClick={updateMovieHandler}>Update Movies List</Button>
            {/* {movies} */}
        </div>
    )
}

export default Home;