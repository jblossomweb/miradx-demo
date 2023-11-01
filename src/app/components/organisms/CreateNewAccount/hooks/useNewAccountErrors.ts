import { useState, useEffect } from 'react'

import isEmail from 'app/utils/isEmail'
import hasDigits from 'app/utils/hasDigits'
import hasSymbols from 'app/utils/hasSymbols'
import useDebounced from 'app/hooks/useDebounced'

import type { Values, Errors } from '../types/CreateNewAccountState'

const useNewAccountErrors = (values: Values, debounceDelay?: number) => {
  const [emailError, setEmailError] = useState<string | undefined>()
  const [passwordError, setPasswordError] = useState<string | undefined>()
  const [firstNameError, setFirstNameError] = useState<string | undefined>()
  const [lastNameError, setLastNameError] = useState<string | undefined>()

  const debounced: Partial<Values> = {
    email: useDebounced(values.email, debounceDelay),
    password: useDebounced(values.password, debounceDelay),
    firstName: useDebounced(values.firstName, debounceDelay),
    lastName: useDebounced(values.lastName, debounceDelay),
  }

  const errors: Errors = {
    email: emailError,
    password: passwordError,
    firstName: firstNameError,
    lastName: lastNameError,
  }

  useEffect(() => {
    setEmailError(
      !debounced.email?.length
        ? 'Email is required.'
        : !isEmail(debounced.email)
        ? 'Email is not valid.'
        : undefined,
    )
  }, [debounced.email])

  useEffect(() => {
    setPasswordError(
      !debounced.password?.length
        ? 'Password is required.'
        : debounced.password.length < 8
        ? 'Password must be at least 8 characters.'
        : !hasDigits(debounced.password)
        ? 'Password must contain at least one numeric character'
        : !hasSymbols(debounced.password)
        ? 'Password must contain at least one special character'
        : undefined,
    )
  }, [debounced.password])

  useEffect(() => {
    setFirstNameError(
      !debounced.firstName?.length ? 'First Name is required.' : undefined,
    )
  }, [debounced.firstName])

  useEffect(() => {
    setLastNameError(
      !debounced.lastName?.length ? 'Last Name is required.' : undefined,
    )
  }, [debounced.lastName])

  return errors
}

export default useNewAccountErrors
