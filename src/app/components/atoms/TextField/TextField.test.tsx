import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import storySnaps from 'test/utils/storySnaps'

import TextField from './TextField'
import * as stories from './TextField.stories'

describe('app/components/atoms/TextField', () => {
  describe('stories', () => {
    storySnaps(stories)
  })

  describe('assertions', () => {
    const onChange = jest.fn()
    const renderDefault = () => render(<TextField />)
    const renderRequired = () => render(<TextField required />)
    const renderLabel = (label: string) => render(<TextField label={label} />)
    const renderError = (error: string) => render(<TextField error={error} />)
    const renderPassword = (label: string) =>
      render(
        <TextField
          type="password"
          label={label}
        />,
      )
    const renderEmail = (label: string) =>
      render(
        <TextField
          type="email"
          label={label}
        />,
      )
    const renderControlled = (value: string) =>
      render(
        <TextField
          value={value}
          onChange={onChange}
        />,
      )

    beforeEach(jest.clearAllMocks)

    it('renders a text input', () => {
      renderDefault()
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('renders an empty text input by default', () => {
      renderDefault()
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('')
    })

    it('indicates to browser when text input is required', () => {
      renderRequired()
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.required).toBe(true)
    })

    it('indicates to browser when text input is a password', () => {
      const labelText = 'Password Field'
      renderPassword(labelText)
      const input = screen.getByLabelText(labelText) as HTMLInputElement
      expect(input.type).toBe('password')
    })

    it('indicates to browser when text input is an email', () => {
      const labelText = 'Email Field'
      renderEmail(labelText)
      const input = screen.getByLabelText(labelText) as HTMLInputElement
      expect(input.type).toBe('email')
    })

    it('renders a label when specified', () => {
      const labelText = 'Test Label'
      renderLabel(labelText)
      const label = screen.getByText(labelText)
      expect(label).toBeInTheDocument()
    })

    it('indicates label to screen readers when specified', () => {
      const labelText = 'Test Label'
      renderLabel(labelText)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.getAttribute('aria-label')).toBe(labelText)
    })

    it('renders an error when specified', () => {
      const errorText = 'Test Error'
      renderError(errorText)
      const error = screen.getByText(errorText)
      expect(error).toBeInTheDocument()
    })

    it('controls input value when specified', () => {
      const valueText = 'Test Value'
      renderControlled(valueText)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe(valueText)
    })

    it('calls onChange when value is changed', () => {
      const initialValue = 'Initial Value'
      const newValue = 'New Value'
      const changeEvent = { target: { value: newValue } }
      renderControlled(initialValue)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe(initialValue)
      expect(onChange).not.toHaveBeenCalled()
      fireEvent.change(input, changeEvent)
      expect(onChange).toHaveBeenCalled()
    })
  })
})
