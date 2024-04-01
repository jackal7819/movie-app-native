import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';

export default function EditScreenInfo() {
	return (
			<View style={styles.getStartedContainer}>
				<Text
					style={styles.getStartedText}
					lightColor='rgba(0,0,0,0.8)'
					darkColor='rgba(255,255,255,0.8)'
				>
					This is a simple yet powerful app that allows me, as a big
					movie lover, to easily find popular movies and add them to a
					watched list. Using data from the popular The Movie Database
					(TMDb), the app provides access to an extensive collection
					of movies. I can browse cards with information about the
					most popular movies at the moment from TMDb, including the
					title, poster, brief description, and rating. I can add my
					favorite movies to a favorites list for quick access and to
					be reminded of them. My app works across different platforms
					- iOS, Android, and the web. The app was developed by
					ViKTor, who is passionately interested in the world of
					cinema.
				</Text>
			</View>
	);
}

const styles = StyleSheet.create({
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	getStartedText: {
		fontSize: 17,
		lineHeight: 24,
	},
});
