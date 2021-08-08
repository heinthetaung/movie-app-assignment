import React, { useEffect } from 'react'
import Header from '../../common/header/Header'
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import './Details.css'
import { useState } from 'react';

const Details = () => {

    let location = useLocation();
    let params = useParams();
    console.log(location.pathname)
    console.log(params)

    const [movie, setMovie] = useState({})
    const [poster, setPoster] = useState('')
    const [title, setTitle] = useState('')
    const [genres, setGenres] = useState([])
    const [duration, setDuration] = useState(0)
    const [releaseDate, setReleaseDate] = useState('')
    const [rating, setRating] = useState(0)
    const [storyline, setStoryline] = useState('')

    

    let history = useHistory();

    let homeButtonStyle = {
        cursor: 'pointer',
        width: 'max-content',
        marginLeft: '24px',
        marginTop: '8px',
        marginBottom: '0px',
        height: '24px'
    }

    let fetchData = async (baseURL, parameter = '') => {
        const url = baseURL + parameter
        console.log(url)
        try {
            let rawResponse = await fetch(url, {
                mode: 'cors',
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
        let baseURL = 'http://localhost:8085/api/v1/movies/'
        fetchData(baseURL, params.movie_id).then(
            (data) => {
                if (data !== undefined) {
                    setMovie(data)
                    setPoster(data['poster_url'])
                    setTitle(data['title'])
                    setGenres(data['genres'])
                    setDuration(data['duration'])
                    setReleaseDate(data['release_date'])
                    setRating(data['rating'])
                    setStoryline(data['storyline'])
                }

            }
        )
    }, [])
    console.log(movie['poster_url'])
    console.log(movie)
    console.log(genres.join(','))

    return (
        <div>
            <Header></Header>
            <Typography style={homeButtonStyle} onClick={history.goBack}>
                {`< Back to Home`}
            </Typography>
            <div className='main-container'>
                <div className='left'>
                    left
                    <img src={poster} alt='poster' />
                </div>
                <div className='center'>
                    center
                    <Typography variant="headline" component='h2'>
                        {title}
                    </Typography>
                    <Typography>
                        <b>Genre:</b> {genres.join(',')}
                    </Typography>
                    <Typography>
                        <b>Duration:</b> {duration}
                    </Typography>
                    <Typography>
                        <b>Released Date:</b> {new Date(releaseDate).toDateString()}
                    </Typography>
                    <Typography>
                        <b>Rating:</b> {rating}
                    </Typography>
                    <br/>
                    <Typography>
                        <b>Plot:</b> {storyline}
                    </Typography>
                    <br/>
                    <Typography>
                        <b>Trailer:</b>
                    </Typography>
                    
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