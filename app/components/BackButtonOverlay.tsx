import { Button, Icon } from "react-native-elements";

import React from "react";
import { View, SafeAreaView } from "react-native";

export interface Props {
	onPress: () => void;
}

class BackButtonOverlay extends React.Component<Props> {
	render() {
		return (
			<View
				style={{
					position: "absolute",
					marginTop: 10,
					marginLeft: 10,
				}}
			>
				<SafeAreaView>
					<Button onPress={this.props.onPress} icon={<Icon name="chevron-left" size={24} color="white" />} />
				</SafeAreaView>
			</View>
		);
	}
}

export default BackButtonOverlay;
