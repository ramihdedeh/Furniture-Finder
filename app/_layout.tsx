import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';

export default function RootLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const onLoginScreen = segments[0] === 'login';

      if (!isLoggedIn && !onLoginScreen) {
        router.replace('/login');
      } else if (isLoggedIn === 'true' && onLoginScreen) {
        router.replace('/');
      }

      setCheckingAuth(false);
    };

    checkLogin();
  }, [segments]);

  if (checkingAuth) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ThemeProvider>
    <Stack>
      {/* Home */}
      <Stack.Screen
        name="index"
        options={{
          headerBackVisible: false,
          headerTitle: 'Furniture Finder',
    headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/profile')}
  style={{
      marginRight: 15,
      marginTop: -15, 
    }}
            >
              <Ionicons name="person-circle-outline" size={25} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Login — hide back button */}
      <Stack.Screen
        name="login"
        options={{
          headerBackVisible: false,
          headerTitle: '',
          gestureEnabled: false, 
        }}
      />

      {/* Profile */}
      <Stack.Screen
        name="profile/index"
        options={{
          headerTitle: '',
          headerBackVisible: true,
        }}
      />

      {/* Product Detail */}
      <Stack.Screen
        name="product/[id]"
        options={{
          headerTitle: '',
        }}
      />
    </Stack>
    </ThemeProvider>
  );
}
