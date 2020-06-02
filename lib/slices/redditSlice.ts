import ky from 'ky/umd'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { PAGE_LIMIT, API_URL } from '../../constants'
import Post from '../../types/post'

type RedditState = {
  posts: Post[]
  currentPost?: Post
  loading: string
  error?: string
  after?: string
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
  loading: 'idle',
}

const redditSlice = createSlice({
  name: 'reddit',
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload
    },
  },
  extraReducers: {
    [fetchPosts.pending.toString()]: (state) => {
      state.posts = []
      state.loading = 'loading'
    },
    [fetchPosts.fulfilled.toString()]: (state, { payload }) => {
      state.posts = payload.data.children.map((child) => child.data)
      state.after = payload.data.after
      state.loading = 'loaded'
    },
    [fetchPosts.rejected.toString()]: (state, { payload }) => {
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
