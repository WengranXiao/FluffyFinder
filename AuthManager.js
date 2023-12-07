import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as fbSignOut,
  initializeAuth,
  getReactNativePersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./Secrets";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { loadUserInfo } from "./data/Actions";

let app, auth;
// this guards against initializing more than one "App"
const apps = getApps();
if (apps.length == 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (error) {
  auth = getAuth(app); // if auth already initialized
}

const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const signOut = async () => {
  await fbSignOut(auth);
};

const signUp = async (email, password, dispatch) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred.user;
};

const getAuthUser = () => {
  return auth.currentUser;
};

let unsubscribeFromAuthChanges = undefined;

const subscribeToAuthChanges = (navigation, dispatch) => {
  if (unsubscribeFromAuthChanges) {
    unsubscribeFromAuthChanges();
  }
  unsubscribeFromAuthChanges = onAuthStateChanged(auth, (authUser) => {
    if (authUser?.displayName) {
      dispatch(loadUserInfo(authUser));
      navigation.replace("Main");
    } else {
      navigation.navigate("Login", { loginMode: true });
    }
  });
};

export { signIn, signOut, signUp, getAuthUser, subscribeToAuthChanges };
