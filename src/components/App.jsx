import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import {
    BrowserRouter as Router,
    Switch,
    Route
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

    // FOR DELETING MOVIE
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
            .sort((a, b) => (b.id - a.id))
    }

    // FOR ADDING NEW MOVIE
    addMovie = (newMovie) => {

        const baseURL = 'http://localhost:3001/movies';

        fetch(baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMovie)
        });

        this.setState(({ movies }) => ({ movies: [...movies, newMovie] }));

    }

    // FOR EDITING MOVIE
    editMovie = (id, editedMovie) => {
        const baseURL = `http://localhost:3001/movies/${id}`;

        // EDIT JSON-SERVER
        fetch(baseURL, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedMovie)
        });

        // EDIT UI
        this.setState(({ movies }) => ({ movies: [...movies.filter(movie => movie.id != id), editedMovie] }));
    }

    render() {
        const { movies, searchQuery } = this.state;
        const findedMovies = this.searchMovie(movies, searchQuery);

        return (
            <Router>
                <div className="container">
                    <Switch>
                        <Route exact path='/' render={() => (
                            <>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar searchMovie={this.setSearchQuery} />
                                    </div>
                                </div>

                                <MovieList
                                    movies={findedMovies}
                                    deleteMovie={this.deleteMovie} />
                            </>
                        )} />

                        <Route exact path="/add" render={() => (<AddMovie addMovie={this.addMovie} />)} />

                        <Route exact path="/edit/:id" render={(props) => (
                            <EditMovie {...props} editMovie={this.editMovie} />
                        )}
                        />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;