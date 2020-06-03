import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import { store } from '../../lib/store'
import PostDetail from '../postDetail'

describe('PostDetail', () => {
  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <PostDetail />
      </Provider>
    )

  test('It renders properly', () => {
    const wrapper = getWrapper()

    expect(wrapper).toMatchSnapshot()
  })
})
