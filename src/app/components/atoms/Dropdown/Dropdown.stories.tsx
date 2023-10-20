import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import mockOptions from './__mocks__/mockOptions.json'

import Dropdown, { type DropdownProps } from './Dropdown'

type Story = StoryObj<typeof meta>

const meta = {
  title: 'components/atoms/Dropdown',
  component: Dropdown,
  render: (args) => <Dropdown {...args} />,
} satisfies Meta<typeof Dropdown>

export const Sample: Story = {
  args: {
    label: 'Sample Dropdown',
    options: mockOptions as DropdownProps['options'],
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    disabled: true,
    options: mockOptions as DropdownProps['options'],
  },
}

export const Required: Story = {
  args: {
    label: 'Required Dropdown',
    required: true,
    options: mockOptions as DropdownProps['options'],
  },
}

export const Placeholder: Story = {
  args: {
    label: 'Sample Dropdown',
    placeholder: 'Sample Placeholder',
    options: mockOptions as DropdownProps['options'],
  },
}

export const NoLabel: Story = {
  args: {
    options: mockOptions as DropdownProps['options'],
  },
}

export const NoLabelRequired: Story = {
  args: {
    required: true,
    options: mockOptions as DropdownProps['options'],
  },
}

export const FullWidth: Story = {
  args: {
    label: 'Full Width Dropdown',
    fullWidth: true,
    options: mockOptions as DropdownProps['options'],
  },
}

export const Controlled: Story = {
  args: {
    label: 'Controlled Dropdown',
    value: mockOptions[0].value,
    onChange: (event) => {
      console.log(`set value to ${event.target.value}`)
    },
    options: mockOptions as DropdownProps['options'],
  },
}

export const WithError: Story = {
  args: {
    label: 'Dropdown With Error',
    error: 'Something is wrong with your selection',
    options: mockOptions as DropdownProps['options'],
  },
}

export default meta
