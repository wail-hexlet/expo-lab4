import React, { useContext, useEffect, useState  } from 'react';
import { FlatList, View, StyleSheet, RefreshControl, Button, Text, Image } from 'react-native';
import { ProductsContext } from '@/db';

export default function Index() {
  const productsStore = useContext(ProductsContext);

  const onPress = (id: number, title : string, image: string, price: number, description: string) => {
    productsStore.addProductToBasket(id, title, image, price, description);
  };
  
  const [refreshing, setRefreshing] = useState(true);

  const loadProducts = () => {
    setRefreshing(true);
    productsStore.getProducts()
      .then(_ => setRefreshing(false))
      .catch(_ => setRefreshing(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <View style={styles.containerTop}>
      <FlatList
        data={productsStore.products}
        renderItem={({ item }) => (
          <View style={{ padding: 35, flex: 1 }}>
            <View>
              <View style={styles.container}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.textName}>{item.title}</Text>                
              </View>
              <View style={styles.container}>
                <Text style={styles.textCost}>Cost: {item.price} $</Text>
              </View>
              <Text style={styles.textDescription}>{item.description}</Text>
            </View>
            <Button title={'Add to basket'} onPress={() => onPress(item.id,item.title, item.image, item.price, item.description)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={loadProducts} />}
      />
    </View>
  );
}
 

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    maxWidth: '70%',
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  textCost: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: 12,
  },
  image: {
    width: 60, 
    height: 60,
  },
});


