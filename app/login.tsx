import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    const isValid = email === 'test@example.com' && password === '123456';

    if (isValid) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userEmail', email);
      router.replace('/');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white justify-center items-center px-6"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text className="text-3xl font-bold text-gray-800 mb-10">
        Furniture Finder
      </Text>

      <TextInput
        className="border border-gray-400 w-full rounded-md px-4 py-2 mb-4 text-gray-800"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="border border-gray-400 w-full rounded-md px-4 py-2 mb-6 text-gray-800"
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="border border-gray-700 w-full py-2 rounded-md"
        onPress={handleLogin}
      >
        <Text className="text-center text-gray-800 text-base font-medium">
          Log In
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
