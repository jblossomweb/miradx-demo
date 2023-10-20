import React from 'react'
import * as Styled from './Spinner.styled'

export interface SpinnerProps {
  size?: number
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40 }) => (
  <Styled.Spinner
    size={size}
    role="status"
  />
)

export default Spinner
