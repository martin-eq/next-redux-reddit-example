import ky from 'ky/umd'
import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'

import { PAGE_LIMIT, API_URL } from '../../constants'
import Post from '../../types/post'

type RedditState = {
  posts: Post[]
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
    loading: 'idle',
  },
  reducers: {},
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

export const selectPosts = createSelector(
  (state: StateType) => ({
    posts: state.reddit.posts,
    error: state.reddit.error,
  }),
  (state) => state
)

export default redditSlice.reducer
