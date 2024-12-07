import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, Image, RefreshControl } from 'react-native';
import { ProductsContext } from '@/db';



export default function App() {
  const productsStore = useContext(ProductsContext);
  const [refreshing, setRefreshing] = useState(false);
  
  const loadBasket = () => {
    setRefreshing(true);
    productsStore.getBasket();
   
    setTimeout(() => {
      setRefreshing(false);
    }, 500);

  };

  useEffect(() => {
    loadBasket();
  }, []);

  return (
    <View style={styles.containerTop}>
      <FlatList
        data={productsStore.basketRows}
        renderItem={({ item }) => (
          <View style={{ padding: 35, flex: 1 }}>
            <View>
              <View style={styles.container}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.textName}>{item.title}</Text>                
              </View>
              <View style={styles.container}>
                <Text style={styles.textCost}>{item.price} $ x {item.count} pcs.</Text>
              </View>
              <Text style={styles.textDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={loadBasket} />}
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