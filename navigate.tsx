import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Products from "./components/products";
import Product from "./components/product";
import Cart from "./components/cart";
import { IProduct } from "./interfaces/products.interface";
import { useState } from "react";

const Stack = createStackNavigator();

export default function Navigate() {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const addToCart = (product: IProduct) => {
    setCartItems([...cartItems, product]);
  };
  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

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
        <Stack.Screen
          name="Cart"
          component={Cart}
          initialParams={{ cartItems, removeFromCart }}
        />
        <Stack.Screen
          name="Product"
          component={Product}
          options={{ title: "Product" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
