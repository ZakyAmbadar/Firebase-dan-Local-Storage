import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import { onStudentsSnapshot, addStudent } from '../services/studentService';
import { signOut } from '../services/authService';

export default function StudentsScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [major, setMajor] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const unsubscribe = onStudentsSnapshot((list) => {
      setStudents(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  async function handleAddStudent() {
    if (!name || !nim) {
      Alert.alert('Error', 'Nama dan NIM harus diisi');
      return;
    }
    setAdding(true);
    try {
      await addStudent({ name, nim, major });
      setName('');
      setNim('');
      setMajor('');
      Alert.alert('Sukses', 'Mahasiswa berhasil ditambahkan');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setAdding(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Data Mahasiswa</Text>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Nama"
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={!adding}
        />
        <TextInput
          placeholder="NIM"
          style={styles.input}
          value={nim}
          onChangeText={setNim}
          editable={!adding}
        />
        <TextInput
          placeholder="Jurusan (opsional)"
          style={styles.input}
          value={major}
          onChangeText={setMajor}
          editable={!adding}
        />
        <TouchableOpacity
          style={[styles.addButton, adding && styles.buttonDisabled]}
          onPress={handleAddStudent}
          disabled={adding}
        >
          <Text style={styles.addButtonText}>
            {adding ? 'Menambahkan...' : 'Tambah Mahasiswa'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.itemMeta}>
              <Text style={styles.itemDetail}>NIM: {item.nim}</Text>
              {item.major && <Text style={styles.itemDetail}>Jurusan: {item.major}</Text>}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Tidak ada data mahasiswa</Text>
          </View>
        }
        contentContainerStyle={students.length === 0 ? styles.emptyContainer : {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  signOutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ef4444',
    borderRadius: 6,
  },
  signOutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  form: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 10,
    borderRadius: 6,
    fontSize: 14,
    backgroundColor: '#f9fafb',
  },
  addButton: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  itemMeta: {
    gap: 4,
  },
  itemDetail: {
    fontSize: 13,
    color: '#6b7280',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyContainer: {
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
});
