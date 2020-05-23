import * as ACTIONS from './constants';

export const authorization = (key, roleStorage) => {
  const role = roleStorage;
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
    case ACTIONS.ADD_HOME_HASHMAP: {
      return role === 'admin';
    }
    default:
      return false;
  }
};
