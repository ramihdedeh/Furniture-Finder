# 🪑 Furniture-Finder

A mobile app to browse, view, and manage furniture items. Built with **React Native + Expo**, styled using **Tailwind CSS**, and supports features like login, camera-based profile photo, product browsing, and logout.

---

## 🚀 Features

- 📸 Capture and upload profile photo using device camera  
- 🔐 Secure login and logout functionality  
- 🛋️ Browse furniture items by category  
- 🧾 View product details with images and descriptions  
- ⚙️ Expo Router for smooth navigation  
- 💾 Persistent session with AsyncStorage  

---

## 📦 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.dev/router)
- [Tailwind CSS via nativewind](https://www.nativewind.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation](https://reactnavigation.org/)

---

## 📲 Prerequisites

Ensure the following tools are installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm 
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)
- Expo Go app on your phone 
---

## 🛠️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/ramihdedeh/Furniture-Finder.git
cd Furniture-Finder

# 2. Install dependencies
npm install

# 3. Install Expo dependencies
npx expo install
```
## ▶️ Running the App

### Start the development server

```bash
npx expo start

```

or

```bash

npx expo  start --clear
```

## ⚠️ Common Issue: Error: The system cannot find the path specified.

This error often appears when Expo Go fails to connect to the Metro bundler after restarting the development server.

## 💡 Why it happens:

The Metro bundler provides the JavaScript bundle over a temporary local or tunnel-based URL. When the server is restarted, this URL often changes or becomes inactive. However, Expo Go may continue trying to connect using the previous cached URL, which no longer points to an active server.

