import React from "react";

class MovieList extends React.Component {


    render() {
        const { movies, deleteMovie } = this.props;
        return (
            <div className="row">
                {movies.map((movie) =>
                (<div key={movie.id} className="col-lg-4">
                    <div className="card mb-4 shadow-sm">
                        <img src={movie.imageURL}
                            alt="Sample image"
                            className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{movie.name}</h5>
                            <p className="card-text">{movie.overview.slice(0, 130)}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    onClick={() => deleteMovie(movie.id)}
                                    type="button"
                                    className="btn btn-md btn-outline-danger">Delete
                                </button>
                                <h2><span className="badge badge-info">{movie.raiting}</span></h2>
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