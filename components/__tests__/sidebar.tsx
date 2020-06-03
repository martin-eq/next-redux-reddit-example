import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

import SideBar from '../sidebar'
import mockResponse from './__mocks__/top.json'

describe('SideBar', () => {
  const createStore = configureStore([reduxThunk])
  const store = createStore({
    reddit: {
      posts: mockResponse.data.children.map((child) => child.data),
      readPostIds: {},
      dismissedPostIds: {},
    },
    drawer: {
      mobileOpen: true,
    },
  })
  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <SideBar />
      </Provider>
    )

  test('It renders properly', () => {
    const wrapper = getWrapper()

    expect(wrapper).toMatchSnapshot()
  })
})
