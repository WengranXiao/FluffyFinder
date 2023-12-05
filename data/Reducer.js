const LOAD_POSTS = "LOAD_POSTS";
const LOAD_USER_INFO = "LOAD_USER_INFO";
const ADD_POST = "ADD_POST";
const DELETE_POST = 'DELETE_POST';
const UPDATE_POST = 'UPDATE_POST';

const initialState = {
  user: [],
  posts: [],
};

const loadPosts = (state, items) => {
  return {
    ...state,
    posts: items,
  };
};

const loadUserInfo = (state, user) => {
  return {
    ...state,
    user,
  };
};

const addPost = (
  state,
  breed,
  time,
  typeValue,
  location,
  species,
  description,
  key
) => {
  let { posts } = state;
  let newposts = posts.concat({
    key: key,
    breed: breed,
    postTime: time,
    reportTime: time,
    updateTime: time,
    species: species,
    description: description,
    location: location,
    type: typeValue,
    resolved: false,
  });
  return {
    ...state,
    posts: newposts,
  };
};

const deletePost = (state, itemId) => {
  let { posts } = state; 
  let newPosts = posts.filter(elem => elem.key !== itemId);
  return {
    ...state, 
    posts: newPosts  
  }
}
const updatePost = (state, itemId, breed, typeValue, location, time, species, description) => {
  let { posts } = state;
  let newPost = {
    key: itemId, 
    breed: breed,
    species: species,
    description: description,
    postTime: time,
    reportTime: time,
    updateTime: time,
    location: location,
    type: typeValue,
  };
  let newPosts = posts.map(elem=>elem.key===itemId?newPost:elem);
  return {
    ...state, 
    posts: newPosts
  };
}

function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POSTS:
      return loadPosts(state, payload.newPosts);
    case LOAD_USER_INFO:
      return loadUserInfo(state, payload.user);
    case ADD_POST:
      return addPost(
        state,
        payload.postTime,
        payload.reportTime,
        payload.updateTime,
        payload.location,
        payload.breed,
        payload.typeValue,
        payload.species,
        payload.description,
        payload.key,
        payload.resolved
      );
    case DELETE_POST:
      return deletePost(state, payload.key);
    case UPDATE_POST:
      return updatePost(
        state,
        payload.key,
        payload.breed,
        payload.typeValue,
        payload.location,
        payload.time,
        payload.species,
        payload.description
      );

    default:
      return state;
  }
}
export { rootReducer, LOAD_POSTS, ADD_POST, LOAD_USER_INFO, DELETE_POST, UPDATE_POST };
