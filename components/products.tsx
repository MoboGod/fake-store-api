import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { productsService } from "../services/productsService";
import { IProduct } from "../interfaces/products.interface";

type RootStackParamList = {
  Products: undefined;
  Product: { productId: string };
};

type ProductsProps = {
  navigation: NavigationProp<RootStackParamList, "Products">;
};

export default function Products({ navigation }: ProductsProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    productsService.getProducts().then((products) => {
      setProducts(products);
      setLoading(false);
    });
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.products}
              onPress={() =>
                navigation.navigate("Product", {
                  productId: item.id.toString(),
                })
              }
            >
              <Image style={styles.image} source={{ uri: item.image }} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>Price: {item.price}$</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  products: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    margin: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 5,
  },
  description: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  price: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
