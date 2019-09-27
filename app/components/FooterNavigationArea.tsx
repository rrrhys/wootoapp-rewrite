import React from "react";
import { SafeAreaView, View } from "react-native";

const FooterNavigationArea = props => {
	return (
		<SafeAreaView style={{ flex: 1, minHeight: 66 }}>
			<View style={{ flexDirection: "row", flex: 1, minHeight: 66 }}>{props.children}</View>
		</SafeAreaView>
	);
};

export default FooterNavigationArea;
