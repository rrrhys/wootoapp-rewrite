import { Text, View } from "react-native";

import DrawerContainer from "react-native-drawer";
import { Iui } from "../reducers/ui";
import React from "react";
import { connect } from "react-redux";

import Sidebar from "./Sidebar";

export interface Props {
	ui: Iui;
}
class Drawer extends React.PureComponent<Props> {
	render() {
		const { navigatorRef, ui, children } = this.props;
		return (
			<DrawerContainer
				type="overlay"
				content={<Sidebar navigatorRef={navigatorRef} />}
				open={ui.drawerOpen}
				tapToClose={true}
				openDrawerOffset={0.2} // 20% gap on the right side of drawer
				panCloseMask={0.2}
				closedDrawerOffset={-3}
				styles={drawerStyles}
				tweenHandler={ratio => ({
					main: { opacity: (2 - ratio) / 2 },
				})}
			>
				<View accessibilityLabel={"drawer-first-child"} style={{ flex: 1 }}>
					{children}
				</View>
			</DrawerContainer>
		);
	}
}

const drawerStyles = {
	drawer: { shadowColor: "#ff0000", shadowOpacity: 0.8, shadowRadius: 3 },
	main: { flex: 1, flexDirection: "column" },
	container: { flex: 1, flexDirection: "column" },
};

const select = store => {
	return {
		ui: store.ui,
	};
};

const actions = dispatch => {
	return {};
};

export default connect(
	select,
	actions
)(Drawer);
