import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

import { productsService } from "../services/productsService";
import { IProduct } from "../interfaces/products.interface";

import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Products: undefined;
  ProductDetails: {
    productId: number;
    title: string;
    price: number;
    description: string;
  };
};

type ProductDetailsProps = {
  route: RouteProp<RootStackParamList, "ProductDetails">;
};

export default function Product({
  route,
  navigation,
}: ProductDetailsProps & { navigation: any }) {
  const { productId, title, price, description } = route.params;

  const [expanded, setExpanded] = useState(false);
  const [product, setProduct] = useState<IProduct>();
  const [cart, setCart] = useState<IProduct[]>([]);

  const handleAddToCart = (product: IProduct) => {
    navigation.navigate("Cart", { product });
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    productsService.getProduct(productId).then((product) => {
      setProduct(product);
    });
  }, [productId]);

  return (
    <View style={styles.product}>
      <Text style={styles.title}>{product?.title}</Text>
      <Image style={styles.image} source={{ uri: product?.image }} />
      <Text style={styles.price}>Price: {product?.price}$</Text>
      <TouchableOpacity onPress={toggleDescription}>
        <Text>{expanded ? "Hide" : "Show"} description</Text>
      </TouchableOpacity>
      {expanded && <Text>{product?.description}</Text>}

      <Button
        title="Buy"
        color="red"
        onPress={() => {
          handleAddToCart(product!);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 16,
  },
  price: {
    fontSize: 20,
    alignSelf: "flex-start",
    margin: 16,
  },
  expandedDescription: {
    color: "#333333",
    margin: 16,
  },
  collapsedDescription: {
    color: "#333333",
    margin: 16,
  },
  buyButton: {
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    width: "90%",
    height: 40,
    padding: 16,
    margin: 16,
  },
});
