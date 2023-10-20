import React from 'react'
import * as Styled from './Button.styled'

export type AllowedColors = 'teal' | 'slate'

export interface ButtonProps {
  label?: string
  type?: 'submit' | 'reset' | 'button'
  color?: AllowedColors
  disabled?: boolean
  icon?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'button',
  color = 'teal',
  disabled,
  icon,
  onClick,
}) => (
  <Styled.Button
    type={type}
    disabled={disabled}
    onClick={onClick}
    $color={color}
  >
    {label}
    {!!icon && <Styled.Icon>{icon}</Styled.Icon>}
  </Styled.Button>
)

export default Button
