import * as ACTIONS from 'app/redux/constants/hashmapConstants';
import produce from 'immer';
import shortid from 'shortid';

const STATE_CLEAN = {
  key: '',
  author: '',
  title: '',
  subtitle: '',
  description: '',
  imagePath: '',
  imageUrl: '',
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
        draft.imagePath = action.data.hashmap.imagePath;
        draft.imageUrl = action.data.hashmap.imageUrl;
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
    case ACTIONS.HASHMAP_IMAGE_UPDATE: {
      return produce(state, draft => {
        draft.imagePath = action.path;
        draft.imageUrl = action.url;
      });
    }
    case ACTIONS.HASHMAP_CREATE_POST: {
      return produce(state, draft => {
        action.post.key = '_'.concat(shortid.generate());
        draft.posts.push(action.post);
      });
    }
    case ACTIONS.HASHMAP_DELETE_POST: {
      return produce(state, draft => {
        const post = draft.posts.find(p => p.key === action.key);
        if (post) {
          const index = draft.posts.indexOf(post);
          draft.posts[index].key = `DELETE?key=${post.key}`;
        }
      });
    }
    case ACTIONS.HASHMAP_POST_TITLE_UPDATE: {
      return produce(state, draft => {
        const post = draft.posts.find(p => p.key === action.key);
        if (post) {
          const index = draft.posts.indexOf(post);
          draft.posts[index].title = action.text;
        }
      });
    }
    case ACTIONS.HASHMAP_POST_SUBTITLE_UPDATE: {
      return produce(state, draft => {
        const post = draft.posts.find(p => p.key === action.key);
        if (post) {
          const index = draft.posts.indexOf(post);
          draft.posts[index].description = action.text;
        }
      });
    }
    case ACTIONS.HASHMAP_POST_IMAGE_UPDATE: {
      return produce(state, draft => {
        const post = draft.posts.find(p => p.key === action.key);
        if (post) {
          const index = draft.posts.indexOf(post);
          draft.posts[index].imagePath = action.path;
          draft.posts[index].imageUrl = action.url;
        }
      });
    }
    default:
      return { ...STATE_CLEAN };
  }
};

export default HashmapReducer;
