import React from 'react'
import * as Styled from './Checkbox.styled'

export interface CheckboxProps {
  label?: string
  disabled?: boolean
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  disabled,
  checked,
  onChange,
}) => (
  <Styled.Container $disabled={disabled}>
    <Styled.Input
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onChange={onChange}
    />{' '}
    {label}
  </Styled.Container>
)

export default Checkbox
