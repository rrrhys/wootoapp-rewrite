import { ThemeConsumer } from "react-native-elements";
import { Text as NativeElementsText } from "react-native-elements";
import React from "react";
import { Text as NativeText, TextStyle } from "react-native";

const Text = props => {
	return (
		<ThemeConsumer>
			{({ theme }) => {
				const style: TextStyle = { ...{ color: theme.colors.text }, ...props.style };

				return (
					<NativeElementsText {...props} style={style}>
						{props.children}
					</NativeElementsText>
				);
			}}
		</ThemeConsumer>
	);
};

export default Text;
