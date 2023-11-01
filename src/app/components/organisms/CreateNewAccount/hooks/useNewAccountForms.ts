import { useState } from 'react'
import capitalize from 'app/utils/capitalize'

import type FormState from '../types/CreateNewAccountState'
import type FormActions from '../types/CreateNewAccountActions'
import useNewAccountErrors from './useNewAccountErrors'

const useNewAccountForms = (
  debounceDelay?: number,
): [FormState, FormActions] => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const [touched, setTouched] = useState<FormState['touched']>({})

  const values: FormState['values'] = {
    email,
    password,
    firstName,
    lastName,
    street,
    city,
    state,
    zip,
  }

  const onChange: FormActions['onChange'] = {
    email: ({ target }) => setEmail(target.value),
    password: ({ target }) => setPassword(target.value),
    firstName: ({ target }) => setFirstName(capitalize(target.value)),
    lastName: ({ target }) => setLastName(capitalize(target.value)),
    street: ({ target }) => setStreet(target.value),
    city: ({ target }) => setCity(target.value),
    state: ({ target }) => setState(target.value),
    zip: ({ target }) => setZip(target.value),
  }

  const onFocus: FormActions['onFocus'] = {
    email: () => setTouched({ ...touched, email: true }),
    password: () => setTouched({ ...touched, password: true }),
    firstName: () => setTouched({ ...touched, firstName: true }),
    lastName: () => setTouched({ ...touched, lastName: true }),
    street: () => setTouched({ ...touched, street: true }),
    city: () => setTouched({ ...touched, city: true }),
    state: () => setTouched({ ...touched, state: true }),
    zip: () => setTouched({ ...touched, zip: true }),
  }

  const errors = useNewAccountErrors(values, debounceDelay)

  const formState = { values, touched, errors }
  const formActions = { onChange, onFocus }

  return [formState, formActions]
}

export default useNewAccountForms
