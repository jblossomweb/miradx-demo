import React from 'react'
import * as Styled from './TextField.styled'

export interface TextFieldProps {
  label?: string
  disabled?: boolean
  placeholder?: string
  required?: boolean
  type?: 'email' | 'password' | 'text'
  fullWidth?: boolean
  value?: string
  error?: string
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  disabled,
  placeholder,
  required,
  type = 'text',
  fullWidth,
  value,
  error,
  onFocus,
  onChange,
}) => (
  <Styled.Container $disabled={disabled}>
    {!!(label || required) && (
      <Styled.InputLabel $required={required}>{label}</Styled.InputLabel>
    )}
    <Styled.Input
      type={type}
      disabled={disabled}
      required={required}
      aria-label={label}
      value={value}
      placeholder={placeholder}
      onFocus={onFocus}
      onChange={onChange}
      $fullWidth={fullWidth}
      $error={!!error}
    />
    {!!error && <Styled.InputError>{error}</Styled.InputError>}
  </Styled.Container>
)

export default TextField
