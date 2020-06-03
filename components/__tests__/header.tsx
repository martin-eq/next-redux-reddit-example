import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import { store } from '../../lib/store'
import Header from '../header'

describe('Header', () => {
  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Header />
      </Provider>
    )

  test('It renders properly', () => {
    const wrapper = getWrapper()

    expect(wrapper).toMatchSnapshot()
  })
})
