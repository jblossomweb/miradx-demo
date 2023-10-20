import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Spinner from './Spinner'

type Story = StoryObj<typeof meta>

const meta = {
  title: 'components/atoms/Spinner',
  component: Spinner,
  render: (args) => <Spinner {...args} />,
} satisfies Meta<typeof Spinner>

export const Sample: Story = {
  args: {},
}

export const Sized: Story = {
  args: {
    size: 80,
  },
}

export default meta
