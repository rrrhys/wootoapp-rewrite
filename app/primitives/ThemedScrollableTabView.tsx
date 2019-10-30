import { ThemeConsumer } from "react-native-elements";
import { Card as NativeElementsCard } from "react-native-elements";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, ViewStyle } from "react-native";
import ScrollableTabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";

const ThemedScrollableTabView = props => {
	const { onPress } = props;
	return (
		<ThemeConsumer>
			{({ theme }) => {
				return (
					<ScrollableTabView
						tabBarActiveTextColor={theme.colors.text}
						tabBarInactiveTextColor={theme.colors.divider}
						tabBarUnderlineStyle={{ backgroundColor: theme.colors.success }}
						style={{ marginTop: 20, minHeight: 500 }}
						initialPage={0}
						renderTabBar={() => <ScrollableTabBar />}
						{...props}
					>
						{props.children}
					</ScrollableTabView>
				);
			}}
		</ThemeConsumer>
	);
};

export default ThemedScrollableTabView;
