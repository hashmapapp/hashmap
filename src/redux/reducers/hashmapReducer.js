import * as ACTIONS from 'app/redux/actions/hashmapActions';
import produce from 'immer';

const HashmapReducer = (
  state = { title: '', subtitle: '', description: '', posts: [] },
  action
) => {
  switch (action.type) {
    case ACTIONS.HASHMAP_UPDATE:
      return action.hashmap;
    case ACTIONS.HASHMAP_TITLE_UPDATE:
      return produce(state, draft => {
        draft.title = action.text;
      });
    case ACTIONS.HASHMAP_SUBTITLE_UPDATE:
      return produce(state, draft => {
        draft.subtitle = action.text;
      });
    case ACTIONS.HASHMAP_DESCRIPTION_UPDATE: {
      return produce(state, draft => {
        draft.description = action.text;
      });
    }
    case ACTIONS.HASHMAP_CREATE_POST: {
      return produce(state, draft => {
        draft.posts.push(action.post);
      });
    }
    case ACTIONS.HASHMAP_POST_TITLE_UPDATE: {
      return produce(state, draft => {
        draft.posts[action.idPost].title = action.text;
      });
    }
    case ACTIONS.HASHMAP_POST_SUBTITLE_UPDATE: {
      return produce(state, draft => {
        draft.posts[action.idPost].description = action.text;
      });
    }
    default:
      return { ...state };
  }
};

export default HashmapReducer;
