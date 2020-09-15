import {checkLogin} from './auth-reducer';

const SET_INITIALIZED ='SET_INITIALIZED';

export type AppStateType = {
  initialized: boolean
}

const initialState: AppStateType = {
  initialized: false
}

const appReducer = (state: AppStateType = initialState, action: any): AppStateType => {
  switch (action.type) {
    case SET_INITIALIZED: {
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state;
  }
}

export type InitializedSucsessActionType = {
  type: typeof SET_INITIALIZED
}

export const initializedSucsess = (): InitializedSucsessActionType => ({type: SET_INITIALIZED});

export const initializeApp = () => (dispatch: Function) => {
  const dispatchResult = dispatch(checkLogin());
  dispatchResult.then(() => {
    dispatch(initializedSucsess());
  });
}

export default appReducer;