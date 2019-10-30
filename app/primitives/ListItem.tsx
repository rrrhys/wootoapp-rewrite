import { ThemeConsumer } from "react-native-elements";
import { ListItem as NativeElementsListItem } from "react-native-elements";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, ViewStyle } from "react-native";
import { DIVIDER_HEIGHT } from "../styles";

const ListItem = props => {
	return (
		<ThemeConsumer>
			{({ theme }) => {
				const style: ViewStyle = {
					...{ backgroundColor: theme.colors.listBackgroundColor },
					...(props.separator ? { marginTop: DIVIDER_HEIGHT } : null),
					...props.containerStyle,
				};

				const titleStyle = { ...{ color: theme.colors.text }, ...props.titleStyle };
				const subtitleStyle = { ...{ color: theme.colors.text }, ...props.subtitleStyle };
				const rightTitleStyle = { ...{ color: theme.colors.text }, ...props.rightTitleStyle };
				return (
					<NativeElementsListItem
						{...props}
						containerStyle={style}
						titleStyle={titleStyle}
						subtitleStyle={subtitleStyle}
						rightTitleStyle={rightTitleStyle}
					>
						{props.children}
					</NativeElementsListItem>
				);
			}}
		</ThemeConsumer>
	);
};

export default ListItem;
