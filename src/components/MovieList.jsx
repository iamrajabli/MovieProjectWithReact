import React from "react";

class MovieList extends React.Component {


    render() {
        const { movies, deleteMovie } = this.props;
        return (
            <div className="row">
                {movies.map((movie) =>
                (<div key={movie.id} className="col-lg-4">
                    <div className="card mb-4 shadow-sm">
                        <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                            alt="Sample image"
                            className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p className="card-text">{movie.overview.slice(0, 130)}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    onClick={() => deleteMovie(movie.id)}
                                    type="button"
                                    className="btn btn-md btn-outline-danger">Delete
                                </button>
                                <h2><span className="badge badge-info">{movie.vote_average}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>)
                )}
            </div>
        )
    }
}

export default MovieList;