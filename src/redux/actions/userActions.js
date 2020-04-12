import * as ACTIONS from '../constants/userConstants';

export const userSignUp = id => ({
  type: ACTIONS.USER_SIGN_UP,
  id,
});

export const userSignIn = (name, password) => ({
  type: ACTIONS.USER_SIGN_IN,
  name,
  password,
});
