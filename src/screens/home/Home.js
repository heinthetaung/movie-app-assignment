import React, { useEffect, useState } from 'react';
import Header from '../../common/header/Header';
import './Home.css'
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

let Home = () => {

    const [movies, setMovies] = useState({})
    const [upComingMovies, setUpComingMovies] = useState({})

    const [value, setValue] = useState(true)
    let getMovieData = async () => {
        const baseURL = 'http://localhost:8085/api/v1/movies'
        const url = baseURL + '?page=1&limit=10'
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
        getMovieData().then(
            data => {
                setMovies(data)
                // setUpComingMovies(data['movies'])
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


    try {
        if (Object.keys(movies).length !== 0) {
            console.log(movies)

            return (
                <div>
                    <Header name='Login' access='logged-i'></Header>
                    <p id='heading'>Upcoming Movies</p>
                    <Button onClick={updateMovieHandler}>Update Movies List</Button>
                    <br />
                    <div>
                        <GridList style={imageListStyle} cellHeight={250} cols={6}>
                            {movies['movies'].map(
                                (mov) => (
                                    <GridListTile key={mov['id']}>
                                        <img src='https://upload.wikimedia.org/wikipedia/en/8/85/Sanju_poster.jpg' alt='poster' crossOrigin='anonymous' />
                                        <GridListTileBar
                                            title={mov['title']}
                                        >
                                        </GridListTileBar>
                                    </GridListTile>
                                )
                            )}
                        </GridList>
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