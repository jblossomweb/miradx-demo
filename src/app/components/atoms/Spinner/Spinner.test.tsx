import React from 'react'
import { render, screen } from '@testing-library/react'
import storySnaps from 'test/utils/storySnaps'

import Spinner from './Spinner'
import * as stories from './Spinner.stories'

describe('app/components/atoms/Spinner', () => {
  describe('stories', () => {
    storySnaps(stories)
  })

  describe('assertions', () => {
    const renderDefault = () => render(<Spinner />)

    beforeEach(jest.clearAllMocks)

    it('renders a spinner with status role', () => {
      renderDefault()
      const spinner = screen.getByRole('status', {
        hidden: true,
      }) as HTMLButtonElement
      expect(spinner).toBeInTheDocument()
    })

    it('spins the spinner', () => {
      renderDefault()
      const spinner = screen.getByRole('status', {
        hidden: true,
      }) as HTMLButtonElement
      expect(spinner).toHaveClass('animate-spinfast')
    })
  })
})
