import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends React.Component {

    state = {
        movies: [],
        searchQuery: '' // FOR FILTERING
    }

    async componentDidMount() {
        // JSON-SERVER
        const baseURL = 'http://localhost:3001/movies';
        const res = await fetch(baseURL)
        const data = await res.json();

        // UI
        this.setState(({ movies: data }))
    }

    deleteMovie = (id) => {
        // UI
        this.setState(({ movies }) => ({ movies: movies.filter(movie => movie.id !== id) }));

        // JSON-SERVER
        const baseURL = `http://localhost:3001/movies/${id}`;
        fetch(baseURL, { method: "DELETE" });
    }

    // FOR SETTING STATE
    setSearchQuery = (input) => {
        this.setState(({ searchQuery: input }));
    }

    // FOR RETURNING FILTERED MOVIES ARRAY
    searchMovie = (movies, searchQuery) => {
        return movies.filter(movie => movie.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
    }

    render() {
        const { movies, searchQuery } = this.state;
        const findedMovies = this.searchMovie(movies, searchQuery);

        return (
            <Router>
                <div className="container">
                    <Switch>

                        <Route exact path='/'>
                            <div className="row">
                                <div className="col-lg-12">
                                    <SearchBar searchMovie={this.setSearchQuery} />
                                </div>
                            </div>

                            <MovieList
                                movies={findedMovies}
                                deleteMovie={this.deleteMovie} />
                        </Route>

                        <Route exact path="/add">
                            <AddMovie />
                        </Route>

                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;