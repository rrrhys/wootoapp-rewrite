import { StyleSheet, TextStyle } from "react-native";
import { Theme } from "react-native-elements";

let theme: Theme = { colors: {} };
let colors = getColors();
let styles = getStylesheet();

let setTheme = _theme => {
	theme = _theme;
	colors = getColors();
	styles = getStylesheet();
};
const rules = {
	padding: 7,
	headerHeight: 44,
};

export const DIVIDER_HEIGHT = 16;

export { styles, colors, rules, setTheme };
function getStylesheet() {
	const style = {
		productHeading: {
			textAlign: "center",
			color: colors.heading,
		},
		textLink: {
			color: colors.textLink,
		},
		productTileSalePrice: {
			color: colors.price,
		},
		productTileOldPrice: {
			color: colors.oldPrice,
			textDecorationLine: "line-through",
		},
		productTileRegularPrice: {
			color: colors.regularPrice,
		},
	};

	return StyleSheet.create(style);
}

function getColors() {
	return {
		heading: theme.colors.text,
		price: "#00ff00",
		regularPrice: theme.colors.text,
		oldPrice: "#ff0000",
		textLink: "#0000ff",
		darkGreyBg: "#232323",
		lightGreyText: "#eeeeee",
	};
}
