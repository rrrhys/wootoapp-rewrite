import React from "react";
import { SafeAreaView, View } from "react-native";
import { rules } from "../styles";

const FooterNavigationArea = props => {
	return (
		<SafeAreaView style={{ flexDirection: "row" }}>
			<View style={{ flexDirection: "row", flex: 1 }}>{props.children}</View>
		</SafeAreaView>
	);
};

export default FooterNavigationArea;
