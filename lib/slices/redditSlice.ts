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
import Post from '../types/post'

type RedditState = {
  posts: Post[]
  loading: string
  currentPost: Nullable<Post>
  error: Nullable<string>
  after: Nullable<string>
  hasMore: boolean
  readPostIds: Record<string, boolean>
  dismissedPostIds: Record<string, boolean>
}
type StateType = {
  reddit: RedditState
}
type ParamsType = Record<string, string>

export const fetchPosts = createAsyncThunk<
  Promise<string>,
  void,
  { state: StateType }
>('notes/fetchPosts', async (_, thunkAPI) => {
  try {
    const { reddit } = thunkAPI.getState()
    const searchParams: ParamsType = {
      limit: PAGE_LIMIT.toString(),
    }

    if (reddit.after) {
      searchParams.after = reddit.after
    }

    if (!reddit.hasMore) {
      return thunkAPI.rejectWithValue({ error: 'No more posts available' })
    }

    const response = await ky.get(`${API_URL}/top.json`, { searchParams })
    return response.json()
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

const initialState: RedditState = {
  posts: [],
  readPostIds: {},
  dismissedPostIds: {},
  currentPost: null,
  error: null,
  after: null,
  hasMore: true,
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
    dismissPost: (state, action: PayloadAction<string>) => {
      state.dismissedPostIds[action.payload] = true
    },
    dismissAllPosts: (state) => {
      state.posts = []
      state.hasMore = false
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
    },
    [fetchPosts.rejected.toString()]: (state, { payload }) => {
      state.loading = 'error'
      state.error = payload.error
    },
  },
})

export const selectPosts = createSelector(
  (state: StateType) => state.reddit.posts,
  (state: StateType) => state.reddit.dismissedPostIds,
  ({ reddit }: StateType) => ({
    hasMore: reddit.hasMore,
    currentPost: reddit.currentPost,
    readPostIds: reddit.readPostIds,
  }),
  (posts, dismissedPostIds, restState) => ({
    posts: posts.filter((post) => !dismissedPostIds[post.id]),
    ...restState,
  })
)

export const {
  setCurrentPost,
  dismissPost,
  dismissAllPosts,
} = redditSlice.actions

const persistConfig = {
  key: 'reddit',
  storage,
  whitelist: ['readPostIds', 'dismissedPostIds', 'hasMore'],
}
const persistedReducer = persistReducer(persistConfig, redditSlice.reducer)

export default persistedReducer
