# React Native Expo + Firebase Firestore

Aplikasi React Native menggunakan **Expo managed workflow** untuk development cepat dengan:
- ✅ Firebase Authentication (Email/Password)
- ✅ Firestore Realtime Database (collection `students`)
- ✅ Expo Secure Store untuk menyimpan informasi login

## ✨ Setup Cepat

### 1. Siapkan Firebase Console

1. Buka [firebase.google.com/console](https://console.firebase.google.com)
2. Buat project baru atau gunakan yang sudah ada
3. **Authentication:**
   - Tab Authentication → Get Started
   - Enable "Email/Password"
4. **Firestore Database:**
   - Tab Firestore Database → Create Database
   - Mode: **Test** (untuk development)
   - Lokasi: Pilih terdekat dengan Anda

### 2. Ambil Firebase Config

1. Di Firebase Console, buka **Project Settings** (roda gigi)
2. Scroll ke bawah cari **Web API Key** (atau buat app baru di "Your apps")
3. Salin config format:
   ```javascript
   {
     apiKey: "AIzaSy...",
     authDomain: "project.firebaseapp.com",
     projectId: "project-id",
     storageBucket: "project-id.appspot.com",
     messagingSenderId: "...",
     appId: "1:...:web:...",
   }
   ```

### 3. Update Firebase Config di `src/config/firebase.js`

Buka file `d:\.vscode\PBP\Firebase\src\config\firebase.js` dan ganti `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Install Dependencies & Run

```powershell
cd d:\.vscode\PBP\Firebase
npm install

# Run dengan Expo CLI (di local dev server)
npx expo start

# Atau pilih platform:
npx expo start --web      # Web browser
npx expo start --android  # Android emulator
npx expo start --ios      # iOS simulator
```

### 5. Jalankan di Device/Emulator

**Android:**
- Tekan `a` di terminal Expo
- Atau gunakan Android Emulator atau device fisik dengan Expo Go app

**iOS (macOS only):**
- Tekan `i` di terminal Expo

**Web:**
- Tekan `w` di terminal Expo
- Atau buka `http://localhost:19006` di browser

## 📱 Fitur Aplikasi

### LoginScreen
- Register akun baru atau login dengan email/password
- Info login disimpan di **Expo Secure Store** (encrypted)

### StudentsScreen
- **Realtime list** mahasiswa dari Firestore
- **Form tambah mahasiswa** baru dengan fields: Nama, NIM, Jurusan
- **Sign Out** button untuk logout

## 🔧 Struktur Folder

```
src/
├── config/
│   └── firebase.js          # Firebase initialization
├── services/
│   ├── authService.js       # Login, Register, SignOut
│   └── studentService.js    # Firestore CRUD & realtime
├── storage/
│   └── secureStorage.js     # Expo Secure Store wrapper
└── screens/
    ├── LoginScreen.js       # Login/Register UI
    └── StudentsScreen.js    # Data mahasiswa UI
```

## 🗄️ Firestore Database Structure

**Collection:** `students`

Setiap document memiliki struktur:
```javascript
{
  id: "auto-generated-by-firestore",
  name: "Budi Santoso",
  nim: "12345678",
  major: "Teknik Informatika",
  createdAt: <server-timestamp>
}
```

## 🚀 Deploy (Optional)

Untuk production, Anda bisa:
- Deploy ke **Expo Application Services (EAS)** untuk build release
- Atau buat APK/IPA native build
- Sesuaikan Firebase Security Rules untuk production

Lihat: [Expo Build Docs](https://docs.expo.dev/build/introduction/)

## 📝 Catatan

- Secure Store di Expo hanya tersedia di managed workflow (tidak di web/emulator Windows)
- Untuk testing di web, localStorage akan digunakan sebagai fallback
- Pastikan Firestore rules sudah diupdate untuk production

---

**Questions?** Lihat dokumentasi resmi:
- [Expo Docs](https://docs.expo.dev)
- [Firebase Web SDK Docs](https://firebase.google.com/docs/web/setup)

