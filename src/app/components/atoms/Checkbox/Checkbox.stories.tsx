import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Checkbox from './Checkbox'

type Story = StoryObj<typeof meta>

const meta = {
  title: 'components/atoms/Checkbox',
  component: Checkbox,
  render: (args) => <Checkbox {...args} />,
} satisfies Meta<typeof Checkbox>

export const Sample: Story = {
  args: {
    label: 'Sample Checkbox',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
}

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
    onChange: (event) => {
      console.log(`set checked to ${event.target.checked}`)
    },
  },
}

export const Unchecked: Story = {
  args: {
    label: 'Unchecked Checkbox',
    checked: false,
    onChange: (event) => {
      console.log(`set checked to ${event.target.checked}`)
    },
  },
}

export default meta
