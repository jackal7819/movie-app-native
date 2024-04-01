import MovieListItem from '@/components/MovieListItem';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import { fetchTopRatedMovies } from '@/api/movies';
import { useQuery } from '@tanstack/react-query';

export default function TabOneScreen() {
	const {
		data: movies,
		isPending,
		error,
	} = useQuery({
		queryKey: ['movies'],
		queryFn: fetchTopRatedMovies,
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
		<View style={styles.container}>
			<FlatList
				data={movies}
        numColumns={2}
				renderItem={({ item }) => <MovieListItem movie={item} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
  loader : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
