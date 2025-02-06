import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Подтянем твой интерфейс Post из того же места, где он у тебя описан
// либо продублируем и экспортируем отсюда. Предположим, что
// ты хочешь иметь всё в одном месте:
export interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
  date: string;
}

// Опишем интерфейс для комментария в Redux
export interface Comment {
  // Можно хранить id, если понадобится удалять комментарий по ID
  // или храним индекс — зависит от твоей логики.
  id: number;
  postId: number;
  name: string;
  text: string;
}

interface PostsState {
  posts: Post[];
  comments: Comment[];
}

const initialState: PostsState = {
  posts: [],
  comments: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Задача "загрузить посты с сервера" или "установить посты" (заменить полностью)
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },

    // Для слияния постов (чтобы не было дублей)
    appendPosts: (state, action: PayloadAction<Post[]>) => {
      const existingIds = new Set(state.posts.map((p) => p.id));
      const newData = action.payload.filter((p) => !existingIds.has(p.id));
      state.posts.push(...newData);
    },

    // Добавить пост вручную
    addPost: (state, action: PayloadAction<Post>) => {
      // По заданию «добавление поста». 
      // Можем делать unshift, чтобы оказывался в начале (как у тебя было)
      state.posts.unshift(action.payload);
    },

    // Удалить пост
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    // Добавить комментарий
    addComment: (
      state,
      action: PayloadAction<{
        postId: number;
        name: string;
        text: string;
      }>
    ) => {
      const newComment: Comment = {
        id: Date.now(), // генерируем id на лету
        ...action.payload,
      };
      state.comments.push(newComment);
    },

    // Удалить комментарий
    removeComment: (
      state,
      action: PayloadAction<number> // id комментария
    ) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const {
  setPosts,
  appendPosts,
  addPost,
  removePost,
  addComment,
  removeComment,
} = postsSlice.actions;

export default postsSlice.reducer;
