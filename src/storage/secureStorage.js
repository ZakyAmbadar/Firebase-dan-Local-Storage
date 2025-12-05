import * as SecureStore from 'expo-secure-store';

const LOGIN_KEY = 'user_login_info';

export async function saveLogin(user) {
  try {
    await SecureStore.setItemAsync(LOGIN_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn('SecureStore saveLogin error', e);
  }
}

export async function getLogin() {
  try {
    const raw = await SecureStore.getItemAsync(LOGIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('SecureStore getLogin error', e);
    return null;
  }
}

export async function clearLogin() {
  try {
    await SecureStore.deleteItemAsync(LOGIN_KEY);
  } catch (e) {
    console.warn('SecureStore clearLogin error', e);
  }
}
