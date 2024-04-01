import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import { fetchTopRatedMovies } from '@/api/movies';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchMovies = async () => {
			setIsLoading(true);
			const movies = await fetchTopRatedMovies();
			setMovies(movies);
			setIsLoading(false);
		};
		fetchMovies();
	}, []);

	if (isLoading) {
		return (
			<View style={styles.loader}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={movies}
				renderItem={({ item }) => <Text>{item.title}</Text>}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
