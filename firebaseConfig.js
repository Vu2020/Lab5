import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAbvzAWaWiDW3jVcad5bctKkWVOCGFI_Ak",
  authDomain: "fir-6c2e6.firebaseapp.com",
  projectId: "fir-6c2e6",
  storageBucket: "fir-6c2e6.appspot.com",
  messagingSenderId: "973681125939",
  appId: "1:973681125939:web:ac09cd0cf5203596055146",
  measurementId: "G-0D6SQF35EN"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);