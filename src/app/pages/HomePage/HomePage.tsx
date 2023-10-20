import React from 'react'
import HeroTemplate from 'app/templates/HeroTemplate'

import Logo from 'app/components/atoms/Logo'
import CreateNewAccount from 'app/components/organisms/CreateNewAccount'
import * as Styled from './HomePage.styled'

const HomePage: React.FC = () => (
  <HeroTemplate title="MiraDx - Home">
    <Styled.Link href="/">
      <Logo />
    </Styled.Link>
    <CreateNewAccount />
  </HeroTemplate>
)

export default HomePage
