import { Image, StyleSheet, Text, View } from 'react-native';

interface MovieListItemProps {
	movie: {
		title: string;
		poster_path: string;
	};
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie }) => {
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
				}}
				style={styles.image}
			/>
			<Text style={styles.title}>{movie.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
		alignItems: 'center',
	},
	image: {
		width: '100%',
		aspectRatio: 2 / 3,
		borderRadius: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default MovieListItem;
