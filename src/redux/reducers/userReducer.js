import * as ACTIONS from 'app/redux/constants/userConstants';
// import produce from 'immer';

const UserReducer = (state = undefined, action) => {
  switch (action.type) {
    case ACTIONS.USER_SIGN_IN: {
    }
    default:
      return undefined;
  }
};

export default UserReducer;
