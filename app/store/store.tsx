import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import categoryReducer from './CategorySlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    category:categoryReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
