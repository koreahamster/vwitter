import firebase from "firebase/app";
import "firebase/auth"; //로그인 시스템을 위해서 임포트
import "firebase/firestore"; //데이터베이스를 사용하기 위해 임포트
import "firebase/storage"; // 파일 저장을 위한 임포트
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth(); // 로그인 시스템을 위해서 
export const dbService = firebase.firestore(); // 데이타베이스를 사용하게 해준다.
export const storageService = firebase.storage(); // 파일 저장을 위한 스토리지