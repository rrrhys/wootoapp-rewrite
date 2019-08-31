import Carousel, { Pagination } from "react-native-snap-carousel";
import { Dimensions, ScrollView, View } from "react-native";
import { Image, Text } from "react-native-elements";

import Actions from "../actions";
import Loading from "../components/Loading";
import { Product } from "../types/woocommerce";
import React from "react";
import { connect } from "react-redux";
import { styles } from "../styles";

export interface IProductScreenProps {
  navigation: {
    state: {
      params: {
        product: Product;
      };
    };
  };
  loadProductById: (id: number) => void;
  product: Product;
}

class ProductScreen extends React.Component<IProductScreenProps> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      hideHeader: true
    };
  };

  constructor(props: IProductScreenProps) {
    super(props);
    props.loadProductById(props.navigation.state.params.product.id);

    this.state = {
      activeSlide: 0
    };
  }

  getHeight = () => {
    return Dimensions.get("window").height - 44;
  };

  _renderItem({ item, index }) {
    const { width } = Dimensions.get("window");
    let imageStyle = {
      width: width,
      height: width,
      margin: 0
    };

    return (
      <View>
        <Image source={{ uri: item.src }} style={imageStyle} />
      </View>
    );
  }

  render() {
    const { product } = this.props;

    const { width } = Dimensions.get("window");
    return product ? (
      <View
        accessibilityLabel={"productScreenBaseView"}
        style={{
          flex: 1
        }}
      >
        <ScrollView>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={product.images}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
          {product && (
            <View style={{ marginTop: -50 }}>
              <Pagination
                dotsLength={product.images.length}
                activeDotIndex={this.state.activeSlide}
                dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 5,
                  marginHorizontal: 4,
                  backgroundColor: "#000000"
                }}
                inactiveDotStyle={
                  {
                    // Define styles for inactive dots here
                  }
                }
                inactiveDotOpacity={0.2}
                inactiveDotScale={0.6}
              />
            </View>
          )}

          <View>
            <Text h2 style={styles.productHeading}>
              {product.name}
            </Text>
          </View>

          <View>
            <Text>Tab strip - description / specifications / review</Text>
          </View>

          {/* Sticky add to cart on the bottom. Left side */}
        </ScrollView>
        <View>
          <Text>Add to cart area</Text>
        </View>
      </View>
    ) : (
      <Loading />
    );
  }
}

const select = (store, ownProps: IProductScreenProps) => {
  const { product } = ownProps.navigation.state.params;

  return {
    cart: store.cart,
    ui: store.ui,
    categories: store.categories,
    product: store.products.products[product.id]
  };
};

const actions = dispatch => {
  const { loadProductById } = Actions;
  return {
    loadProductById: (id: number) => dispatch(loadProductById(id))
  };
};

export default connect(
  select,
  actions
)(ProductScreen);
