import * as ACTIONS from '../constants/userConstants';

export const updateUserData = userData => ({
  type: ACTIONS.UPDATE_USER,
  userData,
});

export const resetUser = () => ({
  type: ACTIONS.RESET_USER,
});
