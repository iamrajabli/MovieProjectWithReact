import React from "react";

class EditMovie extends React.Component {

    state = {
        id: null,
        imageURL: '',
        name: '',
        overview: '',
        rating: ''
    }

    id = this.props.match.params.id;

    async componentDidMount() {
        const baseURL = `http://localhost:3001/movies/${this.id}`;
        const res = await fetch(baseURL);
        const data = await res.json();
        this.setState(({
            id: data.id,
            imageURL: data.imageURL,
            name: data.name,
            overview: data.overview,
            rating: data.rating
        }))
    }

    handleFormSubmit = e => {
        const { editMovie, history } = this.props

        e.preventDefault();

        const editedMovie = {
            ...this.state
        }
        editMovie(this.id, editedMovie);
        history.push('/');

    }

    handleForChange = e => {
        this.setState(({ [e.target.name]: e.target.value }))
    }

    render() {
        const { imageURL, name, overview, rating } = this.state;
        return (
            <div className="container">
                <form
                    onSubmit={this.handleFormSubmit}
                    className="mt-5">
                    <input className="form-control" id="disabledInput" type="text" placeholder="Fill The Form To Add A Movie.." disabled />
                    <div
                        style={{ "display": "flex" }}
                        className="form-row">
                        <div className="form-group col-md-10">
                            <label htmlFor="inputName">Name</label>
                            <input
                                onChange={this.handleForChange}
                                type="text"
                                className="form-control"
                                name="name"
                                value={name} />
                        </div>
                        <div
                            className="form-group col-md-2">
                            <label htmlFor="inputRating">Rating</label>
                            <input
                                onChange={this.handleForChange}
                                value={rating}
                                type="text"
                                className="form-control"
                                name="rating" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputImage">Image URL</label>
                            <input
                                onChange={this.handleForChange}
                                value={imageURL}
                                type="text"
                                className="form-control"
                                name="imageURL" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="overviewTextarea">Overview</label>
                            <textarea
                                onChange={this.handleForChange}
                                value={overview}
                                className="form-control"
                                name="overview" rows="5"></textarea>
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary btn-block mt-3"
                        value="Add Movie" />
                </form>
            </div>
        )
    }
}

export default EditMovie;