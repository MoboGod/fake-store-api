import { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import { IProduct } from "../interfaces/products.interface";

export default function Cart({ route }: any) {
  const { product } = route.params;
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  useEffect(() => {
    {
      setCartItems([...cartItems, product]);
      console.log(cartItems);
    }
  }, []);

  return (
    <View style={{ width: "100%", height: "100%", flex: 1 }}>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <View key={item.id}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
            <Image source={{ uri: item.image, width: 100, height: 100 }} />
          </View>
        ))
      ) : (
        <Text>No items in cart</Text>
      )}
    </View>
  );
}
