import { Text, View } from "react-native";

import DrawerContainer from "react-native-drawer";
import { Iui } from "../reducers/ui";
import React from "react";
import { connect } from "react-redux";

export interface Props {
  ui: Iui;
}
class Drawer extends React.PureComponent<Props> {
  render() {
    return (
      <DrawerContainer
        type="overlay"
        content={
          <View style={{ backgroundColor: "#ff0000" }}>
            <Text>test</Text>
          </View>
        }
        open={this.props.ui.drawerOpen}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        {this.props.children}
      </DrawerContainer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: "#ff0000", shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 }
};

const select = store => {
  return {
    ui: store.ui
  };
};

const actions = dispatch => {
  return {};
};

export default connect(
  select,
  actions
)(Drawer);
