import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {

    render() {
        const { searchMovie } = this.props;
        return (
            <form action="">
                <div
                    style={{ "display": "flex" }}
                    className="form-row mb-5 mt-5">

                    <div className="col-10">
                        <input
                            onChange={(e) => searchMovie(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Search a movie..." />
                    </div>

                    <div
                        style={{ "display": "flex", "justifyContent": "flex-end" }}
                        className="col-2">
                        <Link to="/add"
                            type="button"
                            className="btn btn-md btn-danger">
                            Add Movie
                        </Link>
                    </div>

                </div>
            </form>
        )
    }
}

export default SearchBar;