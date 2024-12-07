import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'List of items',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'albums-sharp' : 'albums-outline'} color={color} size={24} />
        ),
      }}/>
      <Tabs.Screen name="basket" options={{
        title: 'Basket',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'cart-sharp' : 'cart-outline'} color={color} size={24} />
        ),
      }}/>
    </Tabs>
  );
}
