import React from 'react'
import { render, screen } from '@testing-library/react'
import storySnaps from 'test/utils/storySnaps'

import Button from './Button'
import * as stories from './Button.stories'

describe('app/components/atoms/Button', () => {
  describe('stories', () => {
    storySnaps(stories)
  })

  describe('assertions', () => {
    const onClick = jest.fn()
    const renderDefault = () => render(<Button />)
    const renderDisabled = () => render(<Button disabled />)
    const renderHandler = () => render(<Button onClick={onClick} />)

    beforeEach(jest.clearAllMocks)

    it('renders a button', () => {
      renderDefault()
      const button = screen.getByRole('button') as HTMLButtonElement
      expect(button).toBeInTheDocument()
    })

    it('renders a button as not disabled by default', () => {
      renderDefault()
      const button = screen.getByRole('button') as HTMLButtonElement
      expect(button.disabled).not.toBe(true)
    })

    it('renders a disabled button when specified', () => {
      renderDisabled()
      const button = screen.getByRole('button') as HTMLButtonElement
      expect(button.disabled).toBe(true)
    })

    it('calls onClick when button is clicked', () => {
      renderHandler()
      const button = screen.getByRole('button') as HTMLButtonElement
      expect(onClick).not.toHaveBeenCalled()
      button.click()
      expect(onClick).toHaveBeenCalled()
    })
  })
})
