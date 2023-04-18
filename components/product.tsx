import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { productsService } from "../services/productsService";
import { IProduct } from "../interfaces/products.interface";

import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Products: undefined;
  ProductDetails: { productId: number };
};

type ProductDetailsProps = {
  route: RouteProp<RootStackParamList, "ProductDetails">;
};

export default function Product({ route }: ProductDetailsProps) {
  const { productId } = route.params;

  const [expanded, setExpanded] = useState(false);
  const [product, setProduct] = useState<IProduct>();

  const toogleDescription = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    productsService.getProduct(productId).then((product) => {
      setProduct(product);
    });
  }, []);
  return (
    <View style={styles.product}>
      <Text style={styles.title}>{product?.title}</Text>
      <Image style={styles.image} source={{ uri: product?.image }} />
      <Text style={styles.price}>Price: {product?.price}$</Text>
      <TouchableOpacity
        onPress={() => {
          toogleDescription();
        }}
      >
        {expanded ? (
          <Text style={styles.expandedDescription}>{product?.description}</Text>
        ) : (
          <Text style={styles.collapsedDescription}>Show description</Text>
        )}
      </TouchableOpacity>
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
    width: "60%",
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
});
