import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import usersReducer from './users/users-reducers';

const usersPersistConfig = {
    key: 'users',
    storage,
};

const middleware = (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(logger);


const store = configureStore({
    reducer: {
        users: persistReducer(usersPersistConfig, usersReducer),
    },
    middleware,
    devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

const storeObject = { store, persistor };

export default storeObject;