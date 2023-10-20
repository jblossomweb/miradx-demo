import React from 'react'

import TextField from 'app/components/atoms/TextField'
import Button from 'app/components/atoms/Button'

import type { Values } from '../hooks/useNewAccountForms'
import * as Styled from '../CreateNewAccount.styled'

export const UserLoginFields = ['email', 'password'] as (keyof Values)[]

export interface UserLoginFormProps {
  values: {
    email?: string
    password?: string
  }
  errors?: {
    email?: string
    password?: string
  }
  touched?: {
    email?: boolean
    password?: boolean
  }
  disabled?: boolean
  submitLabel?: string
  submitIcon?: React.ReactNode
  secondaryCta?: React.ReactNode
  onFocus?: {
    email?: (event: React.FocusEvent<HTMLInputElement>) => void
    password?: (event: React.FocusEvent<HTMLInputElement>) => void
  }
  onChange: {
    email: (event: React.ChangeEvent<HTMLInputElement>) => void
    password: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const UserLoginForm: React.FC<UserLoginFormProps> = ({
  values,
  errors,
  touched,
  disabled,
  submitLabel,
  submitIcon,
  secondaryCta,
  onChange,
  onFocus,
  onSubmit,
}) => {
  const hasErrors = !!(errors?.email || errors?.password)

  return (
    <Styled.Form
      onSubmit={(event) => {
        event.preventDefault()
        if (!disabled && !hasErrors) onSubmit(event)
      }}
    >
      <Styled.Field>
        <TextField
          type="email"
          label="Email"
          value={values.email}
          onFocus={onFocus?.email}
          onChange={onChange.email}
          disabled={disabled}
          error={touched?.email ? errors?.email : undefined}
          fullWidth
          required
        />
      </Styled.Field>
      <Styled.Field>
        <TextField
          type="password"
          label="Password"
          value={values.password}
          onFocus={onFocus?.password}
          onChange={onChange.password}
          disabled={disabled}
          error={touched?.password ? errors?.password : undefined}
          fullWidth
          required
        />
      </Styled.Field>
      <Styled.Buttons>
        {secondaryCta}
        <Button
          label={submitLabel || 'Submit'}
          icon={submitIcon}
          type="submit"
          disabled={disabled || hasErrors}
          onClick={(event) => {
            if (hasErrors) {
              event.preventDefault()
            }
          }}
        />
      </Styled.Buttons>
    </Styled.Form>
  )
}

export default UserLoginForm
