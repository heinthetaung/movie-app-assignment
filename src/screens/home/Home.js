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
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240,
    },


});

let Home = (props) => {

    const [releasedMovies, setReleasedMovies] = useState([])
    const [upComingMovies, setUpComingMovies] = useState({})
    const [genres, setGenres] = useState([])
    const [genreChecked, setGenreChecked] = React.useState([]);
    const [artists, setArtists] = useState([])
    const [artistChecked, setArtistChecked] = React.useState([]);

    const [value, setValue] = useState(true)
    let fetchData = async (baseURL, parameter = '') => {
        const url = baseURL + parameter
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
        const movieBaseURL = 'http://localhost:8085/api/v1/movies'
        const genresBaseURL = 'http://localhost:8085/api/v1/genres'
        const artistsBaseURL = 'http://localhost:8085/api/v1/artists    '

        fetchData(movieBaseURL, '?page=1&limit=10').then(
            data => {
                setUpComingMovies(data)
            }
        )
        fetchData(movieBaseURL, '?page=2&limit=10').then(
            data => {
                setReleasedMovies(data)
            }
        )
        fetchData(genresBaseURL).then(
            data => {
                setGenres(data['genres'])
            }
        )

        fetchData(artistsBaseURL).then(
            data => {
                setArtists(data['artists'])
            }
        )
    }, [value])

    const updateMovieHandler = () => {
        setValue(!value)
    }

    const genresSelectChangeHandler = (event) => {
        const newGenreChecked = event.target.value
        setGenreChecked(newGenreChecked);
    };

    const artistsSelectChangeHandler = (event) => {
        const newArtistChecked = event.target.value
        setArtistChecked(newArtistChecked);
    };

    const { classes } = props;

    try {
        if (Object.keys(releasedMovies).length !== 0 &&
            Object.keys(upComingMovies).length !== 0 &&
            genres.length !== 0) {
            console.log(releasedMovies, upComingMovies, genres, artists)
            return (
                <div>
                    <Header name='Login' access='logged-i'></Header>
                    <p id='heading'>Upcoming Movies</p>
                    <div>
                        <GridList className={classes.imageListStyle} cellHeight={250} cols={6}>
                            {upComingMovies['movies'].map(
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
                                {releasedMovies['movies'].map(
                                    (mov) => (
                                        <GridListTile key={mov['id']}>
                                            <img src={mov['poster_url']} alt='poster' crossOrigin='anonymous' />
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
                                        <Input id="first-input" aria-describedby="my-helper-text" />
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
                                            // defaultValue="2017-05-24"
                                            // className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            id="date"
                                            label="Release Date End"
                                            type="date"
                                            // defaultValue="2017-05-24"
                                            // className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <Button color='primary' variant='contained'>Apply</Button>
                                    </FormControl>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    loading
                </div>
            )
        }
    }
    catch (e) {
        console.log('error')
    }
    return (
        <div>
            loading
        </div>
    )
}

export default withStyles(styles)(Home);