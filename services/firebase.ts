// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyANCcLFF1V6ejYcKMB0PoFAmudjJUjTdY4',
	authDomain: 'recipes-app-59e6a.firebaseapp.com',
	projectId: 'recipes-app-59e6a',
	storageBucket: 'recipes-app-59e6a.appspot.com',
	messagingSenderId: '728371484747',
	appId: '1:728371484747:web:abb1378c313c3d766d15ce',
	measurementId: 'G-KRWZ80Y71Q',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
