import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// ✅ Define the product type
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export default function HomeScreen() {
  const [furniture, setFurniture] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  const fetchFurniture = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products/category/furniture');
      const data = await res.json();
      setFurniture(data.products);
    } catch (err) {
      setError('Failed to load furniture items. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFurniture();
  }, []);

  useEffect(() => {
    const blockBack = () => true;
    const sub = BackHandler.addEventListener('hardwareBackPress', blockBack);
    return () => sub.remove();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFurniture();
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      className="w-[48%] bg-white rounded-xl p-3 mb-4 shadow"
      onPress={() =>
        router.push({
          pathname: '/product/[id]',
          params: { id: item.id.toString() },
        })
      }
    >
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full h-32 rounded-lg mb-2"
        resizeMode="cover"
      />
      <Text className="font-semibold text-base mb-1">{item.title}</Text>
      <Text className="text-gray-600 text-sm mb-1">${item.price}</Text>
      <Text className="text-gray-500 text-xs" numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-gray-500">Loading furniture...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-4">
        <Text className="text-red-500 font-medium text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 px-3 pt-4">
      
      <Text className="text-base text-gray-600 mb-4 px-1">
        Discover furniture tailored to your style
      </Text>





      <FlatList
        data={furniture}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
