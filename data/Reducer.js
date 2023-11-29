const LOAD_LOST_POSTS = "LOAD_LOST_POSTS";
const LOAD_USER_INFO = "LOAD_USER_INFO";

const initialState = {
  lostPosts: [],
  user: {},
};

const loadLostPosts = (state, items) => {
  return {
    ...state,
    lostPosts: [...items],
  };
};

const loadUserInfo = (state, user) => {
  return {
    ...state,
    user,
  };
};

function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_LOST_POSTS:
      return loadLostPosts(state, payload.newLostPosts);
    case LOAD_USER_INFO:
      return loadUserInfo(state, payload.user);
    default:
      return state;
  }
}
export { rootReducer, LOAD_LOST_POSTS, LOAD_USER_INFO };
