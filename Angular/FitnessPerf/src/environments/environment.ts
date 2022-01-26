// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  USER_DATA: 'performances_dev',
  // @delayFirebase : https://stackoverflow.com/questions/70829329/angular-firebase-missing-or-insufficient-permissions-on-page-refresh
  delayFirebase: 500
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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
