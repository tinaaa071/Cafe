// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBdfmdw6dSzzqxpvJyeUR2lzDOue0KY4hY",
  authDomain: "cafe-4a7ec.firebaseapp.com",
  projectId: "cafe-4a7ec",
  storageBucket: "cafe-4a7ec.appspot.com",
  messagingSenderId: "495474486239",
  appId: "1:495474486239:web:25b07612096117b513f26a",
  measurementId: "G-4L285Q6HBE"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 初始化 Realtime Database 並匯出
const database = getDatabase(app);

export { database };