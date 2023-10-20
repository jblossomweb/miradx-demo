import React from 'react'
import { render, screen } from '@testing-library/react'
import storySnaps from 'test/utils/storySnaps'

import Checkbox from './Checkbox'
import * as stories from './Checkbox.stories'

describe('app/components/atoms/Checkbox', () => {
  describe('stories', () => {
    storySnaps(stories)
  })

  describe('assertions', () => {
    const onChange = jest.fn()
    const renderDefault = () => render(<Checkbox />)
    const renderChecked = () =>
      render(
        <Checkbox
          checked={true}
          onChange={onChange}
        />,
      )
    const renderUnChecked = () =>
      render(
        <Checkbox
          checked={false}
          onChange={onChange}
        />,
      )

    beforeEach(jest.clearAllMocks)

    it('renders a checkbox', () => {
      renderDefault()
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    it('renders a checkbox unchecked by default', () => {
      renderDefault()
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
    })

    it('renders a checked checkbox when specified', () => {
      renderChecked()
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).toBeChecked()
    })

    it('renders an unchecked checkbox when specified', () => {
      renderUnChecked()
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
    })

    it('calls onChange when checkbox is clicked', () => {
      renderUnChecked()
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
      expect(onChange).not.toHaveBeenCalled()
      checkbox.click()
      expect(onChange).toHaveBeenCalled()
    })
  })
})
