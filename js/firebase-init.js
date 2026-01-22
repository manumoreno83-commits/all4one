// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVoEl-J8vL28kGIATvpHcSHdQ9116dksg",
    authDomain: "fitness-app-12419.firebaseapp.com",
    projectId: "fitness-app-12419",
    storageBucket: "fitness-app-12419.firebasestorage.app",
    messagingSenderId: "878707204367",
    appId: "1:878707204367:web:13a4278189100954acde7a"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    const app = firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    console.log("🔥 Firebase Initialized");
} else {
    console.error("Firebase SDK not loaded");
}
