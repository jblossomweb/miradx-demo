import { useState } from 'react'
import capitalize from 'app/utils/capitalize'

export type FocusHandler = (event: React.FocusEvent<HTMLInputElement>) => void
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

export interface Values {
  email: string
  password: string
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  zip: string
}

export interface Touched {
  email?: boolean
  password?: boolean
  firstName?: boolean
  lastName?: boolean
  street?: boolean
  city?: boolean
  state?: boolean
  zip?: boolean
}

export interface OnFocus {
  email: FocusHandler
  password: FocusHandler
  firstName: FocusHandler
  lastName: FocusHandler
  street: FocusHandler
  city: FocusHandler
  state: FocusHandler
  zip: FocusHandler
}

export interface OnChange {
  email: ChangeHandler
  password: ChangeHandler
  firstName: ChangeHandler
  lastName: ChangeHandler
  street: ChangeHandler
  city: ChangeHandler
  state: ChangeHandler
  zip: ChangeHandler
}

export interface FormState {
  values: Values
  touched: Touched
}

export interface FormActions {
  onChange: OnChange
  onFocus: OnFocus
}

const useNewAccountForms = (): [FormState, FormActions] => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const [touched, setTouched] = useState<Touched>({})

  const values: Values = {
    email,
    password,
    firstName,
    lastName,
    street,
    city,
    state,
    zip,
  }

  const onChange: OnChange = {
    email: ({ target }) => setEmail(target.value),
    password: ({ target }) => setPassword(target.value),
    firstName: ({ target }) => setFirstName(capitalize(target.value)),
    lastName: ({ target }) => setLastName(capitalize(target.value)),
    street: ({ target }) => setStreet(target.value),
    city: ({ target }) => setCity(target.value),
    state: ({ target }) => setState(target.value),
    zip: ({ target }) => setZip(target.value),
  }

  const onFocus: OnFocus = {
    email: () => setTouched({ ...touched, email: true }),
    password: () => setTouched({ ...touched, password: true }),
    firstName: () => setTouched({ ...touched, firstName: true }),
    lastName: () => setTouched({ ...touched, lastName: true }),
    street: () => setTouched({ ...touched, street: true }),
    city: () => setTouched({ ...touched, city: true }),
    state: () => setTouched({ ...touched, state: true }),
    zip: () => setTouched({ ...touched, zip: true }),
  }

  const formState = { values, touched }
  const formActions = { onChange, onFocus }

  return [formState, formActions]
}

export default useNewAccountForms
