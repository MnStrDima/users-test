import { createSelector } from '@reduxjs/toolkit';

export const getAllUsers = state => state.users.items;
export const getAllUpdatedUsers = state => state.users.updatedItems;
export const getFilter = state => state.users.filter;
export const getLoading = state => state.users.isLoading;
export const getErrorMessage = state => state.users.error;

export const getVisibleUsers = createSelector(
    [getAllUsers, getFilter],
    (allUsers, filter) => {
        const normalizedFilter = filter.toLowerCase();

        return allUsers.filter(({ name }) =>
            name.toLowerCase().includes(normalizedFilter),
        );
    },
);

export const getUsersLength = state => {
    const allUsers = getAllUsers(state);
    return allUsers.length;
};