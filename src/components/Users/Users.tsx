import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './Users.module.scss';
import {UserType} from '../../types/types';

type PropsType = {
	totalItemsCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	users: Array<UserType>
	followingInProgress: Array<number>
	unfollow: () => void
	follow: () => void
}

const Users: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
		return (

			<div className={styles.usersWrapper}>
				<Paginator 
					totalItemsCount={totalItemsCount} 
					pageSize={pageSize} 
					currentPage={currentPage} 
					onPageChanged={onPageChanged} 
				/>
				<div className={styles.users}>{
						users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow} />)
					}</div>
			</div>
		);
}

export default Users;