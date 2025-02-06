import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer, // наше имя редьюсера
  },
});

// Типы для useDispatch, useSelector, если используешь TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Подпишемся на изменение store, чтобы логгировать (как в задании)
store.subscribe(() => {
  console.log('[STORE UPDATED]', store.getState());
});
