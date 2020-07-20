export const getUsersSelector = (state) => {
	return state.usersPage.users;
}

export const getPageSize = (state) => {
	return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
	return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
	return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
	return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
	return state.usersPage.followingInProgress;
}


		// totalUsersCount: state.usersPage.totalUsersCount,
		// currentPage: state.usersPage.currentPage,
		// isFetching: state.usersPage.isFetching,
		// followingInProgress: state.usersPage.followingInProgress