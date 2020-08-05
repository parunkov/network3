import React from 'react';
import styles from './Users.module.css';
import userPhoto from './../../assets/images/i.webp';
import {NavLink} from 'react-router-dom';
import FollowButton from '../common/Button/FollowButton';

const User = ({user, followingInProgress, unfollow, follow}) => {
	return (
		<div className="">
			<span>
				<div>
					<NavLink to={"/profile/" + user.id}>
						<img className={styles.userPhoto} src={user.photos.small != null ? user.photos.small : userPhoto} alt="fff" />
					</NavLink>
				</div>
				<FollowButton followed={user.followed} userId={user.id} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} />
			</span>
			<span>
				<span>
					<div className="">{user.name}</div>
					<div className="">{user.status}</div>
				</span>
				{/*<span>
					<div className="">{"user.location.city"}</div>
					<div className="">{"user.location.country"}</div>
				</span>*/}
			</span>
		</div>
	);
}

export default User;