import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { View, ViewStyle, StyleSheet } from "react-native";

import { Card, withTheme } from "react-native-elements";
import HTMLView from "react-native-htmlview";
import { IStore } from "../types/store";
import Loading from "./Loading";
import { Product } from "../types/woocommerce";
import React from "react";
import { connect } from "react-redux";
import { rules } from "../styles";

export interface Props {
	description: string;
}

class ProductDescription extends React.Component<Partial<NavigationInjectedProps> & Partial<Props>> {
	render() {
		const { description, theme } = this.props;
		const styles = StyleSheet.create({
			p: {
				color: theme.colors.text,
			},
		});

		return (
			<View style={{ padding: rules.padding }}>
				<HTMLView stylesheet={styles} value={description} />
			</View>
		);
	}
}

export default withTheme(ProductDescription);
