import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());

	const userIds = _.uniq(_.map(getState().post, 'userId'))
	userIds.forEach(id => dispatch(fetchUser(id)))
}
export const fetchPosts = () => async (dispatch) => {
	const res = await jsonPlaceholder.get('/posts')
		
	dispatch({ type: 'FETCH_POSTS', payload: res.data })
};

export const fetchUser = (id) => async (dispatch) => {
	const res = await jsonPlaceholder.get(`/users/${id}`)
		
	dispatch({ type: 'FETCH_USER', payload: res.data })	
};

// Memoize version of solving overfetching data

// export const fetchUser = (id) => (dispatch) => {
// 	_fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
// 	const res = await jsonPlaceholder.get(`/users/${id}`)
		
// 	dispatch({ type: 'FETCH_USER', payload: res.data })
// })

// we use async and await because api response
// is slower than redux reducers/actions 