import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Products from "./components/products";
import Product from "./components/product";
import Cart from "./components/cart";

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={Products}
          options={({ navigation }) => ({
            title: "Products",
            headerRight: () => (
              <MaterialIcons
                name="shopping-cart"
                size={24}
                style={{ marginRight: 16 }}
                color="black"
                onPress={() => navigation.navigate("Cart")}
              />
            ),
          })}
        />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen
          name="Product"
          component={Product}
          options={{ title: "Product" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
