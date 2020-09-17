import React from 'react';
import {
		follow, 
		unfollow, 
		setCurrentPage, 
		getUsers,
		getFrends
	} from './../../redux/users-reucer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from './../../components/common/Preloader/Preloader';
import {getUsersSelector, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from '../../redux/users-selectors';
import {UserType} from '../../types/types';
import {AppStateType} from '../../redux/redux-store';

type PropsType = {
	currentPage: number
	pageSize: number
	frends: Array<UserType>
	users: Array<UserType>
	isFetching: boolean
	totalUsersCount: number
	followingInProgress: Array<number>
	getUsers: (currentPage: number, pageSize: number) => void
	getFrends: (savedFrends: Array<string>) => void
	setCurrentPage: (pageNumber: number) => void
	follow: () => void
	unfollow: () => void
	toggleFollowingInProgress: () => void
}

class UsersContainer extends React.Component<PropsType> {

	componentDidMount() {
		const {currentPage, pageSize} = this.props;
		this.props.getUsers(currentPage, pageSize);
		const savedFrends = JSON.parse(localStorage.getItem('frends') as string);
	    this.props.getFrends(savedFrends ? savedFrends : []);
	}

	onPageChanged = (pageNumber: number) => {
		const {setCurrentPage, getUsers, pageSize} = this.props;
		setCurrentPage(pageNumber);
		getUsers(pageNumber, pageSize);
	}

	componentDidUpdate(prevProps: PropsType) {
		if (this.props.frends !== prevProps.frends) {
			localStorage.setItem('frends', JSON.stringify(this.props.frends));
		}
	}

	render() {

		return <div>
			{this.props.isFetching ? <Preloader /> : null}
			<Users 
				totalItemsCount={this.props.totalUsersCount} 
				pageSize={this.props.pageSize} 
				currentPage={this.props.currentPage} 
				onPageChanged={this.onPageChanged} 
				users={this.props.users} 
				follow={this.props.follow} 
				unfollow={this.props.unfollow} 
				//@ts-ignore
				toggleFollowingInProgress={this.props.toggleFollowingInProgress} 
				followingInProgress={this.props.followingInProgress} 
			/>
		</div>
	}
}
const mapStateToProps = (state: AppStateType) => {
	return {
		users: getUsersSelector(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
		frends: state.usersPage.frends
	}
}
//@ts-ignore
export default connect(mapStateToProps, {follow, unfollow, setCurrentPage, getUsers, getFrends})(UsersContainer);