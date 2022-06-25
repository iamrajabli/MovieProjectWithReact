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
import MoviesDB from "../services/MoviesDB";

class App extends React.Component {
    moviesApi = new MoviesDB();

    state = {
        movies: [],
        searchQuery: '' // FOR FILTERING
    }

    async componentDidMount() {

        this.moviesApi.getAllData()
            .then(data => this.setState(({ movies: data })))

    }

    // FOR DELETING MOVIE
    deleteMovie = (id) => {
        // UI
        this.setState(({ movies }) => ({ movies: movies.filter(movie => movie.id !== id) }));

        // JSON-SERVER
        this.moviesApi.deleteData(id);
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
        const { movies } = this.state;
        newMovie.id = movies[movies.length - 1].id + 1;

        this.moviesApi.postData(newMovie);
        
        // UI
        this.setState(({ movies }) => ({ movies: [...movies, newMovie] }));

    }

    // FOR EDITING MOVIE
    editMovie = (id, editedData) => {

        // EDIT JSON-SERVER
        this.moviesApi.putData(id, editedData);

        // EDIT UI
        this.setState(({ movies }) => ({ movies: [...movies.filter(movie => movie.id != id), editedData] }));
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

                        <Route
                            exact
                            path="/add"
                            render={props => (<AddMovie {...props} addMovie={this.addMovie} />)} />

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