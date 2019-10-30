import { ThemeConsumer } from "react-native-elements";
import { Card as NativeElementsCard } from "react-native-elements";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, ViewStyle } from "react-native";

const Card = props => {
	const { onPress } = props;
	return (
		<ThemeConsumer>
			{({ theme }) => {
				const style: ViewStyle = {
					...{ backgroundColor: theme.colors.listBackgroundColor },
					...props.containerStyle,
				};
				const card = (
					<NativeElementsCard {...props} containerStyle={style}>
						{props.children}
					</NativeElementsCard>
				);
				return onPress ? <TouchableOpacity onPress={onPress}>{card}</TouchableOpacity> : <View>{card}</View>;
			}}
		</ThemeConsumer>
	);
};

export default Card;
