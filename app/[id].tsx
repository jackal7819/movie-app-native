import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { fetchMovie } from '@/api/movies';
import { useQuery } from '@tanstack/react-query';

const MovieDetails = () => {
	const { id } = useLocalSearchParams();

	const {
		data: movie,
		isPending,
		error,
	} = useQuery({
		queryKey: ['movies', id],
		queryFn: () => fetchMovie(Number(id)),
	});

	if (isPending) {
		return (
			<View style={styles.loader}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.loader}>
				<Text>{error.message}</Text>
			</View>
		);
	}

	return (
		<View>
			<Stack.Screen options={{ title: movie.title }} />
			<Image
				source={{
					uri:
						'https://image.tmdb.org/t/p/w500' + movie.backdrop_path,
				}}
				style={styles.image}
			/>
			<View style={styles.container}>
				<Text style={styles.title}>{movie.title}</Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>Description:</Text>{' '}
					{movie.overview}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>Release Date:</Text>{' '}
					{movie.release_date}
				</Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>Runtime:</Text>{' '}
					{movie.runtime} min
				</Text>
				<Text style={styles.text}>
					<Text style={styles.subtitle}>Rating:</Text>{' '}
					{movie.vote_average}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		aspectRatio: 16 / 9,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	subtitle: {
		fontWeight: 'bold',
	},
	text: {
		marginBottom: 10,
	},
});

export default MovieDetails;
