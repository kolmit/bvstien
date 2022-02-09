import packageJson from '../../package.json';

export const environment = {
  production: true,
  USER_DATA: 'performances',
  delayFirebase: 500,
  version: packageJson.version
};


export const firebaseConfig = {
  apiKey: "AIzaSyCbx6F0I9DZMQScqCuofrL9kGTjkY0-iiw",
  authDomain: "performance-1c306.firebaseapp.com",
  databaseURL: "https://performance-1c306-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "performance-1c306",
  storageBucket: "performance-1c306.appspot.com",
  messagingSenderId: "674327477650",
  appId: "1:674327477650:web:9218f8a35c75b3d91d954b",
  measurementId: "G-N0GN3QFGSZ"
};