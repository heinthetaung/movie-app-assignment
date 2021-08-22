import React, { useEffect, useState } from 'react';
import Header from '../../common/header/Header';
import './Home.css'
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';


const styles = (theme) => ({
    cardHeading: {
        color: theme.palette.primary.light,
    },

    imageListStyle: {
        flexWrap: 'nowrap',
        padding: '0px 2px',
    },

    releasedMovieStyle: {
        padding: '0px 2px',
        cursor: 'pointer',
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240,
    },


});

let Home = (props) => {

    let history = useHistory();

    const [movieTitle, setMovieTitle] = useState('')
    const [releasedMovies, setReleasedMovies] = useState([])
    const [upComingMovies, setUpComingMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [genreChecked, setGenreChecked] = React.useState([]);
    const [artists, setArtists] = useState([])
    const [artistChecked, setArtistChecked] = React.useState([]);
    const [releasedDateStart, setReleasedDateStart] = React.useState('');
    const [releasedDateEnd, setReleasedDateEnd] = React.useState('');

    const [releasedMoviesParameter, setReleasedMoviesParameter] = useState('?status=RELEASED')

    const movieBaseURL = '/api/v1/movies'
    const genresBaseURL = '/api/v1/genres'
    const artistsBaseURL = '/api/v1/artists'

    let fetchData = async (baseURL, parameter = '') => {
        const url = baseURL + parameter
        console.log(url)
        // try {
            let rawResponse = await fetch(url, {
                // mode: 'cors',
                method: 'GET',
                headers: { "Accept": "application/json;charset=UTF-8" }
            })
            if (rawResponse.ok) {
                return await rawResponse.json();
            }
        // } catch (e) {
        //     console.error(e)
        // }

    }


    useEffect(() => {
        fetchData(movieBaseURL, '?status=PUBLISHED').then(
            data => {
                if (data !== undefined) setUpComingMovies(data['movies'])
            }
        )
        fetchData(genresBaseURL).then(
            data => {
                if (data !== undefined) setGenres(data['genres'])
            }
        )

        fetchData(artistsBaseURL).then(
            data => {
                if (data !== undefined) setArtists(data['artists'])
            }
        )
    }, [])

    useEffect(() => {
        fetchData(movieBaseURL, releasedMoviesParameter).then(
            data => {
                if (data !== undefined) setReleasedMovies(data['movies'])
            }
        )
    }, [releasedMoviesParameter])

    const genresSelectChangeHandler = (event) => {
        setGenreChecked(event.target.value);
    };

    const artistsSelectChangeHandler = (event) => {
        setArtistChecked(event.target.value);
    };

    const releasedDateStartHandler = (event) => {
        setReleasedDateStart(event.target.value);
    };

    const releasedDateEndHandler = (event) => {
        setReleasedDateEnd(event.target.value);
    };

    const applyButtonHandler = () => {
        let param = '?status=RELEASED'

        let start = '&start_date=' + releasedDateStart
        let end = '&end_date=' + releasedDateEnd
        let genre = '&genre=' + genreChecked
        let artist = '&artists=' + artistChecked
        let title = '&title=' + movieTitle

        param = param + start + end + genre + artist + title
        setReleasedMoviesParameter(param)
    };

    const movieClickHandler = (movie_id) => {
        history.push(
            '/movies/' + movie_id,
        );
    }

    const { classes } = props;

    console.log(releasedMovies, upComingMovies, genres, artists, releasedDateStart, releasedDateEnd)
    return (
        <div>
            <Header name='Login' access='logged-i'></Header>
            <p id='heading'>Upcoming Movies</p>
            <div>
                <GridList className={classes.imageListStyle} cellHeight={250} cols={6}>
                    {upComingMovies.map(
                        (mov) => (
                            <GridListTile key={mov['id']}>
                                <img src={mov['poster_url']} alt='poster' crossOrigin='anonymous' />
                                <GridListTileBar
                                    title={mov['title']}
                                >
                                </GridListTileBar>
                            </GridListTile>
                        )
                    )}
                </GridList>
            </div>
            <div className='flex-container'>
                <div className='column1'>
                    <GridList className={classes.releasedMovieStyle} cellHeight={350} cols={4}>
                        {releasedMovies.map(
                            (mov) => (
                                <GridListTile onClick={() => movieClickHandler(mov['id'])} key={mov['id']}>
                                    <img src={mov['poster_url']}
                                        alt='poster'
                                        crossOrigin='anonymous'
                                    />
                                    <GridListTileBar
                                        title={mov['title']}
                                        subtitle={
                                            <span>Release date:
                                                {new Date(mov['release_date']).toDateString()}
                                            </span>}
                                    >
                                    </GridListTileBar>
                                </GridListTile>
                            )
                        )}
                    </GridList>
                </div>
                <div className='column2'>
                    <Card>
                        <CardContent>
                            <FormControl className={classes.formControl}>
                                <Typography className={classes.cardHeading} >FIND MOVIES BY:</Typography>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="my-input">Movie Name</InputLabel>
                                <Input id="first-input"
                                    aria-describedby="my-helper-text"
                                    onChange={event => setMovieTitle(event.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="genres-simple">Genres</InputLabel>
                                <Select
                                    multiple
                                    value={genreChecked}
                                    renderValue={item => item.join(',')}
                                    onChange={genresSelectChangeHandler}
                                >
                                    {genres.map((genre) => (
                                        <MenuItem key={genre['id']} value={genre['genre']}>
                                            <Checkbox
                                                checked={genreChecked.includes(genre['genre'])}
                                            />
                                            {genre['genre']}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="artists-simple">Artists</InputLabel>
                                <Select
                                    multiple
                                    value={artistChecked}
                                    renderValue={item => item.join(',')}
                                    onChange={artistsSelectChangeHandler}
                                >
                                    {artists.map((artist) => (
                                        <MenuItem key={artist['id']} value={artist['first_name'] + ' ' + artist['last_name']}>
                                            <Checkbox
                                                checked={artistChecked.includes(artist['first_name'] + ' ' + artist['last_name'])}
                                            />
                                            {artist['first_name'] + ' ' + artist['last_name']}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="date"
                                    label="Release Date Start"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={releasedDateStartHandler}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="date"
                                    label="Release Date End"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={releasedDateEndHandler}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <Button color='primary' variant='contained' onClick={applyButtonHandler}>Apply</Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Home);