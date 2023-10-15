import React from 'react'
import { Helmet } from 'react-helmet'

import * as Styled from './HeroTemplate.styled'

export interface Props {
  title: string
  children: React.ReactNode
}

const HeroTemplate: React.FC<Props> = ({ title, children }) => (
  <Styled.Container>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Styled.Header>{children}</Styled.Header>
  </Styled.Container>
)

export default HeroTemplate
