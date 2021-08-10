import React, { useEffect } from 'react'
import Header from '../../common/header/Header'
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import './Details.css'
import { useState } from 'react';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
    const [videoID, setVideoID] = useState('')


    let history = useHistory();

    let homeButtonStyle = {
        cursor: 'pointer',
        width: 'max-content',
        marginLeft: '24px',
        marginTop: '8px',
        marginBottom: '0px',
        height: '24px'
    }

    let starBlackStyle = {
        color: 'black'
    }

    let starYellowStyle = {
        color: 'yellow'
    }

    let starStyle= {
        one: {color: 'yellow', cursor: 'pointer'},
        two: {color: 'yellow'},
        three: {color: 'yellow'},
        four: {color: 'yellow'},
        five: {color: 'yellow'},
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
                    setVideoID(data['trailer_url'])
                }

            }
        )
    }, [])
    console.log(movie['poster_url'])
    console.log(movie)
    console.log(genres.join(','))
    console.log(videoID.split('=')[1])

    let starClickHandler = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.id)
    }

    return (
        <div>
            <Header></Header>
            <Typography style={homeButtonStyle} onClick={history.goBack}>
                {`< Back to Home`}
            </Typography>
            <div className='main-container'>
                <div className='left'>
                    <img src={poster} alt='poster' />
                </div>
                <div className='center'>
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
                    <br />
                    <Typography>
                        <b>Plot:</b> {storyline}
                    </Typography>
                    <br />
                    <Typography>
                        <b>Trailer:</b>
                    </Typography>
                    <YouTube style={{ margin: '300px' }} videoId={videoID.split('=')[1]}></YouTube>
                </div>
                <div className='right'>
                    <Typography>
                        <b>Rate this movie:</b>
                    </Typography>
                    <StarBorderIcon id='one' onClick={starClickHandler} style={starStyle.one}></StarBorderIcon>
                    <StarBorderIcon id='two' onClick={starClickHandler} style={starStyle.two}></StarBorderIcon>
                    <StarBorderIcon id='three' onClick={starClickHandler} style={starStyle.three}></StarBorderIcon>
                    <StarBorderIcon id='four' onClick={starClickHandler} style={starStyle.four}></StarBorderIcon>
                    <StarBorderIcon id='five' onClick={starClickHandler} style={starStyle.five}></StarBorderIcon>
                </div>
            </div>
        </div>
    )
};

export default Details