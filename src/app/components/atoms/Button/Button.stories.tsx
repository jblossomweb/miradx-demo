import React from 'react'
import { BiUserPlus as UserPlus } from 'react-icons/bi'
import type { Meta, StoryObj } from '@storybook/react'

import Spinner from '../Spinner'
import Button from './Button'

type Story = StoryObj<typeof meta>

const meta = {
  title: 'components/atoms/Button',
  component: Button,
  render: (args) => <Button {...args} />,
} satisfies Meta<typeof Button>

export const Sample: Story = {
  args: {
    label: 'Sample Button',
  },
}

export const Slate: Story = {
  args: {
    label: 'Slate Button',
    color: 'slate',
  },
}

export const Teal: Story = {
  args: {
    label: 'Teal Button',
    color: 'teal',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
}

export const Icon: Story = {
  args: {
    label: 'Sample Button',
    icon: <UserPlus size={24} />,
  },
}

export const DisabledIcon: Story = {
  args: {
    label: 'Disabled Button',
    icon: <Spinner size={24} />,
    disabled: true,
  },
}

export default meta
