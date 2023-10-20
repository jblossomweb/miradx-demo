import React from 'react'
import * as Styled from './Dropdown.styled'

export interface SelectOption {
  display: string
  value: string | number
}

export interface DropdownProps {
  label?: string
  disabled?: boolean
  placeholder?: string
  required?: boolean
  password?: boolean
  fullWidth?: boolean
  options: SelectOption[]
  value?: string | number
  error?: string
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  disabled,
  placeholder,
  required,
  fullWidth,
  options,
  value,
  error,
  onFocus,
  onChange,
}) => (
  <Styled.Container $disabled={disabled}>
    {!!(label || required) && (
      <Styled.Label $required={required}>{label}</Styled.Label>
    )}
    <Styled.Select
      required={required}
      disabled={disabled}
      aria-label={label}
      defaultValue={value || ''}
      onFocus={onFocus}
      onChange={onChange}
      $fullWidth={fullWidth}
      $error={!!error}
    >
      {!!placeholder && (
        <Styled.Option
          value=""
          disabled
        >
          {placeholder}
        </Styled.Option>
      )}
      {options.map((option) => (
        <Styled.Option
          key={option.value}
          value={option.value}
        >
          {option.display}
        </Styled.Option>
      ))}
    </Styled.Select>
    {!!error && <Styled.Error>{error}</Styled.Error>}
  </Styled.Container>
)

export default Dropdown
