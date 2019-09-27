import { NavigationInjectedProps, withNavigation } from "react-navigation";

import Actions from "../actions";
import { Button as RNEButton } from "react-native-elements";
import React from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";
import { rules } from "../styles";

export interface IProps {
	onPress: () => void;
	title: string;
	style?: ViewStyle;
	disabled: boolean;
}

class Button extends React.Component<IProps> {
	render() {
		return (
			<View style={[{ padding: rules.padding }, this.props.style]}>
				<RNEButton disabled={this.props.disabled} title={this.props.title} onPress={this.props.onPress} />
			</View>
		);
	}
}

export default Button;
