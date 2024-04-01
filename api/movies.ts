export const fetchTopRatedMovies = async () => {
	const url =
		'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmU1MTY0ODQzNmFhNmM3Yzc2MGQzMzM0MDI3NzZiOSIsInN1YiI6IjY0YWFjZjkzZmE3OGNkMDBjNTFkODM1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WfgmStP3EGqz8beWEncdqD78KGtEvXaqe_BQXFfCp20',
		},
	};

	const res = await fetch(url, options);
	
	if (!res.ok) {
		throw new Error('Failed to fetch movies');
	}
	
	const json = await res.json();
	return json.results;
};
