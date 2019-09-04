import { Attribute, Product, Variation } from "../types/woocommerce";
import { Button, Icon, Image, Text } from "react-native-elements";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { rules, styles } from "../styles";

import Actions from "../actions";
import AddToCartButton from "../components/AddtoCartButton";
import BackButtonOverlay from "../components/BackButtonOverlay";
import ImageCarousel from "../components/ImageCarousel";
import KeyValuePicker from "../components/KeyValuePicker";
import Loading from "../components/Loading";
import ProductDescription from "../components/ProductDescription";
import React from "react";
import { connect } from "react-redux";

export const INTERNAL_QUANTITY = "INTERNAL_QUANTITY";
export interface IProductScreenProps {
  navigation: {
    state: {
      params: {
        product: Product;
      };
    };
    goBack: () => void;
  };
  loadProductById: (id: number) => void;
  product: Product;
  variations: Array<Variation>;
}

export interface IProductScreenState {
  activeSlide: number;
  quantity: number;
  attributesSelected: { [id: string]: string };
}

class ProductScreen extends React.Component<
  IProductScreenProps,
  IProductScreenState
> {
  state = {
    activeSlide: 0,
    quantity: 1,
    attributesSelected: {}
  };

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      hideHeader: true
    };
  };

  constructor(props: IProductScreenProps) {
    super(props);
    props.loadProductById(props.navigation.state.params.product.id);
  }

  getHeight = () => {
    return Dimensions.get("window").height - 44;
  };

  valueChanged = (key: string, value: number) => {
    switch (key) {
      case INTERNAL_QUANTITY:
        this.setState({
          quantity: value
        });
        break;
    }
  };

  render() {
    const { product, variations } = this.props;

    const { quantity } = this.state;
    const { description } = product;

    console.log(product);
    console.log(variations);

    const { width, height } = Dimensions.get("window");
    return product ? (
      <View
        accessibilityLabel={"productScreenBaseView"}
        style={{
          flex: 1,
          height
        }}
      >
        <ScrollView>
          <ImageCarousel
            height={width}
            width={width}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            activeSlide={this.state.activeSlide}
            images={product && product.images}
          />

          <View>
            <Text h4 style={styles.productHeading}>
              {product.name}
            </Text>
          </View>

          <ScrollableTabView
            style={{ marginTop: 20, minHeight: 500 }}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar />}
          >
            <ScrollView tabLabel="Description">
              <ProductDescription description={description} />
            </ScrollView>
            <ScrollView
              style={{ height: 300, backgroundColor: "#00ff00" }}
              tabLabel="Specifications"
            >
              <Text>(Specs)</Text>
            </ScrollView>
            <ScrollView
              style={{ height: 300, backgroundColor: "#00ff00" }}
              tabLabel="Reviews"
            >
              <Text>(Reviews)</Text>
            </ScrollView>
          </ScrollableTabView>

          {/* Sticky add to cart on the bottom. Left side */}
        </ScrollView>

        <BackButtonOverlay onPress={() => this.props.navigation.goBack()} />

        <KeyValuePicker
          label="quantity"
          key={INTERNAL_QUANTITY}
          values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          currentValue={quantity}
          onValueChanged={this.valueChanged}
        />

        {product.attributes.map((a: Attribute) => {
          /* attributes: Array(1)
0:
id: 0
name: "Colours"
options: (3) ["Khaki", "Green", "Charcoal"]
position: 0
variation: true
visible: true
__proto__: Object
length: 1
*/
          return (
            a.visible && (
              <KeyValuePicker
                key={a.id}
                label={a.name}
                values={a.options}
                currentValue={this.state.attributesSelected[a.id]}
                defaultValue={a.options[a.position]}
              />
            )
          );
        })}
        <SafeAreaView>
          <AddToCartButton product={product} variations={variations} />
        </SafeAreaView>
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
    product: store.products.products[product.id],
    variations: store.products.variations[product.id]
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
