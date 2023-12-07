import { initializeApp } from "firebase/app";
import {
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
  orderBy,
  doc,
  getDocs,
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../Secrets";
import {
  LOAD_POSTS,
  ADD_POST,
  LOAD_USER_INFO,
  DELETE_POST,
  UPDATE_POST,
} from "./Reducer";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const addUser = (user) => {
  return async (dispatch) => {
    userToAdd = {
      email: user.email,
      key: user.uid,
    };
    await setDoc(doc(db, "users", user.uid), userToAdd);
  };
};

const loadUserInfo = (authUser) => {
  return async (dispatch) => {
    const userSnap = await getDoc(doc(db, "users", authUser.uid));
    const user = userSnap.data();
    console.log("dispatching with user", authUser, user);
    dispatch({
      type: LOAD_USER_INFO,
      payload: { user },
    });
  };
};

const updateUser = (user, updateInfo) => {
  const { displayName, contactEmail, contactPhone, profilePicUrl } = updateInfo;
  return async (dispatch) => {
    await updateDoc(doc(db, "users", user.uid), {
      displayName,
      contactEmail,
      contactPhone,
      profilePicUrl,
    });
  };
};

const saveProfilePic = (pictureObject) => {
  return async (dispatch, getState) => {
    const fileName = pictureObject.uri.split("/").pop();
    // this will be where we store the file in the cloud
    const currentPhotoRef = ref(storage, `images/${fileName}`);

    try {
      // fetch the image object (blob) from the local filesystem
      const response = await fetch(pictureObject.uri);

      // blob: binary large object
      const imageBlob = await response.blob();

      // then upload it to Firebase Storage
      await uploadBytes(currentPhotoRef, imageBlob);

      // get the URL
      const downloadURL = await getDownloadURL(currentPhotoRef);

      // create or add to the user's gallery
      const currentUser = getState().currentUser;
      return {
        ...pictureObject,
        uri: downloadURL,
      };
    } catch (e) {
      console.log("Error saving picture:", e);
    }
  };
};

const loadPosts = () => {
  return async (dispatch) => {
    let q = query(collection(db, "PostList"));
    onSnapshot(q, (querySnapshot) => {
      let newPosts = querySnapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        key: docSnap.id,
      }));

      dispatch({
        type: LOAD_POSTS,
        payload: {
          newPosts: newPosts.map((post) => ({
            ...post,
          })),
        },
      });
    });
  };
};

const addPost = (
  breed,
  typeValue,
  location,
  time,
  species,
  description,
  author
) => {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, "PostList"), {
      breed: breed,
      species: species,
      description: description,
      postTime: time,
      reportTime: time,
      updateTime: time,
      location: location,
      type: typeValue,
      resolved: false,
      author: author,
    });
    const id = docRef.id;
    await updateDoc(doc(db, "PostList", id), { key: id });
  };
};

const deletePost = (item) => {
  return async (dispatch) => {
    await deleteDoc(doc(db, "PostList", item.key));
    dispatch({
      type: DELETE_POST,
      payload: {
        key: item.key,
      },
    });
  };
};

const updatePost = (
  item,
  breed,
  typeValue,
  location,
  time,
  species,
  description
) => {
  return async (dispatch) => {
    await updateDoc(doc(db, "PostList", item.key), {
      breed: breed,
      species: species,
      description: description,
      postTime: time,
      reportTime: time,
      updateTime: time,
      location: location,
      type: typeValue,
    });
    dispatch({
      type: UPDATE_POST,
      payload: {
        key: item.key,
        breed: breed,
        species: species,
        description: description,
        postTime: time,
        reportTime: time,
        updateTime: time,
        location: location,
        type: typeValue,
      },
    });
  };
};

const getPostAuthorInfo = async (authorId) => {
  const userSnap = await getDoc(doc(db, "users", authorId));
  const user = userSnap.data();
  return user;
};

export {
  addUser,
  updateUser,
  saveProfilePic,
  loadPosts,
  addPost,
  loadUserInfo,
  deletePost,
  updatePost,
  getPostAuthorInfo,
};
