import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('accessToken');
};

export const saveRefreshToken = async (token: string) => {
  await AsyncStorage.setItem('refreshToken', token);
};

export const getRefreshToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('refreshToken');
};

export const removeRefreshToken = async () => {
  await AsyncStorage.removeItem('refreshToken');
};

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem('accessToken', token);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('accessToken');
};