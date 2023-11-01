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

export interface Errors {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  street?: string
  city?: string
  state?: string
  zip?: string
}

interface CreateNewAccountState {
  values: Values
  touched: Touched
  errors: Errors
}

export default CreateNewAccountState
