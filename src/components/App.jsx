import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";

class App extends React.Component {

    state = {
        movies: [],
        searchQuery: '' // FOR FILTERING
    }

    async componentDidMount() {
        // JSON-SERVER
        const baseURL = 'https://api.themoviedb.org/3/movie/popular?api_key=d58423e31d785a086c141d1eb826a596&language=en-US&page=1';
        const res = await fetch(baseURL)
        const data = await res.json();

        // UI
        this.setState(({ movies: data.results }))
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
        return movies.filter(movie => movie.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
    }

    render() {
        const { movies, searchQuery } = this.state;
        const findedMovies = this.searchMovie(movies, searchQuery);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar searchMovie={this.setSearchQuery} />
                    </div>
                </div>

                <MovieList
                    movies={findedMovies}
                    deleteMovie={this.deleteMovie} />
            </div>
        )
    }
}

export default App;