import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { fetchMovie } from '@/api/movies';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

const MovieDetails = () => {
	const { id } = useLocalSearchParams();

	const {
		data: movie,
		isPending,
		error,
	} = useQuery({
		queryKey: ['movie', id],
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
			<Text>MovieDetails: {id}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default MovieDetails;
