import ky from 'ky/umd'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { PAGE_LIMIT, API_URL } from '../../constants'
import Post from '../../types/post'

type RedditState = {
  posts: Post[]
  currentPost?: Post
  loading: string
  error?: string
}
type StateType = {
  reddit: RedditState
}

export const fetchPosts = createAsyncThunk(
  'notes/fetchPosts',
  async (params = {}, thunkAPI) => {
    try {
      const response = await ky.get(`${API_URL}/top.json`, {
        searchParams: {
          after: params.after,
          limit: PAGE_LIMIT,
        },
      })

      return response.json()
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    posts: [],
    currentPost: null,
    error: null,
    loading: 'idle',
  },
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts = []
      state.loading = 'loading'
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload.data.children.map((child) => child.data)
      state.after = payload.data.after
      state.loading = 'loaded'
    },
    [fetchPosts.rejected]: (state, { payload }) => {
      state.loading = 'error'
      state.error = payload.error
    },
  },
})

export const selectPosts = (state: StateType): Post[] => state.reddit.posts
export const selectCurrentPost = (state: StateType): Nullable<Post> =>
  state.reddit.currentPost

export const { setCurrentPost } = redditSlice.actions

export default redditSlice.reducer
