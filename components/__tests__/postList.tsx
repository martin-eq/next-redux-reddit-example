import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

import PostList from '../postList'
import mockResponse from './__mocks__/top.json'

describe('PostList', () => {
  const createStore = configureStore([reduxThunk])
  const store = createStore({
    reddit: {
      posts: mockResponse.data.children.map((child) => child.data),
      readPostIds: {},
      dismissedPostIds: {},
    },
  })
  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <PostList />
      </Provider>
    )

  test('It renders properly', () => {
    const wrapper = getWrapper()

    expect(wrapper).toMatchSnapshot()
  })

  test('When clicking on a post, it shows the post detail', () => {
    const wrapper = getWrapper()
    const postNumber = 3

    // Simulate clickng on a post
    wrapper
      .find('.MuiListItem-root.MuiButtonBase-root')
      .at(postNumber)
      .simulate('click')

    const actions = store.getActions()
    const { reddit } = store.getState()
    expect(actions).toEqual([
      {
        type: 'reddit/setCurrentPost',
        payload: reddit.posts[postNumber],
      },
      {
        type: 'drawer/setDrawer',
        payload: false,
      },
    ])
  })
})
