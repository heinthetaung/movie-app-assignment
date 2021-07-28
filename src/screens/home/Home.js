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


let Home = () => {

    const [releasedMovies, setReleasedMovies] = useState({})
    const [upComingMovies, setUpComingMovies] = useState({})
    const [genres, setGenres] = useState({})

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
                setGenres(data)
            }
        )
    }, [value])

    const updateMovieHandler = () => {
        setValue(!value)
    }

    const imageListStyle = {
        flexWrap: 'nowrap',
        padding: '0px 2px',
    }

    const releasedMovieStyle = {
        // flexWrap: 'nowrap',
        padding: '0px 2px',
    }

    let filterCardStyle = {
        margin: 'theme.spacing.unit',
        minWidth: '240px',
        maxWidth: '240px',
    }

    const formStyle = {
    }


    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    try {
        if (Object.keys(releasedMovies).length !== 0 &&
            Object.keys(upComingMovies).length !== 0 &&
            Object.keys(genres).length !== 0) {
            console.log(releasedMovies, upComingMovies, genres)
            return (
                <div>
                    <Header name='Login' access='logged-i'></Header>
                    <p id='heading'>Upcoming Movies</p>
                    <Button onClick={updateMovieHandler}>Update Movies List</Button>
                    <br />
                    <div>
                        <GridList style={imageListStyle} cellHeight={250} cols={6}>
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
                            <GridList style={releasedMovieStyle} cellHeight={350} cols={4}>
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
                            <Card style={filterCardStyle}>
                                <CardContent>
                                    <p style={{ color: 'theme.palette.primary.light' }}>FIND MOVIES BY:</p>
                                    <FormControl>
                                        <InputLabel htmlFor="my-input">Movie Name</InputLabel>
                                        <Input id="first-input" aria-describedby="my-helper-text" />
                                    </FormControl>
                                    <FormControl style={formStyle}>
                                        <InputLabel htmlFor="age-simple">Age</InputLabel>
                                        <Select
                                            value={age}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-simple',
                                            }}>
                                            {genres['genres'].map((genre) => (
                                                <MenuItem value={genre['id']}>{genre['genre']}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <div>
                                        <Button color='primary' variant='contained'>Apply</Button>

                                    </div>
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

export default Home;