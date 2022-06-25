export default class MoviesDB {
    baseURL = 'http://localhost:3001/movies';

    getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.url}`);
        }

        return await res.json();
    }

    getAllData = async () => {
        const res = await this.getResources(this.baseURL);
        return await res.map(data => this.onTransformData(data));
    }

    getData = async (id) => {
        const res = await this.getResources(`${this.baseURL}/${id}`);
        return this.onTransformData(res);
    }
    deleteData = async (id) => {
        const conf = {
            method: "DELETE"
        }
        await fetch(`${this.baseURL}/${id}`, conf)
    }

    postData = async (newData) => {
        const conf = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        }
        await fetch(this.baseURL, conf)
    }

    putData = async (id, editedData) => {
        const conf = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedData)
        }
        await fetch(`${this.baseURL}/${id}`, conf)
    }

    onTransformData = (data) => {
        return {
            id: data.id,
            imageURL: data.imageURL,
            name: data.name,
            overview: data.overview,
            rating: data.rating
        }
    }
}