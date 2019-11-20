import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  withNavigation
} from "react-navigation";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";

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
import Carousel, { Pagination } from "react-native-snap-carousel";

import Button from "../components/Button";
import Modal from "react-native-modalbox";

import Text from "../primitives/Text";
import {
  withTheme,
  Icon,
  SocialIcon,
  Divider,
  SearchBar
} from "react-native-elements";
import SocialSignin from "../components/SocialSignin";
import shop from "../actions/shop";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { deriveScreenAndParamsFromUrl } from "../../helpers/routing";
import { CART_CARD_HORIZONTAL_PADDING } from "../components/CartLineItem";
import ProductScroller from "../components/ProductScroller";
export interface IAppProps {
  categories: ICategories;
  loadCategories: () => void;
  ui: Iui;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class HomepageSigninModal extends React.Component {
  openModal = () => {
    this.refs.modal1.open();
  };
  closeModal = () => {
    this.refs.modal1.close();
  };
  render() {
    return (
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
    );
  }
}

class MarketingCarousel extends React.Component {
  state = {
    activeSlide: 0
  };
  render() {
    let { images } = this.props;
    if (!images) {
      images = [this.props.image];
    }
    return (
      <View style={{ position: "relative" }}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          autoplay={true}
          loop={true}
          data={images}
          renderItem={({ item, index }) => {
            const { width } = Dimensions.get("window");
            let imageStyle = {
              width: width,
              height: 200,
              margin: 0
            };
            const resizeMethod = "auto";
            return (
              <View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (!item.link) {
                      return;
                    }
                    const { route, params } = deriveScreenAndParamsFromUrl(
                      item.link
                    );

                    if (route) {
                      this.props.navigation.navigate(route, params);
                    }
                  }}
                >
                  <Image
                    source={{ uri: item.src }}
                    style={imageStyle}
                    resizeMethod={resizeMethod}
                  />
                </TouchableWithoutFeedback>
              </View>
            );
          }}
          sliderWidth={width ? width : 400}
          itemWidth={width ? width : 400}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Pagination
            dotsLength={images.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{
              backgroundColor: "rgba(0,0,0,0.08)",
              paddingVertical: 10
            }}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 5,
              marginHorizontal: 4,
              backgroundColor: "white"
            }}
            inactiveDotStyle={{
              borderColor: "white",
              borderWidth: 1,
              backgroundColor: "rgba(0,0,0,0)"
              // Define styles for inactive dots here
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
        </View>
      </View>
    );
  }
}
const NavigatableMarketingCarousel = withNavigation(MarketingCarousel);

export const ScrollerHeader = props => {
  return (
    <View style={{ paddingTop: 3 }}>
      <Divider />
      <View
        style={{
          paddingHorizontal: CART_CARD_HORIZONTAL_PADDING,
          paddingTop: 8
        }}
      >
        <Text h3>{props.heading}</Text>
      </View>
    </View>
  );
};
const CategoryScroller = props => {
  const { categories } = props;

  return (
    <View>
      <ScrollerHeader heading="Categories" />

      <ScrollView horizontal={true}>
        {categories.map(category => (
          <CategoryTile key={category.id} category={category} />
        ))}
      </ScrollView>
    </View>
  );
};
class HomeScreen extends React.Component<IAppProps> {
  state = {
    search: ""
  };
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
      this.refs.signinModal && this.refs.signinModal.openModal();

      SplashScreen && SplashScreen.hide(); //missing in web.
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.customer.hasSignedInOrSkippedWelcome &&
      !this.props.customer.hasSignedInOrSkippedWelcome
    ) {
      this.props.navigation.setParams({ showHeader: true });
      this.refs.signinModal && this.refs.signinModal.closeModal();
    }
    if (
      !nextProps.customer.hasSignedInOrSkippedWelcome &&
      this.props.customer.hasSignedInOrSkippedWelcome
    ) {
      this.props.navigation.setParams({ showHeader: false });
      this.refs.signinModal && this.refs.signinModal.openModal();
    }
  }

  performSearch = e => {
    const search = e.nativeEvent.text;
    Alert.alert("searching for " + search);
  };
  updateSearch = e => {
    const search = e.nativeEvent.text;
    this.setState({ search });
  };
  render() {
    const { categories, theme, shop, customer } = this.props;
    const { hasSignedInOrSkippedWelcome } = customer;
    const { width } = Dimensions.get("window");

    const { search } = this.state;

    const images = [
      {
        src:
          "https://zbanoffice.com/wp-content/uploads/2019/05/banner1-1024x373.jpg"
      },
      {
        src:
          "https://carsalesvanuatu.com/wp-content/uploads/2017/07/indepencen-sale-banner.jpg",
        link: "/category/15"
      }
    ];

    const image = {
      src: "https://cdn.displays2go.com/images/zoom/vban846sal.rw_zoom.jpg",
      link: "/product/487"
    };

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

        <HomepageSigninModal ref={"signinModal"} />

        <View>
          <SearchBar
            lightTheme={!!(theme.colors.navbarBackgroundColor == "#ffffff")}
            containerStyle={{
              backgroundColor: theme.colors.navbarBackgroundColor
            }}
            inputContainerStyle={{
              backgroundColor: theme.colors.navbarBackgroundColor
            }}
            placeholder="What are you looking for?"
            onSubmitEditing={this.performSearch}
            onChange={this.updateSearch}
            value={search}
          />
        </View>

        {hasSignedInOrSkippedWelcome && (
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
            <NavigatableMarketingCarousel image={image} />
            <NavigatableMarketingCarousel images={images} />

            <CategoryScroller categories={categories.data} />

            <ProductScroller filter="featured" />
            <ProductScroller filter="on_sale" />
            <ProductScroller filter="new" />
            {/*categories.data.map(category => (
              <CategoryTile key={category.id} category={category} />
            ))*/}
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
