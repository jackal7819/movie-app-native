import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import { fetchTopRatedMovies } from '@/api/movies';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			setIsLoading(true);

      try {
        const movies = await fetchTopRatedMovies();
        setMovies(movies);
      } catch (error) {
        setError(error);
      }
      
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

  if (error) {
		return (
			<View style={styles.loader}>
				<Text>{error.message}</Text>
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
