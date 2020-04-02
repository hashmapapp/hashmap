import * as ACTIONS from './constants';

export const authorization = key => {
  const role = 'productor';
  switch (key) {
    case ACTIONS.CREATE_HASHMAP_BUTTON: {
      console.log('CREATE_HASHMAP_BUTTON');
      return role === 'admin' || role === 'productor';
    }
    case ACTIONS.CREATE_HASHMAP: {
      console.log('CREATE_HASHMAP');
      return role === 'admin' || role === 'productor';
    }
    case ACTIONS.EDIT_HASHMAP_BUTTON: {
      console.log('EDIT_HASHMAP_BUTTON');
      return role === 'admin' || role === 'productor';
    }
    case ACTIONS.EDIT_HASHMAP: {
      console.log('EDIT_HASHMAP');
      return role === 'admin' || role === 'productor';
    }
    default:
      console.log(role);
      return false;
  }
};
