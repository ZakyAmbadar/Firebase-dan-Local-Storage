import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { saveLogin, clearLogin } from '../storage/secureStorage';

export async function registerWithEmail(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = {
      uid: result.user.uid,
      email: result.user.email,
    };
    await saveLogin(user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function loginWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = {
      uid: result.user.uid,
      email: result.user.email,
    };
    await saveLogin(user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    await clearLogin();
  } catch (error) {
    throw new Error(error.message);
  }
}
