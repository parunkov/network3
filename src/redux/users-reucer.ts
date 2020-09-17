import {userAPI} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from '../types/types';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PGOGRESS = 'users/TOGGLE_IS_FOLLOWING_PGOGRESS';
const GET_FREDNDS = 'users/GET_FREDNDS';

const initialState = {
	users: [] as Array<UserType>,
	frends: [] as Array<UserType>,
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number>
}

type UsersStateType = typeof initialState;

const usersReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case FOLLOW: {
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
				frends: state.frends.filter(item => item.id !== action.userId)
			}
		}
		case UNFOLLOW: {
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
				frends: [...state.frends, {
					id: action.userId,
					name: state.users.filter(item => item.id === action.userId)[0].name,
					photo: state.users.filter(item => item.id === action.userId)[0].photos.small
				}]
			}
		}
		case SET_USERS: {
			return {
				...state,
				users: action.users
			}
		}
		case SET_CURRENT_PAGE: {
			return {
				...state,
				currentPage: action.currentPage
			}
		}
		case SET_TOTAL_USERS_COUNT: {
			return {
				...state,
				totalUsersCount: action.count
			}
		}
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching
			}
		}
		case TOGGLE_IS_FOLLOWING_PGOGRESS: {
			return {
				...state,
				followingInProgress: action.followingInProgress
				? [...state.followingInProgress, action.userId]
				: state.followingInProgress.filter(id => id !== action.userId)
			}
		}
		case GET_FREDNDS: {
			return {
				...state,
				...action.payload
			}
		}
		default:
			return state;
	}
}
type FollowSucsessActionType = {
	type: typeof FOLLOW,
	userId: number
}
export const followSucsess = (userId: number): FollowSucsessActionType => ({
	type: FOLLOW,
	userId
});

type UnfollowSucsessActionType = {
	type: typeof UNFOLLOW,
	userId: number
}
export const unfollowSucsess = (userId: number): UnfollowSucsessActionType => ({
	type: UNFOLLOW,
	userId
});

type SetUsersActionType = {
	type: typeof SET_USERS,
	users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
	type: SET_USERS,
	users
});

type SetCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
	type: SET_CURRENT_PAGE,
	currentPage
});

type SetTotalUsersCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT
	count: number
}
export const setTotalUsersCount = (count: number): SetTotalUsersCountActionType => ({
	type: SET_TOTAL_USERS_COUNT,
	count
});

type ToggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
	type: TOGGLE_IS_FETCHING,
	isFetching
});

export type ToggleFollowingInProgressActionType = {
	type: typeof TOGGLE_IS_FOLLOWING_PGOGRESS
	followingInProgress: boolean
	userId: number
}
export const toggleFollowingInProgress = (followingInProgress: boolean, userId: number): ToggleFollowingInProgressActionType => ({
	type: TOGGLE_IS_FOLLOWING_PGOGRESS,
	followingInProgress,
	userId
});

type GetFrendsActionType = {
	type: typeof GET_FREDNDS
	payload: {frends: Array<UserType>}
}
export const getFrends = (frends: Array<UserType>): GetFrendsActionType => ({
	type: GET_FREDNDS,
	payload: {frends}
});

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: Function) => {
	dispatch(toggleIsFetching(true));
	const data = await userAPI.getUser(currentPage, pageSize);
	dispatch(toggleIsFetching(false));
	dispatch(setUsers(data.items));
	dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (userId: number, dispatch: Function, apiMethod: any, actionCreator: any) => {
	dispatch(toggleFollowingInProgress(true, userId));
	const data = await apiMethod(userId);
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingInProgress(false, userId));
}

export const follow = (userId: number) => async (dispatch: Function) => {
	followUnfollowFlow(userId, dispatch, userAPI.follow.bind(userAPI), unfollowSucsess);
}

export const unfollow = (userId: number) => async (dispatch: Function) => {
	followUnfollowFlow(userId, dispatch, userAPI.unfollow.bind(userAPI), followSucsess);
}

export default usersReducer;

