const LOAD_POSTS = "LOAD_POSTS";
const LOAD_USER_INFO = "LOAD_USER_INFO";
const ADD_POST = "ADD_POST";

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
  let { listItems } = state;
  let newListItems = listItems.concat({
    key: key,
    breed: breed,
    postTime: time,
    reportTime: time,
    updateTime: time,
    species: species,
    description: description,
    location: location,
    type: typeValue,
  });
  return {
    ...state,
    listItems: newListItems,
  };
};

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
        payload.key
      );

    default:
      return state;
  }
}
export { rootReducer, LOAD_POSTS, ADD_POST, LOAD_USER_INFO };
