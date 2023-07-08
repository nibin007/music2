import {getApp,getApps,initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4x6FPgdCp8qbRrn_LjfJ4J5w8f6ZoC-Y",
    authDomain: "musicapp-69df8.firebaseapp.com",
    projectId: "musicapp-69df8",
    storageBucket: "musicapp-69df8.appspot.com",
    messagingSenderId: "219160770198",
    appId: "1:219160770198:web:2e54712a14d220a1e634b7"
  };

const app=getApps.length>0 ? getApp() :initializeApp(firebaseConfig);
const storage=getStorage(app);
export {app,storage};