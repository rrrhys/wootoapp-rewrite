import { NavigationInjectedProps, withNavigation } from "react-navigation";

import Actions from "../actions";
import { Button as RNEButton } from "react-native-elements";
import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { rules } from "../styles";

export interface IProps {
	onPress: () => void;
	title: string;
}

class Button extends React.Component<IProps> {
	render() {
		return (
			<View style={[{ padding: rules.padding }, this.props.style]}>
				<RNEButton title={this.props.title} onPress={this.props.onPress} />
			</View>
		);
	}
}

const mapStateToProps = (state: IStore, ownProps: IProps) => {
	return {};
};

const mapDispatchToProps = dispatch => {
	const {} = Actions;

	return {};
};
export default withNavigation(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Button)
);
