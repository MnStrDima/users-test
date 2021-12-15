import axios from 'axios';
import {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersError,
    addUserRequest,
    addUserSuccess,
    addUserError,
    updateUserRequest,
    updateUserSuccess,
    updateUserError,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserError,
    errorRemover,
} from './users-actions';

const resetError = dispatch =>
    setTimeout(() => dispatch(errorRemover(null)), 3000);

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

const fetchUsers = () => async dispatch => {
    dispatch(fetchUsersRequest());

    try {
        const { data } = await axios.get('/users');
        return dispatch(fetchUsersSuccess(data));
    } catch (error) {
        dispatch(fetchUsersError(error.message));
        resetError(dispatch);
    }
};

const addUser = userObj => async dispatch => {
    dispatch(addUserRequest());

    try {
        const { data } = await axios.post('/users', userObj);
        return dispatch(addUserSuccess(data));
    } catch (error) {
        dispatch(addUserError(error.message));
        resetError(dispatch);
    }
};

const updateUser = userObj => async dispatch => {
    dispatch(updateUserRequest());
    const { id } = userObj;
    try {
        const { data } = await axios.patch(`/users/${id}`, userObj);
        console.log(data);
        return dispatch(updateUserSuccess(data));
    } catch (error) {
        dispatch(updateUserError(error.message));
        resetError(dispatch);
    }
};

const deleteUser = userId => async dispatch => {
    dispatch(deleteUserRequest());

    try {
        await axios.delete(`/users/${userId}`);
        return dispatch(deleteUserSuccess(userId));
    } catch (error) {
        dispatch(deleteUserError(error.message));
        resetError(dispatch);
    }
};

const usersOperations = { addUser, updateUser, deleteUser, fetchUsers };

export default usersOperations;