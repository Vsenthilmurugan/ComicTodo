import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../reducers/themeSlice';
import categoryReducer from '../reducers/CategorySlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    category:categoryReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
