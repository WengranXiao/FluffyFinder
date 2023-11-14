const LOAD_LOST_POSTS = "LOAD_LOST_POSTS";

const initialState = {
  users: [],
  lostPosts: [],
};

const loadLostPosts = (state, items) => { 
  return {
    ...state,
    lostPosts: [...items]
  }
};

function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type){
    case LOAD_LOST_POSTS:
      return loadLostPosts(state, payload.newLostPosts);
    default:
      return state;
  }
}
export { rootReducer, LOAD_LOST_POSTS };
