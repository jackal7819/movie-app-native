const BASE_URL = 'https://api.themoviedb.org/3/movie';
const ACCOUNT_URL = 'https://api.themoviedb.org/3/account';
const API_KEY =
	'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmU1MTY0ODQzNmFhNmM3Yzc2MGQzMzM0MDI3NzZiOSIsInN1YiI6IjY0YWFjZjkzZmE3OGNkMDBjNTFkODM1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WfgmStP3EGqz8beWEncdqD78KGtEvXaqe_BQXFfCp20';
const headers = {
	accept: 'application/json',
	Authorization: API_KEY,
};

interface FetchPopularMoviesParams {
	pageParam: number;
}

export const fetchPopularMovies = async ({
	pageParam,
}: FetchPopularMoviesParams) => {
	const url = `${BASE_URL}/popular?language=en-US&page=${pageParam}`;
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

export const fetchWatchlistMovies = async () => {
	const url = `${ACCOUNT_URL}/20127205/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc`;

	const options = {
		method: 'GET',
		headers,
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error('Failed to fetch the movie');
	}

	const json = await res.json();
	return json.results;
};

export const addMovieToWatchlist = async (movieId: number) => {
	const url = `${ACCOUNT_URL}/20127205/watchlist`;
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: API_KEY,
		},
		body: JSON.stringify({
			media_type: 'movie',
			media_id: movieId,
			watchlist: true,
		}),
	};

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error('Failed to add the movie');
	}

	const json = await res.json();
	return json;
};
