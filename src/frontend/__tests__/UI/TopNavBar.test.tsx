import React from 'react'
import { render } from '@testing-library/react'

import {
  EPIC_STORE_URL,
  GOG_STORE_URL,
  HYPERPLAY_STORE_URL
} from 'frontend/constants'
import TopNavBar from 'frontend/components/UI/TopNavBar'

const testCases = {
  [HYPERPLAY_STORE_URL]: 'HyperPlay',
  [EPIC_STORE_URL]: 'Epic Games',
  [GOG_STORE_URL]: 'GOG'
}

describe('TopNavBar', () => {
  test.each(Object.entries(testCases))(`%s`, () => {
    const { debug } = render(<TopNavBar />)
    debug()
  })
})
