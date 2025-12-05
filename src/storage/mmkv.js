import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export function saveLogin(user) {
  try {
    storage.set('user', JSON.stringify(user));
  } catch (e) {
    console.warn('MMKV saveLogin error', e);
  }
}

export function getLogin() {
  try {
    const raw = storage.getString('user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('MMKV getLogin error', e);
    return null;
  }
}

export function clearLogin() {
  try {
    storage.delete('user');
  } catch (e) {
    console.warn('MMKV clearLogin error', e);
  }
}

export default storage;
