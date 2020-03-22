import * as ACTIONS from 'app/redux/actions/hashmapActions';
import produce from 'immer';

const STATE_CLEAN = { title: '', subtitle: '', description: '', posts: [] };

const HashmapReducer = (state = STATE_CLEAN, action) => {
  switch (action.type) {
    case ACTIONS.HASHMAP_UPDATE:
      return produce(state, draft => {
        draft.title = action.data.hashmap.title;
        draft.subtitle = action.data.hashmap.subtitle;
        draft.description = action.data.hashmap.description;
        draft.posts = action.data.posts;
      });
    case ACTIONS.HASHMAP_RESET:
      return STATE_CLEAN;
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
    case ACTIONS.HASHMAP_DELETE_POST: {
      return produce(state, draft => {
        const post = draft.posts.find(p => p.id === action.index);
        if (post) {
          const index = draft.posts.indexOf(post);
          draft.posts.splice(index, 1);
        }
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
      return { ...STATE_CLEAN };
  }
};

export default HashmapReducer;
