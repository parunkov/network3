const ADD_NEWS = 'news/ADD_NEWS';

type NewsType = {
	id: number
	date: Date
	title: string
	text: string
}

type NewsStateType = {
	news: Array<NewsType>
}

const initialState: NewsStateType = {
	news: [
		{id: 1, date: new Date(2020, 7, 3, 13, 28), title: 'Lorem ipsum dolor sit amet', text:  'Illo iusto placeat aliquid tempore harum similique, quo deleniti, velit eum labore est a consectetur aut cum. Hic quo nobis aspernatur, iste ut voluptate voluptatum repudiandae! Aut architecto, eligendi, repellat asperiores voluptatibus odio deserunt dignissimos, dicta laudantium voluptatem minima praesentium sed tempore.'}
	]
}


const newsReducer = (state: NewsStateType = initialState, action: any) => {
	switch (action.type) {
		case ADD_NEWS: {
			return {
				...state,
				news: [ ...state.news,
				{
					id: (state.news.length + 1),
					date: action.date,
					title: action.title,
					text: action.text
				}]
			}
		}
		default:
			return state;
	}
}

type AddNewsActionType = {
	type: typeof ADD_NEWS
	date: Date
	title: string
	text: string
}

export const addNews = (date: Date, title: string, text: string): AddNewsActionType => ({
	type: ADD_NEWS,
	date,
	title,
	text
});

export default newsReducer;