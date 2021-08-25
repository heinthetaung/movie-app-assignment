import React, { useEffect } from 'react'
import Header from '../../common/header/Header'
import Typography from "@material-ui/core/Typography";
import './Details.css'
import { useState } from 'react';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from "react-router-dom";

const Details = (props) => {
    const { baseUrl } = props

    const [movie, setMovie] = useState({})
    const [poster, setPoster] = useState('')
    const [title, setTitle] = useState('')
    const [genres, setGenres] = useState([])
    const [duration, setDuration] = useState(0)
    const [releaseDate, setReleaseDate] = useState('')
    const [rating, setRating] = useState(0)
    const [storyline, setStoryline] = useState('')
    const [videoID, setVideoID] = useState('')
    const [artists, setArtists] = useState([])

    let starStyle = {
        one: { color: 'black', cursor: 'pointer' },
        two: { color: 'black', cursor: 'pointer' },
        three: { color: 'black', cursor: 'pointer' },
        four: { color: 'black', cursor: 'pointer' },
        five: { color: 'black', cursor: 'pointer' },
    }

    const [star, setStar] = useState(starStyle)

    let homeButtonStyle = {
        cursor: 'pointer',
        width: 'max-content',
        marginLeft: '24px',
        marginTop: '8px',
        marginBottom: '0px',
        height: '24px'
    }

    let starBlackStyle = {
        color: 'black',
        cursor: 'pointer'
    }

    let starYellowStyle = {
        color: 'yellow',
        cursor: 'pointer'
    }

    let fetchData = async (url, parameter = '') => {
        url = url + parameter
        console.log('debugging url', url)
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
        fetchData(baseUrl + 'movies/', props.match.params.id).then(
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
                    setArtists(data['artists'])
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
        switch (event.target.id) {
            case '1':
                starStyle.one = starYellowStyle
                starStyle.two = starBlackStyle
                starStyle.three = starBlackStyle
                starStyle.four = starBlackStyle
                starStyle.five = starBlackStyle
                setStar(starStyle)
                break;
            case '2':
                starStyle.one = starYellowStyle
                starStyle.two = starYellowStyle
                starStyle.three = starBlackStyle
                starStyle.four = starBlackStyle
                starStyle.five = starBlackStyle
                setStar(starStyle)
                break;
            case '3':
                starStyle.one = starYellowStyle
                starStyle.two = starYellowStyle
                starStyle.three = starYellowStyle
                starStyle.four = starBlackStyle
                starStyle.five = starBlackStyle
                setStar(starStyle)
                break;
            case '4':
                starStyle.one = starYellowStyle
                starStyle.two = starYellowStyle
                starStyle.three = starYellowStyle
                starStyle.four = starYellowStyle
                starStyle.five = starBlackStyle
                setStar(starStyle)
                break;
            case '5':
                starStyle.one = starYellowStyle
                starStyle.two = starYellowStyle
                starStyle.three = starYellowStyle
                starStyle.four = starYellowStyle
                starStyle.five = starYellowStyle
                setStar(starStyle)
                break;
            default:
                break;
        }
    }

    const opts = { host: "https://www.youtube-nocookie.com", sameSite: 'None' }

    return (
        <div>
            <Header 
            id={props.match.params.id}
            enableBookShow={true} 
            ></Header>
            <Typography style={homeButtonStyle}>
                <Link to={'/'}>
                    {`< Back to Home`}
                </Link>
            </Typography>
            <div className='main-container'>
                <div className='left'>
                    <img src={poster} alt='poster' crossOrigin='anonymous' />
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
                    <YouTube opts={opts} style={{ margin: '300px' }} videoId={videoID.split('=')[1]}></YouTube>
                </div>
                <div className='right'>
                    <Typography>
                        <b>Rate this movie:</b>
                    </Typography>
                    <StarBorderIcon id='1' onClick={starClickHandler} style={star.one}></StarBorderIcon>
                    <StarBorderIcon id='2' onClick={starClickHandler} style={star.two}></StarBorderIcon>
                    <StarBorderIcon id='3' onClick={starClickHandler} style={star.three}></StarBorderIcon>
                    <StarBorderIcon id='4' onClick={starClickHandler} style={star.four}></StarBorderIcon>
                    <StarBorderIcon id='5' onClick={starClickHandler} style={star.five}></StarBorderIcon>
                    <Typography style={{ margin: '16px 0px 16px 0px' }}>
                        <b>Artists:</b>
                    </Typography>
                    <GridList style={{ flexWrap: 'nowrap' }} cellHeight={250} cols={2}>
                        {artists.map(artist => (
                            <GridListTile
                                key={artist['id']}
                                onClick={() => {
                                    console.log(artist)
                                    // window.open(artist['wiki_url'], "_blank")
                                    window.location = artist['wiki_url']
                                }}>
                                <img src={artist['profile_url']} alt='profile_pic' />
                                <GridListTileBar
                                    title={artist['first_name'] + ' ' + artist['last_name']}
                                >
                                </GridListTileBar>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        </div>
    )
};

export default Details