import React, { useState, useEffect } from 'react'

import stateOptions from 'app/data/stateOptions.json'
import TextField from 'app/components/atoms/TextField'
import Dropdown from 'app/components/atoms/Dropdown'
import Checkbox from 'app/components/atoms/Checkbox'
import Button from 'app/components/atoms/Button'

import type { Values } from '../types/CreateNewAccountState'
import * as Styled from '../CreateNewAccount.styled'

export const UserDetailsFields = [
  'firstName',
  'lastName',
  'street',
  'city',
  'state',
  'zip',
] as (keyof Values)[]

export interface UserDetailsFormProps {
  values: {
    firstName?: string
    lastName?: string
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  errors?: {
    firstName?: string
    lastName?: string
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  touched?: {
    firstName?: boolean
    lastName?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
  }
  disabled?: boolean
  submitLabel?: string
  submitIcon?: React.ReactNode
  secondaryCta?: React.ReactNode
  onFocus?: {
    firstName: (event: React.FocusEvent<HTMLInputElement>) => void
    lastName: (event: React.FocusEvent<HTMLInputElement>) => void
    street: (event: React.FocusEvent<HTMLInputElement>) => void
    city: (event: React.FocusEvent<HTMLInputElement>) => void
    state: (event: React.FocusEvent<HTMLSelectElement>) => void
    zip: (event: React.FocusEvent<HTMLInputElement>) => void
  }
  onChange: {
    firstName: (event: React.ChangeEvent<HTMLInputElement>) => void
    lastName: (event: React.ChangeEvent<HTMLInputElement>) => void
    street: (event: React.ChangeEvent<HTMLInputElement>) => void
    city: (event: React.ChangeEvent<HTMLInputElement>) => void
    state: (event: React.ChangeEvent<HTMLSelectElement>) => void
    zip: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  values,
  errors,
  touched,
  disabled,
  submitLabel,
  submitIcon,
  secondaryCta,
  onFocus,
  onChange,
  onSubmit,
}) => {
  const [showAddress, setShowAddress] = useState(false)

  const addressIsEmpty = !(
    values.street ||
    values.city ||
    values.state ||
    values.zip
  )

  const hasErrors = !!(
    errors?.firstName ||
    errors?.lastName ||
    errors?.street ||
    errors?.city ||
    errors?.state ||
    errors?.zip
  )

  useEffect(() => {
    if (!addressIsEmpty) setShowAddress(true)
  }, [addressIsEmpty])

  return (
    <Styled.Form
      onSubmit={(event) => {
        event.preventDefault()
        if (!disabled && !hasErrors) onSubmit(event)
      }}
    >
      <Styled.Field>
        <TextField
          label="First Name"
          value={values.firstName}
          disabled={disabled}
          error={touched?.firstName ? errors?.firstName : undefined}
          onFocus={onFocus?.firstName}
          onChange={onChange.firstName}
          fullWidth
          required
        />
      </Styled.Field>
      <Styled.Field>
        <TextField
          label="Last Name"
          value={values.lastName}
          disabled={disabled}
          error={touched?.lastName ? errors?.lastName : undefined}
          onFocus={onFocus?.lastName}
          onChange={onChange.lastName}
          fullWidth
          required
        />
      </Styled.Field>
      <Styled.Field>
        <Checkbox
          label="Enter Address (optional)"
          checked={showAddress}
          disabled={!addressIsEmpty || disabled}
          onChange={({ target }) => setShowAddress(target.checked)}
        />
      </Styled.Field>
      {showAddress && (
        <>
          <Styled.Field>
            <TextField
              label="Street"
              value={values.street}
              error={touched?.street ? errors?.street : undefined}
              onFocus={onFocus?.street}
              onChange={onChange.street}
              disabled={!showAddress || disabled}
              fullWidth
            />
          </Styled.Field>
          <Styled.Field>
            <TextField
              label="City"
              value={values.city}
              error={touched?.city ? errors?.city : undefined}
              onFocus={onFocus?.city}
              onChange={onChange.city}
              disabled={!showAddress || disabled}
              fullWidth
            />
          </Styled.Field>
          <Styled.Field>
            <Dropdown
              label="State"
              placeholder="Select State..."
              options={stateOptions}
              value={values.state}
              error={touched?.state ? errors?.state : undefined}
              onFocus={onFocus?.state}
              onChange={onChange.state}
              disabled={!showAddress || disabled}
              fullWidth
            />
          </Styled.Field>
          <Styled.Field>
            <TextField
              label="Zip"
              value={values.zip}
              error={touched?.zip ? errors?.zip : undefined}
              onFocus={onFocus?.zip}
              onChange={onChange.zip}
              disabled={!showAddress || disabled}
              fullWidth
            />
          </Styled.Field>
        </>
      )}

      <Styled.Buttons>
        {secondaryCta}
        <Button
          label={submitLabel || 'Submit'}
          type="submit"
          disabled={disabled || hasErrors}
          icon={submitIcon}
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

export default UserDetailsForm
