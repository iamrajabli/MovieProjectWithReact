import React from "react";

class SearchBar extends React.Component {
    render() {
        const { searchMovie } = this.props;
        return (
            <form action="">
                <div className="form-row mb-5 mt-5">
                    <div className="col-lg-12">
                        <input
                            onChange={(e) => searchMovie(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Search a movie..." />
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchBar;