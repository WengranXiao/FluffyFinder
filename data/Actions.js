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
    // console.log("dispatching with user", authUser, user);
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
    dispatch({
      type: LOAD_USER_INFO,
      payload: {
        user: {
          displayName,
          contactEmail,
          contactPhone,
          profilePicUrl,
        },
      },
    });
  };
};

const saveProfilePic = async (pictureObject) => {
  const fileName = pictureObject.uri.split("/").pop();
  const currentPhotoRef = ref(storage, `images/${fileName}`);

  try {
    const response = await fetch(pictureObject.uri);

    const imageBlob = await response.blob();

    await uploadBytes(currentPhotoRef, imageBlob);

    const downloadURL = await getDownloadURL(currentPhotoRef);

    return downloadURL;
  } catch (e) {
    console.log("Error saving picture:", e);
  }
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

const addPost = async (
  breed,
  typeValue,
  location,
  reportTime,
  species,
  description,
  picList,
  author
) => {
  const docRef = await addDoc(collection(db, "PostList"), {
    breed: breed,
    species: species,
    description: description,
    postTime: reportTime,
    reportTime: reportTime,
    updateTime: reportTime,
    location: location,
    type: typeValue,
    resolved: false,
    author: author,
    pictures: picList,
  });
  const id = docRef.id;
  await updateDoc(doc(db, "PostList", id), { key: id });
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

const resolvePost = (item) => {
  return async (dispatch) => {
    await updateDoc(doc(db, "PostList", item.key), {
      resolved: true,
    });
    dispatch({
      type: UPDATE_POST,
      payload: {
        key: item.key,
        resolved: true,
      },
    });
  };
};

const updatePost = (
  key,
  breed,
  typeValue,
  location,
  reportTime,
  species,
  description,
  picList
) => {
  return async (dispatch) => {
    await updateDoc(doc(db, "PostList", key), {
      breed: breed,
      species: species,
      description: description,
      postTime: reportTime,
      reportTime: reportTime,
      updateTime: reportTime,
      location: location,
      type: typeValue,
      pictures: picList,
    });
    dispatch({
      type: UPDATE_POST,
      payload: {
        key: key,
        breed: breed,
        species: species,
        description: description,
        postTime: reportTime,
        reportTime: reportTime,
        updateTime: reportTime,
        location: location,
        type: typeValue,
        pictures: picList,
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
  resolvePost,
  updatePost,
  getPostAuthorInfo,
};
