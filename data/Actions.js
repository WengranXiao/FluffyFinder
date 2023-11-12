import { initializeApp } from "firebase/app";
import {
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
  doc,
  getDocs,
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { firebaseConfig } from "../Secrets";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addUser = (user) => {
  return async (dispatch) => {
    userToAdd = {
      displayName: user.displayName,
      email: user.email,
      key: user.uid,
    };
    await setDoc(doc(db, "users", user.uid), userToAdd);
  };
};

export { addUser };
