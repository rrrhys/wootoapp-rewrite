import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrderScreen from "../screens/OrderScreen";
import SearchScreen from "../screens/SearchScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import PayScreen from "../screens/PayScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import OrderPaidScreen from "../screens/OrderPaidScreen";

export const Routes = {
  Home: {
    screen: HomeScreen,
    path: "/"
  },
  Category: {
    screen: CategoryScreen,
    path: "/category/:category_id"
  },
  Product: {
    screen: ProductScreen,
    path: "/product/:product_id"
  },
  Cart: {
    screen: CartScreen,
    path: "/cart"
  },
  Checkout: CheckoutScreen,
  Order: OrderScreen,
  Search: SearchScreen,
  MyAccount: MyAccountScreen,
  Pay: PayScreen,
  OrderDetails: OrderDetailsScreen,
  OrderPaid: {
    screen: OrderPaidScreen,
    path: "/order-paid/:order_id"
  }
};
