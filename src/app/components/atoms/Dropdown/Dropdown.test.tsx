import React from 'react'
import { render, screen, within, fireEvent } from '@testing-library/react'
import storySnaps from 'test/utils/storySnaps'
import randomInteger from 'test/generate/randomInteger'

import Dropdown, { type DropdownProps } from './Dropdown'
import * as stories from './Dropdown.stories'
// eslint-disable-next-line jest/no-mocks-import
import mockOptions from './__mocks__/mockOptions.json'

describe('app/components/atoms/Dropdown', () => {
  describe('stories', () => {
    storySnaps(stories)
  })

  describe('assertions', () => {
    const onChange = jest.fn()
    const renderDefault = (options: DropdownProps['options']) =>
      render(<Dropdown options={options} />)

    const renderRequired = (options: DropdownProps['options']) =>
      render(
        <Dropdown
          options={options}
          required
        />,
      )

    const renderLabel = (label: string, options: DropdownProps['options']) =>
      render(
        <Dropdown
          label={label}
          options={options}
        />,
      )

    const renderError = (error: string, options: DropdownProps['options']) =>
      render(
        <Dropdown
          error={error}
          options={options}
        />,
      )

    const renderControlled = (
      selectedIndex: number,
      options: DropdownProps['options'],
    ) =>
      render(
        <Dropdown
          value={options[selectedIndex].value}
          options={options}
          onChange={onChange}
        />,
      )

    beforeEach(jest.clearAllMocks)

    it('renders a Dropdown', () => {
      renderDefault(mockOptions)
      const dropdown = screen.getByRole('combobox') as HTMLSelectElement
      expect(dropdown).toBeInTheDocument()
    })

    it('renders a Dropdown with specified options', () => {
      renderDefault(mockOptions)
      const dropdown = screen.getByRole('combobox') as HTMLSelectElement
      const options = within(dropdown).getAllByRole('option')
      expect(options.length).toEqual(mockOptions.length)
      mockOptions.forEach(({ display }, i) => {
        const option = within(dropdown).getByText(display)
        const value = option.getAttribute('value')
        expect(option).toBeInTheDocument()
        expect(value).toEqual(options[i].getAttribute('value'))
      })
    })

    it('indicates to browser when Dropdown selection is required', () => {
      renderRequired(mockOptions)
      const dropdown = screen.getByRole('combobox') as HTMLSelectElement
      expect(dropdown.required).toBe(true)
    })

    it('renders a label when specified', () => {
      const labelText = 'Test Label'
      renderLabel(labelText, mockOptions)
      const label = screen.getByText(labelText)
      expect(label).toBeInTheDocument()
    })

    it('indicates label to screen readers when specified', () => {
      const labelText = 'Test Label'
      renderLabel(labelText, mockOptions)
      const dropdown = screen.getByRole('combobox') as HTMLSelectElement
      expect(dropdown.getAttribute('aria-label')).toBe(labelText)
    })

    it('renders an error when specified', () => {
      const errorText = 'Test Error'
      renderError(errorText, mockOptions)
      const error = screen.getByText(errorText)
      expect(error).toBeInTheDocument()
    })

    it('controls selected value when specified', () => {
      const selectedIndex = randomInteger(0, mockOptions.length - 1) // fuzzy test
      const valueText = mockOptions[selectedIndex].value
      renderControlled(selectedIndex, mockOptions)
      const dropdown = screen.getByRole('combobox') as HTMLSelectElement
      expect(dropdown.value).toBe(valueText)
    })

    it('calls onChange when value is changed', () => {
      const initialValue = mockOptions[0].value
      renderControlled(0, mockOptions)
      const dropdown = screen.getByRole('combobox') as HTMLSelectElement
      expect(dropdown.value).toBe(initialValue)
      expect(onChange).not.toHaveBeenCalled()
      fireEvent.change(dropdown, { target: { value: mockOptions[1].value } })
      expect(onChange).toHaveBeenCalled()
    })
  })
})
