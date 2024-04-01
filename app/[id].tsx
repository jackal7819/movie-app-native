import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { addMovieToWatchlist, fetchMovie } from '@/api/movies';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const MovieDetails = () => {
	const { id } = useLocalSearchParams();
	const queryClient = useQueryClient();
	const {
		data: movie,
		isPending,
		error,
	} = useQuery({
		queryKey: ['movies', id],
		queryFn: () => fetchMovie(Number(id)),
	});

	const { mutate: addMovie, isPending: isPendingMutation } = useMutation({
		mutationFn: () => addMovieToWatchlist(Number(id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['watchlist'] });
		},
	});

	if (isPending || isPendingMutation) {
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
				<View>
					<Pressable onPress={() => addMovie()} style={styles.button}>
						<FontAwesome
							name='bookmark-o'
							size={24}
							color='white'
						/>
						<Text style={styles.link}>Add to Watchlist</Text>
					</Pressable>
				</View>
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
					{Math.round(movie.vote_average * 10)} %
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
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
		fontSize: 16,
	},
	text: {
		marginBottom: 10,
		fontSize: 16,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		gap: 10,
		padding: 10,
		borderRadius: 10,
		width: 200,
		justifyContent: 'center',
		backgroundColor: '#EAB308',
		color: 'white',
	},
	link: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export default MovieDetails;
