import ky from 'ky/umd'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { PAGE_LIMIT, API_URL } from '../constants'
import Post from '../../types/post'

type RedditState = {
  posts: Post[]
  currentPost?: Post
  loading: string
  error?: string
  after: string
}
type StateType = {
  reddit: RedditState
}

type ParamsType = {
  after: string
}

export const fetchPosts = createAsyncThunk<
  Promise<string>,
  Nullable<ParamsType>
>('notes/fetchPosts', async (params, thunkAPI) => {
  try {
    const response = await ky.get(`${API_URL}/top.json`, {
      searchParams: {
        after: params ? params.after : '',
        limit: PAGE_LIMIT,
      },
    })

    return response.json()
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    posts: [],
    currentPost: null,
    error: null,
    after: '',
    loading: 'idle',
  },
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload
    },
  },
  extraReducers: {
    [fetchPosts.pending.toString()]: (state) => {
      state.loading = 'loading'
    },
    [fetchPosts.fulfilled.toString()]: (state, { payload }) => {
      state.posts = state.posts.concat(
        payload.data.children.map((child) => child.data)
      )
      state.after = payload.data.after
      state.loading = 'loaded'

      if (!state.currentPost) {
        // Display the first post after loading the app for the first time
        state.currentPost = state.posts[0]
      }
    },
    [fetchPosts.rejected.toString()]: (state, { payload }) => {
      state.loading = 'error'
      state.error = payload.error
    },
  },
})

export const selectPosts = (state: StateType): Post[] => state.reddit.posts
export const selectAfter = (state: StateType): string => state.reddit.after
export const selectLoading = (state: StateType): string => state.reddit.loading
export const selectCurrentPost = (state: StateType): Nullable<Post> =>
  state.reddit.currentPost

export const { setCurrentPost } = redditSlice.actions

const persistConfig = {
  key: 'reddit',
  storage,
  blacklist: ['posts', 'after', 'loading'],
}
const persistedReducer = persistReducer(persistConfig, redditSlice.reducer)

export default persistedReducer
