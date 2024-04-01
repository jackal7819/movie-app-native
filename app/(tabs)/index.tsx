import MovieListItem from '@/components/MovieListItem';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import { fetchPopularMovies } from '@/api/movies';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function TabOneScreen() {
	const { data, isPending, error, fetchNextPage } = useInfiniteQuery({
		queryKey: ['movies'],
		queryFn: fetchPopularMovies,
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => pages.length + 1,
	});

	const movies = data?.pages.flat();

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
				onEndReached={() => fetchNextPage()}
			/>
		</View>
	);
}

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
