import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import TextField from './TextField'

type Story = StoryObj<typeof meta>

const meta = {
  title: 'components/atoms/TextField',
  component: TextField,
  render: (args) => <TextField {...args} />,
} satisfies Meta<typeof TextField>

export const Sample: Story = {
  args: {
    label: 'Sample TextField',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled TextField',
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Required TextField',
    required: true,
  },
}

export const Password: Story = {
  args: {
    label: 'Password TextField',
    type: 'password',
  },
}

export const Email: Story = {
  args: {
    label: 'Email TextField',
    type: 'email',
  },
}

export const Placeholder: Story = {
  args: {
    label: 'Sample TextField',
    placeholder: 'Sample Placeholder',
  },
}

export const NoLabel: Story = {
  args: {},
}

export const NoLabelPlaceholder: Story = {
  args: {
    placeholder: 'Sample Placeholder',
  },
}

export const NoLabelRequired: Story = {
  args: {
    required: true,
  },
}

export const FullWidth: Story = {
  args: {
    label: 'Full Width TextField',
    fullWidth: true,
  },
}

export const Controlled: Story = {
  args: {
    label: 'Controlled TextField',
    value: 'Controlled Value',
    onChange: (event) => {
      console.log(`set value to ${event.target.value}`)
    },
  },
}

export const ControlledPassword: Story = {
  args: {
    label: 'Password TextField',
    value: 'PasswordValue',
    type: 'password',
    onChange: (event) => {
      console.log(`set value to ${event.target.value}`)
    },
  },
}

export const WithError: Story = {
  args: {
    label: 'TextField With Error',
    error: 'Something is wrong with your input',
  },
}

export default meta
