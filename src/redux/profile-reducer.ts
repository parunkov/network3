import {profileAPI, userAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {PostsDataItemType, PhotosType, ProfileType} from '../types/types';

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_STATUS ='profile/SET-STATUS';
const DELETE_POST = 'profile/DELETE-POST';
const SAVE_PHOTO_SUCSESS = 'profile/SAVE_PHOTO_SUCSESS';
const SET_FOLLOWING = 'profile/SET_FOLLOWING';

const postsData: Array<PostsDataItemType> = [
		{id: 1, text: 'Magni quam optio laborum ad ipsa ab tempore necessitatibus explicabo delectus.', likesCount: 12},
		{id: 2, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", likesCount: 11}
	]
const initialState = {
	postsData: postsData,
	newPostText: '',
	profile: null as null | ProfileType,
	status: "",
	isFollow: false
}

type ProfileStateType = typeof initialState;

const profileReducer = (state: ProfileStateType = initialState, action: any): ProfileStateType => {
	switch (action.type) {
		case ADD_POST: {
			return {
				...state,
				postsData: [...state.postsData, {
					id: (state.postsData.length + 1),
					text: action.newText,
					likesCount: 0
				}],
				newPostText: ''
			};
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile
			}
		}
		case SET_STATUS: {
			return {
				...state,
				status: action.status
			}
		}
		case DELETE_POST: {
			return {
				...state,
				postsData: state.postsData.filter(p => p.id !== action.postId)
			}
		}
		case SAVE_PHOTO_SUCSESS: {
			return {
				...state,
				profile: {
					...state.profile,
					photos: action.photos
				} as ProfileType
			}
		}
		case SET_FOLLOWING: {
			return {
				...state,
				isFollow: action.isFollow
			}
		}
		default:
			return state;
	}
}

type AddPostActionType = {
	type: typeof ADD_POST
	newText: string
}
export const addPostActionCreator = (text: string): AddPostActionType => ({
	type: ADD_POST,
	newText: text
});
type SetUserProfileActyonType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActyonType => ({
	type: SET_USER_PROFILE,
	profile
});
type SetStatusActionType = {
	type: typeof SET_STATUS
	status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
	type: SET_STATUS,
	status
});
type DeletePostActionType = {
	type: typeof DELETE_POST
	postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({
	type: DELETE_POST,
	postId
});
type SavePhotoSucsessActionType = {
	type: typeof SAVE_PHOTO_SUCSESS
	photos: PhotosType
}
export const savePhotoSucsess = (photos: PhotosType): SavePhotoSucsessActionType => ({
	type: SAVE_PHOTO_SUCSESS, 
	photos
});
type SetFollowingActionType = {
	type: typeof SET_FOLLOWING
	isFollow: boolean
}
const setFollowing = (isFollow: boolean): SetFollowingActionType => ({
	type: SET_FOLLOWING,
	isFollow
})

export const getFollowing = (userId: number) => async (dispatch: Function) => {
	const isFollow = await userAPI.checkFollowing(userId);
	dispatch(setFollowing(isFollow));
}
export const getProfile = (userId: number) => async (dispatch: Function) => {
	const data = await profileAPI.getProfile(userId);
	dispatch(setUserProfile(data));
}
export const getStatus = (userId: number) => async (dispatch: Function) => {
	const response = await profileAPI.getStatus(userId);
	dispatch(setStatus(response.data));
}
export const updateStatus = (status: string) => async (dispatch: Function) => {
	try {
		const response = await profileAPI.updateStatus(status);
		if (response.resultCode === 0) {
			dispatch(setStatus(status));
		}
	} catch(error) {
		// debugger;
	}
}
export const savePhoto = (file: any) => async (dispatch: Function) => {
	const response = await profileAPI.savePhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSucsess(response.data.data.photos));
	}
}
export const saveProfile = (profile: ProfileType) => async (dispatch: Function, getState: Function) => {
	const userId = getState().auth.id;
	const response = await profileAPI.saveProfile(profile);
	if (response.data.resultCode === 0) {
		dispatch(getProfile(userId));
	} else {
		dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
		return Promise.reject({error: response.data.messages[0]});
	}
}

export default profileReducer;