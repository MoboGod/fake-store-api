import { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import { IProduct } from "../interfaces/products.interface";

export default function Cart({ route }: any) {
  if (!route.params) return null;
  const { product } = route.params;
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  useEffect(() => {
    setCartItems([...cartItems, product]);
  }, [product]);

  return (
    <View style={{ width: "100%", height: "100%", flex: 1 }}>
      <Text>
        {cartItems.length > 0
          ? cartItems.map((item: any) => {
              return (
                <View key={item.id}>
                  <Text>{item.title}</Text>
                </View>
              );
            })
          : "No items in cart"}
      </Text>
    </View>
  );
}
