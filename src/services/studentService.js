import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

const collectionName = 'students';

export async function addStudent(student) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...student,
      createdAt: serverTimestamp(),
    });
    return docRef;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function onStudentsSnapshot(callback) {
  try {
    const q = query(
      collection(db, collectionName),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const students = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(students);
    });
  } catch (error) {
    console.warn('onStudentsSnapshot error', error);
    callback([]);
    return () => {};
  }
}

export async function fetchStudentsOnce() {
  try {
    const q = query(
      collection(db, collectionName),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.warn('fetchStudentsOnce error', error);
    return [];
  }
}
