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
import { LOAD_LOST_POSTS } from "./Reducer";

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

const loadLostPosts = () => {
  return async (dispatch) => {
    let q = query(collection(db, "LostPosts") );
    onSnapshot(q, (querySnapshot) => {
      let newLostPosts = querySnapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        key: docSnap.id,
      }));

      dispatch({
        type: LOAD_LOST_POSTS,
        payload: {
          newLostPosts: newLostPosts,
        },
      });
    });
  };
}
export { addUser, loadLostPosts };
