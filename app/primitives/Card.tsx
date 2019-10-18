import { ThemeConsumer } from "react-native-elements";
import { Card as NativeElementsCard } from "react-native-elements";
import React from "react";

const Card = props => {
	return (
		<ThemeConsumer>
			{({ theme }) => {
				const style: ViewStyle = {
					...{ backgroundColor: theme.colors.backgroundColor },
					...props.containerStyle,
				};
				return (
					<NativeElementsCard {...props} containerStyle={style}>
						{props.children}
					</NativeElementsCard>
				);
			}}
		</ThemeConsumer>
	);
};

export default Card;
