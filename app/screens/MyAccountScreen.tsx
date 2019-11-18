import {
  Dimensions,
  FlatList,
  SectionList,
  View,
  Text,
  ScrollView,
  SafeAreaView
} from "react-native";

import Actions from "../actions";
import { Category, Order } from "../types/woocommerce";
import Loading from "../components/Loading";
import ProductTile from "../components/ProductTile";
import React from "react";
import { connect } from "react-redux";
import RequiresAuthenticatedUser from "../components/RequiresAuthenticatedUser";
import { Icon, withTheme, Divider } from "react-native-elements";
import { DIVIDER_HEIGHT } from "../styles";
import ListItem from "../primitives/ListItem";
import ThemedScrollableTabView from "../primitives/ThemedScrollableTabView";
import { IOrders } from "../reducers/orders";
import Button from "../components/Button";
import Price from "../components/Price";
import { ICustomer } from "../reducers/customer";

export interface IMyAccountScreenProps {
  navigation: {
    state: {
      params: {
        category: Category;
      };
    };
  };
  orders: IOrders;
  customer: ICustomer;
}

class MyAccountScreen extends React.Component<IMyAccountScreenProps> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: "My Account",
      backButton: true
    };
  };

  componentWillMount() {
    this.props.customer.customer && this.props.loadOrders();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.customer.customer && nextProps.customer.customer) {
      this.props.loadOrders();
    }
  }

  constructor(props: IMyAccountScreenProps) {
    super(props);
  }

  render() {
    const { signoutCustomer, theme, orders, customer } = this.props;

    return (
      <RequiresAuthenticatedUser>
        <SafeAreaView
          accessibilityLabel={"MyAccountScreenBaseView"}
          style={{
            flex: 1,
            backgroundColor: theme.colors.backgroundColor
          }}
        >
          <ListItem
            title={
              customer.customer && `Signed in as ${customer.customer.email}`
            }
          ></ListItem>
          <Divider />

          <ThemedScrollableTabView>
            <ScrollView tabLabel="My Orders">
              {orders.byId.map((order_id: number, i) => {
                const order = orders.orders[order_id];
                return (
                  <ListItem
                    contentContainerStyle={{
                      paddingLeft: 10
                    }}
                    bottomDivider
                    leftIcon={
                      <Icon
                        name="shopping-bag"
                        type="font-awesome"
                        color={theme.colors.text}
                      />
                    }
                    title={`Order #${order.id}`}
                    subtitle={"Status: " + order.status}
                    rightElement={
                      order.status === "pending" && (
                        <Button
                          title={<Price prefix="Pay " price={order.total} />}
                          onPress={() =>
                            this.props.navigation.navigate("Pay", {
                              order: order
                            })
                          }
                        />
                      )
                    }
                    chevron
                    onPress={() => {
                      this.props.navigation.navigate("OrderDetails", {
                        order_id: order.id
                      });
                    }}
                  />
                );
              })}
            </ScrollView>
          </ThemedScrollableTabView>
          <ListItem
            contentContainerStyle={{
              paddingLeft: 10
            }}
            titleStyle={{ color: theme.colors.text }}
            bottomDivider
            topDivider
            separator
            leftIcon={
              <Icon
                name="sign-out"
                type="font-awesome"
                color={theme.colors.text}
              />
            }
            title="Sign Out"
            chevron
            onPress={() => {
              signoutCustomer();

              this.props.navigation.navigate("Home");
            }}
          />
        </SafeAreaView>
      </RequiresAuthenticatedUser>
    );
  }
}

const select = (store, ownProps: IMyAccountScreenProps) => {
  return {
    cart: store.cart,
    orders: store.orders,
    ui: store.ui,
    categories: store.categories,
    customer: store.customer
  };
};

const actions = dispatch => {
  const { loadOrders, signoutCustomer } = Actions;
  return {
    loadOrders: () => dispatch(loadOrders()),
    signoutCustomer: () => dispatch(signoutCustomer())
  };
};

export default connect(select, actions)(withTheme(MyAccountScreen));
