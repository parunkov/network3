import {profileAPI} from '../api/api';

const ADD_MESSAGE = 'messages/ADD-MESSAGE';
const ADD_MESSAGES_PHOTO = 'messages/ADD_MESSAGES_PHOTO';

const data = ['Michael', 'David', 'Emily', 'Samuel', 'Rachel'];
type DialogsDataItem = {
	id: number
	name: string
}
const dialogsData: Array<DialogsDataItem> = [];
for (let i = 0; i < data.length; i++) {
	dialogsData[i] = {id: 0, name: ''};
	dialogsData[i].id = i + 1;
	dialogsData[i].name = data[i];
}
const messages = ['Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'Rem molestiae consectetur, quibusdam maxime veniam sit eius harum recusandae, natus possimus aperiam non accusantium quod, deserunt asperiores similique repellat nisi vitae voluptatibus.', 'Ipsam odio, modi sed! Rerum expedita, quos molestiae cum modi placeat, rem explicabo assumenda repellat itaque quis, dolor numquam.'];
type MessagesDataItem = {
	id: number
	message: string
}
const messagesData: Array<MessagesDataItem> = [];
for (let i = 0; i < messages.length; i++) {
	messagesData[i] = {id: 0, message: ''};
	messagesData[i].id = i + 1;
	messagesData[i].message = messages[i];
}

type MessagesStateType = {
	dialogsData: Array<DialogsDataItem>
	messagesData: Array<MessagesDataItem>
	messagesPhoto: string | null
}

const initialState: MessagesStateType = {
	dialogsData: dialogsData,
	messagesData: messagesData,
	messagesPhoto: null
}

const messagesReducer = (state = initialState, action: any): MessagesStateType => {
	switch (action.type) {
		case ADD_MESSAGE: {
			return {
				...state,
				messagesData: [...state.messagesData, {
					id: (state.messagesData.length + 1),
					message: action.newMessageText
				}]
			};
		}
		case ADD_MESSAGES_PHOTO: {
			return {
				...state,
				...action.payload
			}
		}
		default:
			return state;
	}
}

type AddMessageActionType = {
	type: typeof ADD_MESSAGE
	newMessageText: string
}
export const addMessage = (message: string): AddMessageActionType => ({
	type: ADD_MESSAGE,
	newMessageText: message
});

type AddMessagesPhotoActionType = {
	type: typeof ADD_MESSAGES_PHOTO
	payload: {messagesPhoto: string}
}
const addMessagesPhoto = (messagesPhoto: string): AddMessagesPhotoActionType =>({
	type: ADD_MESSAGES_PHOTO,
	payload: {messagesPhoto}
});

export const getMessagesPhoto = (userId: number) => async (dispatch: Function) => {
	const data = await profileAPI.getProfile(userId);
	dispatch(addMessagesPhoto(data.photos.small));
}

export default messagesReducer;