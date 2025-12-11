# **Rango – The Ultimate Guessing Experience**

**Rango** is a modern and interactive number-guessing game built with **React Native** and **Expo**, designed to deliver a refined, fluid, and visually polished mobile experience.
With its dynamic game modes, responsive animations, and clean glassmorphism-inspired interface, Rango emphasizes clarity, enjoyment, and thoughtful UI/UX principles.

---

## **Features**

### **Multiple Game Modes**

Rango includes two core modes, designed to offer both casual and competitive play:

**1. I Will Guess (Game 1)**
The classic mode where Rango selects a number and the user attempts to guess it.

* **Zen Mode**: A relaxed, unlimited-attempt mode ideal for easygoing gameplay.
* **Challenge Mode**: A more competitive format with limited attempts or timing constraints.

**2. Rango Will Guess (Game 2)**
Reverse the challenge by selecting a number yourself and guiding Rango with “higher” or “lower” hints.
This mode highlights efficient deduction and offers a distinctive twist on the traditional guessing formula.

---

## **UI/UX Design Overview**

* Clean, modern visual design incorporating subtle gradients and glassmorphism themes.
* Intuitive layout with attention to accessibility and clarity.
* Optional haptic feedback support for compatible devices.
* Consistent component styling using a centralized theme and color system.

---

## **Technology Stack**

* **Framework:** React Native (Expo)
* **Language:** TypeScript
* **State Management:** Redux Toolkit
* **Navigation:** React Navigation (Native Stack)
* **Styling & Layout:** StyleSheet, custom theme constants, expo-linear-gradient, react-native-safe-area-context
* **Icons:** @expo/vector-icons

---

## **Project Structure**

```
Rango/
├── assets/          # Static assets and images
├── components/      # Reusable UI components
│   ├── screens/     # Game-specific logic and view components
│   └── ui/          # Generic UI elements (Buttons, Headers, Cards)
├── constants/       # Theme, colors, fonts, global config
├── screens/         # Main application screens
├── store/           # Redux store and slices
├── utils/           # Helper functions and utilities
└── App.tsx          # Application entry point
```

---

## **Getting Started**

### **Prerequisites**

* Node.js (LTS recommended)
* npm, yarn, or pnpm
* Expo Go app on a physical device (Android or iOS), or a working mobile emulator/simulator.

### **Installation**

1. Clone the repository and navigate into the project directory:

   ```bash
   cd Rango
   ```

2. Install required dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### **Running the Application**

Start the Expo development server:

```bash
npx expo start
```

You may then:

* Scan the QR code using the Expo Go app
* Press `a` to launch on Android Emulator
* Press `i` to launch on iOS Simulator
* Press `w` to launch in a web browser

---

## **Contributing**

Contributions are welcome. To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add AmazingFeature"`)
4. Push the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
