import * as ACTIONS from 'app/redux/actions/hashmapActions';
import produce from 'immer';

const STATE_CLEAN = {
  key: '',
  author: '',
  title: '',
  subtitle: '',
  description: '',
  image: '',
  textImage: '',
  createIn: '',
  updateIn: '',
  posts: [],
};

const HashmapReducer = (state = STATE_CLEAN, action) => {
  switch (action.type) {
    case ACTIONS.HASHMAP_UPDATE: {
      return produce(state, draft => {
        draft.key = action.data.hashmap.key;
        draft.author = action.data.hashmap.author;
        draft.title = action.data.hashmap.title;
        draft.subtitle = action.data.hashmap.subtitle;
        draft.description = action.data.hashmap.description;
        draft.image = action.data.hashmap.image;
        draft.textImage = action.data.hashmap.textImage;
        draft.createIn = action.data.hashmap.createIn;
        draft.updateIn = action.data.hashmap.updateIn;
        draft.posts = action.data.posts;
      });
    }
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
        action.post.temporaryKey = '_'.concat(
          Math.random()
            .toString(36)
            .substr(2, 9)
        );
        draft.posts.push(action.post);
      });
    }
    case ACTIONS.HASHMAP_DELETE_POST: {
      return produce(state, draft => {
        const post = draft.posts.find(
          p => p.temporaryKey === action.temporaryKey
        );
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
