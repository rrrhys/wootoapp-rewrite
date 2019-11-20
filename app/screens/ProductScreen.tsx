import { Attribute, Product, Variation } from "../types/woocommerce";
import { Button, Icon, Image, withTheme } from "react-native-elements";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import KeyValuePicker, { pickableValue } from "../components/KeyValuePicker";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { rules, styles } from "../styles";

import Text from "../primitives/Text";
import Actions from "../actions";
import AddToCartButton from "../components/AddtoCartButton";
import FooterNavigationArea from "../components/FooterNavigationArea";
import BackButtonOverlay from "../components/BackButtonOverlay";
import CartButton from "../components/CartButton";
import ImageCarousel from "../components/ImageCarousel";
import Loading from "../components/Loading";
import ProductDescription from "../components/ProductDescription";
import React from "react";
import { connect } from "react-redux";
import ThemedScrollableTabView from "../primitives/ThemedScrollableTabView";
import { setAddressBarToDerivedPath } from "../../helpers/routing";

export const INTERNAL_QUANTITY = "INTERNAL_QUANTITY";
export const ATTRIBUTE_MATCHING_PROPERTY = "name";
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
  attributesSelected: any;
  variation: Variation | null;
  viewWidth: number;
}

const DEFAULT_WIDTH = 375;
class ProductScreen extends React.Component<
  IProductScreenProps,
  IProductScreenState
> {
  state = {
    activeSlide: 0,
    quantity: 1,
    attributesSelected: {},
    variation: null,
    viewWidth: DEFAULT_WIDTH
  };

  static navigationOptions = ({ navigation, navigationOptions }) => {
    setAddressBarToDerivedPath(
      navigation.state.routeName,
      navigation.state.params
    );
    return {
      header: null
    };
  };

  constructor(props: IProductScreenProps) {
    super(props);
    props.loadProductById(props.product_id);
  }

  productAttributeChanged = (key: string, value: any) => {
    let attributesSelected = {
      ...this.state.attributesSelected,
      ...{ [key]: value }
    };

    /* which variation has this combination of attributes?
    If none, then add to cart must be disabled.
    */
    //TODO: Disable add to cart if no variation for this combo.
    const { variations, product } = this.props;

    let variation: Variation | null = this.findVariation(
      attributesSelected,
      product,
      variations
    );

    this.setState({
      attributesSelected: attributesSelected,
      variation: variation
    });
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

  private findVariation(
    existingAttrs: {},
    product: Product,
    variations: Variation[]
  ) {
    /*
      Take each attribute that has been selected by the user and try to match it to a product.

      Find a variatiion where every attribute matches those selected by the user.

    */
    let variation: Variation | null = null;
    const hasUnselectedAttributes = this.hasUnselectedAttributes(
      existingAttrs,
      product
    );

    if (!hasUnselectedAttributes) {
      variation = variations.find((v: Variation) => {
        let isMatch = true;
        v.attributes.map((a: Attribute) => {
          const id = a[ATTRIBUTE_MATCHING_PROPERTY].toString();
          Object.keys(existingAttrs).map(k => {
            if (id == k) {
              if (a.option !== existingAttrs[k]) {
                isMatch = false;
              }
            }
          });
        });
        return isMatch;
      });
    }
    return variation;
  }

  /**
   * returns true if the selected attribute set is incomplete.
   */
  hasUnselectedAttributes = (existingAttrs: {}, product: Product): boolean => {
    const selectedAttributeIds = Object.keys(existingAttrs);
    const unselectedAttributes = product.attributes.filter(
      a =>
        selectedAttributeIds.indexOf(
          a[ATTRIBUTE_MATCHING_PROPERTY].toString()
        ) === -1
    );
    const hasUnselectedAttributes = unselectedAttributes.length > 0;
    return hasUnselectedAttributes;
  };

  onLayout = event => {
    var { x, y, width, height } = event.nativeEvent.layout;

    this.setState({
      viewWidth: width
    });
  };

  render() {
    const { product, theme } = this.props;

    const { description } = product;

    const { quantity, attributesSelected, variation, viewWidth } = this.state;

    const OUTER_MARGIN = 8;
    return product ? (
      <View
        accessibilityLabel={"productScreenBaseView"}
        onLayout={this.onLayout}
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundColor
        }}
      >
        <ScrollView>
          <ImageCarousel
            height={viewWidth}
            width={viewWidth}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            activeSlide={this.state.activeSlide}
            images={product && product.images}
          />

          <View>
            <Text h4 style={styles.productHeading}>
              {product.name}
            </Text>
          </View>

          <ThemedScrollableTabView>
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
          </ThemedScrollableTabView>

          {/* Sticky add to cart on the bottom. Left side */}
        </ScrollView>

        <BackButtonOverlay onPress={() => this.props.navigation.goBack()} />

        <KeyValuePicker
          containerStyle={{ margin: OUTER_MARGIN }}
          label="quantity"
          key={INTERNAL_QUANTITY}
          id={INTERNAL_QUANTITY}
          values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          currentValue={quantity}
          onValueChanged={this.valueChanged}
        />

        {product.type == "variable" &&
          //TODO: Attributes can exist for non variable products.
          // these belong on the specifications tab.

          //TODO: add to cart button should only be enabled if all variations have been selected.
          product.attributes.map((a: Attribute, i) => {
            return (
              a.visible && (
                <KeyValuePicker
                  containerStyle={{ margin: OUTER_MARGIN }}
                  key={i}
                  id={a[ATTRIBUTE_MATCHING_PROPERTY]}
                  label={a.name}
                  values={a.options}
                  currentValue={
                    attributesSelected[a[ATTRIBUTE_MATCHING_PROPERTY]]
                  }
                  defaultValue={null}
                  placeholder={`Select ${a.name}`}
                  onValueChanged={this.productAttributeChanged}
                />
              )
            );
          })}
        <FooterNavigationArea>
          <AddToCartButton
            style={{ flex: 1 }}
            product={product}
            variation={variation}
            quantity={quantity}
            enabled={product.type === "simple" || variation}
          />
          <CartButton style={{ flex: 1 }} />
        </FooterNavigationArea>
      </View>
    ) : (
      <Loading />
    );
  }
}

const select = (store, ownProps: IProductScreenProps) => {
  let { product, product_id } = ownProps.navigation.state.params;

  if (!product_id) {
    product_id = product.id;
  }
  const variations = store.products.variations
    ? store.products.variations[product_id]
    : [];

  return {
    product_id,
    cart: store.cart,
    ui: store.ui,
    categories: store.categories,
    product: store.products.products[product_id],
    variations
  };
};

const actions = dispatch => {
  const { loadProductById } = Actions;
  return {
    loadProductById: (id: number) => dispatch(loadProductById(id))
  };
};

export default connect(select, actions)(withTheme(ProductScreen));
