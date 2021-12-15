import { createAction } from '@reduxjs/toolkit';
import types from './users-constants';

export const fetchUsersRequest = createAction(types.fetchRequest);
export const fetchUsersSuccess = createAction(types.fetchSuccess);
export const fetchUsersError = createAction(types.fetchError);

export const addUserRequest = createAction(types.addRequest);
export const addUserSuccess = createAction(types.addSuccess);
export const addUserError = createAction(types.addError);

export const updateUserRequest = createAction(types.updateRequest);
export const updateUserSuccess = createAction(types.updateSuccess);
export const updateUserError = createAction(types.updateError);

export const deleteUserRequest = createAction(types.deleteRequest);
export const deleteUserSuccess = createAction(types.deleteSuccess);
export const deleteUserError = createAction(types.deleteError);

export const changeFilter = createAction(types.changeFilter);
export const errorRemover = createAction(types.errorRemove);