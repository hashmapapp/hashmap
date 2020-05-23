import * as ACTIONS from 'app/redux/constants/userConstants';
import produce from 'immer';

const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_USER: {
      return produce(state, draft => {
        draft.diplayName = action.userData.displayName;
        draft.email = action.userData.email;
        draft.role = action.userData.role;
        draft.username = action.userData.username;
        draft.uid = action.userData.uid;
      });
    }
    case ACTIONS.RESET_USER: {
      console.log('RESET_USER');
      return {};
    }
    default:
      return state;
  }
};

export default UserReducer;
