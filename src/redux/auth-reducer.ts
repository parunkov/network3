import {userAPI, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_INITIALIZED = 'auth/SET_INITIALIZED';
const GET_CAPTCHA_URL_SUCSESS = 'auth/GET_CAPTCHA_URL_SUCSESS';

type AuthStateType = {
  initialized: boolean
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  isFetching: boolean
  captchaUrl: string | null
}

const initialState: AuthStateType = {
  initialized: false,
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null
}

const authReducer = (state: AuthStateType = initialState, action: any): AuthStateType => {
  switch (action.type) {
    case SET_INITIALIZED: {
      return {
        ...state,
        initialized: true
      }
    }
    case SET_USER_DATA: 
    case GET_CAPTCHA_URL_SUCSESS: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state;
  }
}

type InitializedSucsessActionType = {
  type: typeof SET_INITIALIZED
}

export const initializedSucsess = (): InitializedSucsessActionType => ({type: SET_INITIALIZED});

type SetAuthUserDataActionPayloadType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
  type: SET_USER_DATA, 
  payload: {id, email, login, isAuth, captchaUrl: null}});

type GetCaptchaUrlSucsessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCSESS
  payload: {captchaUrl: string}
}

export const getCaptchaUrlSucsess = (captchaUrl: string): GetCaptchaUrlSucsessActionType => ({
  type: GET_CAPTCHA_URL_SUCSESS,
  payload: {captchaUrl}
});

export const initializeApp = () => (dispatch: Function) => {
  const dispatchResult = dispatch(checkLogin());
  dispatchResult.then(() => {
    dispatch(initializedSucsess());
  });
}

export const checkLogin = () => async (dispatch: Function) => {
  const data = await userAPI.checkLogin();
  if (data.resultCode === 0) {
    const {id, login, email} = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
}

export const login = (email: string, password: string, rememberMe: any, captcha: any) => async (dispatch: Function) => {
  const data = await userAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    dispatch(checkLogin());
  } else { 
    if (data.resultCode === 10) {
       dispatch(getCaptchaUrl());
    }
    const message = data.messages.length > 0 ? data.messages[0] : "Email or password is wrong";
    dispatch(stopSubmit("login", {_error: message}));
  }
}

export const logout = () => async (dispatch: Function) => {
  const data = await userAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export const getCaptchaUrl = () => async (dispatch: Function) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSucsess(captchaUrl));
}

export default authReducer;