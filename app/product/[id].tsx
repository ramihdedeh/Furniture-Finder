import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    View,
} from 'react-native';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-gray-500">Loading product...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-4">
        <Text className="text-red-500 font-medium text-center">{error || 'Product not found.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Image
        source={{ uri: product.images?.[0] || '' }}
        className="w-full h-64 rounded-lg mb-4"
        resizeMode="cover"
      />
      <Text className="text-2xl font-bold mb-2">{product.title}</Text>
      <Text className="text-lg text-blue-600 mb-2">${product.price}</Text>
      <Text className="text-gray-700 mb-4">{product.description}</Text>
      <Text className="text-sm text-gray-500">Category: {product.category}</Text>
    </ScrollView>
  );
}
