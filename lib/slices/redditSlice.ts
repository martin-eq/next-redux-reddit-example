import ky from 'ky/umd'
import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { PAGE_LIMIT, API_URL } from '../constants'
import Post from '../../types/post'

type RedditState = {
  posts: Post[]
  currentPost: Nullable<Post>
  loading: string
  error: Nullable<string>
  after: string
  readPostIds: Record<string, boolean>
  clearedPostIds: Record<string, boolean>
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

const initialState: RedditState = {
  posts: [],
  readPostIds: {},
  clearedPostIds: {},
  currentPost: null,
  error: null,
  after: '',
  loading: 'idle',
}

const redditSlice = createSlice({
  name: 'reddit',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload
      // Set post as read
      state.readPostIds[action.payload.id] = true
    },
    clearPost: (state, action: PayloadAction<string>) => {
      state.clearedPostIds[action.payload] = true
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
        // Set post as read
        state.readPostIds[state.currentPost.id] = true
      }
    },
    [fetchPosts.rejected.toString()]: (state, { payload }) => {
      debugger
      state.loading = 'error'
      state.error = payload.error
    },
  },
})

export const selectPosts = createSelector(
  (state: StateType) => ({
    posts: state.reddit.posts,
    readPostIds: state.reddit.readPostIds,
    clearedPostIds: state.reddit.clearedPostIds,
  }),
  (state) => state
)
export const selectAfter = (state: StateType): string => state.reddit.after
export const selectLoading = (state: StateType): string => state.reddit.loading
export const selectCurrentPost = (state: StateType): Nullable<Post> =>
  state.reddit.currentPost

export const { setCurrentPost, clearPost } = redditSlice.actions

const persistConfig = {
  key: 'reddit',
  storage,
  whitelist: ['readPostIds', 'clearedPostIds'],
}
const persistedReducer = persistReducer(persistConfig, redditSlice.reducer)

export default persistedReducer
