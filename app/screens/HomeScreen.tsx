import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { ScrollView, View, Image, StyleSheet, Dimensions } from "react-native";

import Actions from "../actions";
import CategoryTile from "../components/CategoryTile";
import { ICategories } from "../reducers/categories";
import { IStore } from "../types/store";
import { Iui } from "../reducers/ui";
import React from "react";
import config from "../../env";
import { connect } from "react-redux";
import RequiresAuthenticatedUser from "../components/RequiresAuthenticatedUser";
import SplashScreen from "react-native-splash-screen";

import Button from "../components/Button";
import Modal from "react-native-modalbox";
import {
  withTheme,
  Icon,
  SocialIcon,
  Text,
  Divider
} from "react-native-elements";
import SocialSignin from "../components/SocialSignin";
import shop from "../actions/shop";
export interface IAppProps {
  categories: ICategories;
  loadCategories: () => void;
  ui: Iui;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
class HomeScreen extends React.Component<IAppProps> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    if (navigation.getParam("showHeader") == false) {
      return {
        header: null
      };
    } else {
      return {
        title: navigation.getParam("title")
      };
    }
  };

  constructor(props: IAppProps) {
    super(props);

    // we need an app definition.
    const { store_id, publishable_key, access_jwt } = config;
    props.navigation.setParams({ title: props.ui.name });

    props.loadShop();
    props.loadCategories();
    /*setTimeout(() => {
			this.props.navigation.navigate("Cart");
		}, 300);*/
  }

  componentDidMount() {
    if (
      this.props.customer &&
      this.props.customer.hasSignedInOrSkippedWelcome
    ) {
      SplashScreen && SplashScreen.hide(); //missing in web.
    } else {
      this.props.navigation.setParams({ showHeader: false });
      this.refs.modal1.open();
      SplashScreen && SplashScreen.hide(); //missing in web.
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.customer.hasSignedInOrSkippedWelcome &&
      !this.props.customer.hasSignedInOrSkippedWelcome
    ) {
      this.props.navigation.setParams({ showHeader: true });
      this.refs.modal1.close();
    }
    if (
      !nextProps.customer.hasSignedInOrSkippedWelcome &&
      this.props.customer.hasSignedInOrSkippedWelcome
    ) {
      this.props.navigation.setParams({ showHeader: false });
      this.refs.modal1.open();
    }
  }

  render() {
    const { categories, theme, shop, customer } = this.props;
    const { hasSignedInOrSkippedWelcome } = customer;
    return (
      <View
        style={{ backgroundColor: theme.colors.backgroundColor, marginLeft: 3 }}
      >
        {!hasSignedInOrSkippedWelcome && (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/elsplasho.jpg")}
          />
        )}

        <Modal
          backdropPressToClose={false}
          swipeToClose={false}
          coverScreen={true}
          backButtonClose={false}
          backdrop={false}
          style={[styles.modal]}
          ref={"modal1"}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
          entry={"bottom"}
        >
          <SocialSignin canSkip={true} />
        </Modal>
        {hasSignedInOrSkippedWelcome && (
          <ScrollView>
            {categories.data.map(category => (
              <CategoryTile key={category.id} category={category} />
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const select = (store: IStore) => {
  return {
    cart: store.cart,
    ui: store.ui,
    categories: store.categories,
    customer: store.customer,
    shop: store.shop
  };
};

const actions = dispatch => {
  const { loadCategories, loadShop } = Actions;
  return {
    loadCategories: () => dispatch(loadCategories()),
    loadShop: () => dispatch(loadShop())
  };
};

export default connect(select, actions)(withTheme(HomeScreen));

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  modal: {
    height: "auto",
    backgroundColor: "#ffffffaa",
    padding: 8,
    marginLeft: 0,
    width: width - 32,
    borderRadius: 8
  }
});
