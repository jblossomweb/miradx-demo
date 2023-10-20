import React from 'react'
import miraDx from 'images/miradx.png'
import * as Styled from './Logo.styled'

const Logo: React.FC = () => (
  <Styled.LogoContainer>
    <Styled.Logo src={miraDx} />
  </Styled.LogoContainer>
)

export default Logo
