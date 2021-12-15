import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
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
    changeFilter,
    errorRemover,
} from './users-actions';

const initialState = {
    users: {
        items: [],
        filter: '',
        isLoading: false,
        error: '',
    },
};

const items = createReducer(initialState.users.items, {
    [fetchUsersSuccess]: (_, { payload }) => payload,
    [addUserSuccess]: (state, { payload }) => [...state, payload],
    [updateUserSuccess]: (state, { payload }) =>
        state.forEach(user => (user.id === payload.id ? payload : user)),
    [deleteUserSuccess]: (state, { payload }) =>
        state.filter(({ id }) => id !== payload),
});

const filter = createReducer(initialState.users.filter, {
    [changeFilter]: (_, { payload }) => payload,
});

const isLoading = createReducer(initialState.users.isLoading, {
    [updateUserRequest]: () => true,
    [updateUserSuccess]: () => false,
    [updateUserError]: () => false,
    [fetchUsersRequest]: () => true,
    [fetchUsersSuccess]: () => false,
    [fetchUsersError]: () => false,
    [addUserRequest]: () => true,
    [addUserSuccess]: () => false,
    [addUserError]: () => false,
    [updateUserRequest]: () => true,
    [updateUserSuccess]: () => false,
    [updateUserError]: () => false,
    [deleteUserRequest]: () => true,
    [deleteUserSuccess]: () => false,
    [deleteUserError]: () => false,
});

const error = createReducer(initialState.users.error, {
    [fetchUsersError]: (_, { payload }) => payload,
    [addUserError]: (_, { payload }) => payload,
    [deleteUserError]: (_, { payload }) => payload,
    [updateUserError]: (_, { payload }) => payload,
    [errorRemover]: (_, { payload }) => payload,
});

export default combineReducers({
    items,
    filter,
    isLoading,
    error,
});