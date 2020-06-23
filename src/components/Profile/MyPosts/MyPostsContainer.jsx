import {addPostActionCreator, updateNewPostTextActionCreator} from './../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		postsData: state.profile.postsData,
		newPostText: state.profile.newPostText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: () => {
			dispatch(addPostActionCreator());
		},
		updateNewPostText: (text) => {
			dispatch(updateNewPostTextActionCreator(text));
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;