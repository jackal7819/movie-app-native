const BASE_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY =
	'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmU1MTY0ODQzNmFhNmM3Yzc2MGQzMzM0MDI3NzZiOSIsInN1YiI6IjY0YWFjZjkzZmE3OGNkMDBjNTFkODM1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WfgmStP3EGqz8beWEncdqD78KGtEvXaqe_BQXFfCp20';
const headers = {
	accept: 'application/json',
	Authorization: API_KEY,
};

export const fetchTopRatedMovies = async () => {
	const url = `${BASE_URL}/top_rated?language=en-US&page=1`;

	const options = {
		method: 'GET',
		headers,
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error('Failed to fetch movies');
	}

	const json = await res.json();
	return json.results;
};

export const fetchMovie = async (id: number) => {
	const url = `${BASE_URL}/${id}?language=en-US`;

	const options = {
		method: 'GET',
		headers,
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error('Failed to fetch the movie');
	}

	const json = await res.json();
	return json;
};
