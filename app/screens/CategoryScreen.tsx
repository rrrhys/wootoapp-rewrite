import { Dimensions, FlatList, SectionList, View } from "react-native";

import Actions from "../actions";
import { Category } from "../types/woocommerce";
import Loading from "../components/Loading";
import ProductTile from "../components/ProductTile";
import React from "react";
import { connect } from "react-redux";

export interface ICategoryScreenProps {
  navigation: {
    state: {
      params: {
        category: Category;
      };
    };
  };
  loadProductsInCategory: (category: number, page: number) => void;
  productsByCategory: Array<number>;
}

class CategoryScreen extends React.Component<ICategoryScreenProps> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: navigation.state.params.category.name,
      backButton: true
    };
  };

  constructor(props: ICategoryScreenProps) {
    super(props);

    props.loadProductsInCategory(props.navigation.state.params.category.id, 1);
  }

  render() {
    const { productsByCategory } = this.props;
    const numColumns = 2;
    const tileStyle = {
      flexDirection: "column",
      flex: 1 / numColumns,
      paddingHorizontal: 10,
      borderColor: "#eeeeee",
      borderWidth: 2
    };

    const { height } = Dimensions.get("window");

    return (
      <View
        accessibilityLabel={"CategoryScreenBaseView"}
        style={{
          flex: 1,
          height
        }}
      >
        {productsByCategory ? (
          <FlatList
            data={productsByCategory}
            numColumns={numColumns}
            keyExtractor={el => el}
            renderItem={el => <ProductTile id={el.item} style={tileStyle} />}
          />
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const select = (store, ownProps: ICategoryScreenProps) => {
  const { category } = ownProps.navigation.state.params;

  return {
    cart: store.cart,
    ui: store.ui,
    categories: store.categories,
    productsByCategory: store.products.byCategoryId[category.id]
  };
};

const actions = dispatch => {
  const { loadProductsInCategory } = Actions;
  return {
    loadProductsInCategory: (category: number, page: number) =>
      dispatch(loadProductsInCategory(category, page))
  };
};

export default connect(
  select,
  actions
)(CategoryScreen);
