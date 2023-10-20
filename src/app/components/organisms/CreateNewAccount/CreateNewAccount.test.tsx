import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNewAccount, {
  DEBOUNCE_DELAY,
  SUBMIT_DELAY,
} from './CreateNewAccount'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
) as jest.Mock

global.matchMedia =
  global.matchMedia ||
  (() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }))

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

describe('app/components/organisms/CreateNewAccount', () => {
  const renderStep1 = async () => {
    const user = userEvent.setup()
    render(<CreateNewAccount />)
    const email = await screen.findByRole('textbox', { name: 'Email' })
    const password = await screen.findByLabelText('Password')
    const button = await screen.findByRole('button', { name: 'Next Step' })
    return { email, password, button, user }
  }

  const renderStep2 = async () => {
    const { email, password, button, user } = await renderStep1()
    await user.type(email, 'foo@bar.com')
    await user.type(password, 'abcd1234!')
    // to account for the debounce, and ensure button is enabled
    await act(async () => await delay(DEBOUNCE_DELAY + 1))
    await user.click(button)
    const firstName = await screen.findByRole('textbox', { name: 'First Name' })
    const lastName = await screen.findByRole('textbox', { name: 'Last Name' })
    const addressCheckbox = await screen.findByRole('checkbox', {
      name: 'Enter Address (optional)',
    })
    const prevButton = await screen.findByRole('button', {
      name: 'Previous Step',
    })
    const createButton = await screen.findByRole('button', {
      name: 'Create Account',
    })

    return {
      firstName,
      lastName,
      addressCheckbox,
      prevButton,
      createButton,
      user,
    }
  }

  const renderStep2AddressChecked = async () => {
    const { addressCheckbox, user } = await renderStep2()
    expect(addressCheckbox).toBeInTheDocument()
    await user.click(addressCheckbox)
    const street = await screen.findByRole('textbox', { name: 'Street' })
    const city = await screen.findByRole('textbox', { name: 'City' })
    const state = await screen.findByRole('combobox', { name: 'State' })
    const zip = await screen.findByRole('textbox', { name: 'Zip' })
    return { street, city, state, zip, addressCheckbox, user }
  }

  const renderSubmitted = async () => {
    const {
      firstName, //
      lastName,
      prevButton,
      createButton,
      user,
    } = await renderStep2()
    await user.type(firstName, 'Fred')
    await user.type(lastName, 'Flintstone')
    // to account for the debounce, and ensure button is enabled
    await act(async () => await delay(DEBOUNCE_DELAY + 1))
    await user.click(createButton)
    return {
      firstName,
      lastName,
      prevButton,
      createButton,
      user,
    }
  }

  beforeEach((fetch as jest.Mock).mockClear)

  describe('Step 1', () => {
    it('should render an Email field', async () => {
      const { email } = await renderStep1()
      expect(email).toBeInTheDocument()
      expect(email.getAttribute('type')).toBe('email')
    })

    it('should render a Password field', async () => {
      const { password } = await renderStep1()
      expect(password).toBeInTheDocument()
      expect(password.getAttribute('type')).toBe('password')
    })

    it('should render a Next Step button', async () => {
      const { button } = await renderStep1()
      expect(button).toBeInTheDocument()
      expect(button.getAttribute('type')).toBe('submit')
    })

    it('should render a Next Step button initially disabled', async () => {
      const { button } = await renderStep1()
      expect(button).toBeDisabled()
    })

    it('should enable Next Step button when valid email and password are entered', async () => {
      const { email, password, button, user } = await renderStep1()
      expect(button).toBeDisabled()
      await user.type(email, 'foo@bar.com')
      await user.type(password, 'abcd1234!')
      // to account for the debounce, and ensure button is enabled
      await act(async () => await delay(DEBOUNCE_DELAY + 1))
      expect(button).not.toBeDisabled()
    })
  })

  describe('Step 2', () => {
    it('should render a First Name text field', async () => {
      const { firstName } = await renderStep2()
      expect(firstName).toBeInTheDocument()
      expect(firstName.getAttribute('type')).toBe('text')
    })

    it('should render a Last Name text field', async () => {
      const { lastName } = await renderStep2()
      expect(lastName).toBeInTheDocument()
      expect(lastName.getAttribute('type')).toBe('text')
    })

    it('should render a Previous Step button', async () => {
      const { prevButton } = await renderStep2()
      expect(prevButton).toBeInTheDocument()
      expect(prevButton.getAttribute('type')).not.toBe('submit')
      expect(prevButton).not.toBeDisabled()
    })

    it('should render a Create Account submit button', async () => {
      const { createButton } = await renderStep2()
      expect(createButton).toBeInTheDocument()
      expect(createButton.getAttribute('type')).toBe('submit')
    })

    it('should render Create Account button initially disabled', async () => {
      const { createButton } = await renderStep2()
      expect(createButton).toBeDisabled()
    })

    it('should enable Create Account button when valid firstName and lastName are entered', async () => {
      const { firstName, lastName, createButton, user } = await renderStep2()
      expect(createButton).toBeDisabled()
      await user.type(firstName, 'Fred')
      await user.type(lastName, 'Flintstone')
      // to account for the debounce, and ensure button is enabled
      await act(async () => await delay(DEBOUNCE_DELAY + 1))
      expect(createButton).not.toBeDisabled()
    })

    it('should render an Enter Address checkbox', async () => {
      const { addressCheckbox } = await renderStep2()
      expect(addressCheckbox).toBeInTheDocument()
    })

    it('should render a Street text field when Address is checked', async () => {
      const { street } = await renderStep2AddressChecked()
      expect(street).toBeInTheDocument()
    })

    it('should render a City text field when Address is checked', async () => {
      const { city } = await renderStep2AddressChecked()
      expect(city).toBeInTheDocument()
    })

    it('should render a State dropdown when Address is checked', async () => {
      const { state } = await renderStep2AddressChecked()
      expect(state).toBeInTheDocument()
    })

    it('should render a Zip text field when Address is checked', async () => {
      const { zip } = await renderStep2AddressChecked()
      expect(zip).toBeInTheDocument()
    })

    it('should disable unchecking Enter Address checkbox if address fields are not empty', async () => {
      const {
        street, //
        addressCheckbox,
        user,
      } = await renderStep2AddressChecked()
      expect(addressCheckbox).not.toBeDisabled()
      await user.type(street, '123 Foo')
      expect(addressCheckbox).toBeDisabled()
    })

    it('should not render address fields when Address is unchecked', async () => {
      const {
        street, //
        city,
        state,
        zip,
        addressCheckbox,
        user,
      } = await renderStep2AddressChecked()
      expect(street).toBeInTheDocument()
      expect(city).toBeInTheDocument()
      expect(state).toBeInTheDocument()
      expect(zip).toBeInTheDocument()
      await user.click(addressCheckbox) // uncheck
      expect(street).not.toBeInTheDocument()
      expect(city).not.toBeInTheDocument()
      expect(state).not.toBeInTheDocument()
      expect(zip).not.toBeInTheDocument()
    })
  })

  describe('After Submit', () => {
    it('should disable fields and buttons while request is in flight', async () => {
      const {
        firstName, //
        lastName,
        prevButton,
        createButton,
      } = await renderSubmitted()
      expect(firstName).toBeDisabled()
      expect(lastName).toBeDisabled()
      expect(prevButton).toBeDisabled()
      expect(createButton).toBeDisabled()
    })

    it('should display success message when response is a success', async () => {
      jest.mock('react-hot-toast')
      ;(global.fetch as jest.Mock).mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ code: 201, description: 'Created' }),
        }),
      )
      await renderSubmitted()
      // to account for the intentional submit delay
      await act(async () => await delay(SUBMIT_DELAY + 1))
      const success = await screen.findByText(/your account was created/i)
      expect(success).toBeInTheDocument()
    })

    it('should display error message when response is an error', async () => {
      jest.mock('react-hot-toast')
      ;(global.fetch as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error('Server Error.')),
      )
      await renderSubmitted()
      // to account for the intentional submit delay
      await act(async () => await delay(SUBMIT_DELAY + 1))
      const errors = await screen.findAllByText(/server error/i)
      expect(errors[0]).toBeInTheDocument()
    })

    it('should display default error message when response error has empty message', async () => {
      jest.mock('react-hot-toast')
      ;(global.fetch as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error(undefined)),
      )
      await renderSubmitted()
      // to account for the intentional submit delay
      await act(async () => await delay(SUBMIT_DELAY + 1))
      const errors = await screen.findAllByText(/something went wrong/i)
      expect(errors[0]).toBeInTheDocument()
    })
  })
})
