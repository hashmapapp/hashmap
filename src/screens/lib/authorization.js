import * as ACTIONS from './constants';

export const authorization = key => {
  const role = 'default';
  switch (key) {
    case ACTIONS.CREATE_HASHMAP_BUTTON: {
      return role === 'admin' || role === 'productor';
    }
    case ACTIONS.CREATE_HASHMAP: {
      return role === 'admin' || role === 'productor';
    }
    case ACTIONS.EDIT_HASHMAP_BUTTON: {
      return role === 'admin' || role === 'productor';
    }
    case ACTIONS.EDIT_HASHMAP: {
      return role === 'admin' || role === 'productor';
    }
    default:
      return false;
  }
};
