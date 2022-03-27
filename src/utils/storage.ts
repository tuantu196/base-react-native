import AsyncStorage from '@react-native-async-storage/async-storage';

type SaveTokenInput = {
  accessToken: string;
  refressToken: string;
};

export const storeDeviceId = async (value: string) => {
  try {
    await AsyncStorage.setItem('deviceId', value);
  } catch (err) {
    console.log('err store:', err);
  }
};

export const getStoreDeviceId = async () => {
  try {
    return await AsyncStorage.getItem('deviceId');
  } catch (err) {
    console.log('err store:', err);
  }
};

export const storeToken = async (data: SaveTokenInput) => {
  try {
    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.refressToken);
  } catch (err) {
    console.log('err store:', err);
  }
};

export const removeToken = async () => {
  return await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
};

export const getStoreToken = async () => {
  try {
    const value = await AsyncStorage.getItem('accessToken');
    return value;
  } catch (err) {
    console.log('err store:', err);
  }
};

export const handleStorage = {
  getItem: async (key: any) => {
    const data = await AsyncStorage.getItem(key);
    return data;
  },
  setItem: async (key: any, value: any) => {
    try {
      return AsyncStorage.setItem(key, value);
    } catch (err) {
      throw err;
    }
  },
  removeItem(key: any) {
    return AsyncStorage.removeItem(key);
  },
};

export const handleObjectStorage = {
  getObject: async (key: any) => {
    const data = await AsyncStorage.getItem(key);
    return data != null ? JSON.parse(data) : null;
  },
  setObject: async (key: any, object: any) => {
    try {
      const jsonValue = JSON.stringify(object);
      return AsyncStorage.setItem(key, jsonValue);
    } catch (err) {
      throw err;
    }
  },
  removeObject(key: any) {
    return AsyncStorage.removeItem(key);
  },
};
