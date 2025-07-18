import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPhoto = await AsyncStorage.getItem('profilePhoto');
      if (storedEmail) setEmail(storedEmail);
      if (storedPhoto) setPhoto(storedPhoto);
    };

    loadData();
  }, []);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPreviewPhoto(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const confirmPhoto = async () => {
    if (!previewPhoto) return;
    setPhoto(previewPhoto);
    await AsyncStorage.setItem('profilePhoto', previewPhoto);
    setModalVisible(false);
    setPreviewPhoto(null);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-white items-center px-4 pt-10">
      <Image
        source={
          photo
            ? { uri: photo }
            : require('../../assets/placeholder-profile.png')
        }
        className="w-32 h-32 rounded-full mb-3 border border-gray-300"
      />

      <Text className="text-xl font-semibold mb-6">{email}</Text>

      <TouchableOpacity
        className="border border-gray-400 w-52 py-2 rounded-lg mb-3"
        onPress={takePhoto}
      >
        <Text className="text-center text-gray-800 text-base">
          Update Photo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border border-red-400 w-52 py-2 rounded-lg"
        onPress={logout}
      >
        <Text className="text-center text-red-600 text-base font-medium">
          Log Out
        </Text>
      </TouchableOpacity>

      {/* Modal for confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setPreviewPhoto(null);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white p-6 rounded-lg items-center w-full">
            <Text className="text-lg font-semibold mb-4">
              Use this photo?
            </Text>
            {previewPhoto && (
              <Image
                source={{ uri: previewPhoto }}
                className="w-48 h-48 rounded-full mb-4"
                resizeMode="cover"
              />
            )}
            <View className="flex-row space-x-4">
              <TouchableOpacity
                 className="w-28 h-10 justify-center items-center rounded-lg bg-gray-500"
                onPress={() => {
                  setModalVisible(false);
                  setPreviewPhoto(null);
                }}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                 className="w-28 h-10 justify-center items-center rounded-lg bg-blue-600"
                onPress={confirmPhoto}
              >
                <Text className="text-white font-semibold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Header config
export const options = {
  headerTitle: '',
  headerBackVisible: true,
};
