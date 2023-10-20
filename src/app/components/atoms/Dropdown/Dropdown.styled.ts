import tw from 'tailwind-styled-components'

export interface ContainerProps {
  $disabled?: boolean
}

export interface LabelProps {
  $required?: boolean
}

export interface SelectProps {
  $fullWidth?: boolean
  $error?: boolean
}

export interface OptionProps {
  selected?: boolean
  disabled?: boolean
}

export const Container = tw.label<ContainerProps>`
  flex
  flex-col
  items-left
  font-medium
  ${({ $disabled }) => ($disabled ? 'text-gray-400' : '')}
`

export const Label = tw.span<LabelProps>`
  after:ml-1
  after:text-red-500
  ${({ $required }) => ($required ? `after:content-['*']` : '')}
`

export const Select = tw.select<SelectProps>`
  ${({ $fullWidth }) => ($fullWidth ? 'w-full' : 'w-80')}
  h-8
  text-black
  overflow-visible
  rounded
  ring-1
  focus:ring-blue-500
  ${({ $error }) => ($error ? 'ring-red-500' : 'ring-transparent')}
  ${({ disabled }) => (disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
`

export const Option = tw.option<OptionProps>`
  ${({ disabled }) => (disabled ? 'text-gray-500' : '')}
`

export const Error = tw.span`
  text-red-500
  font-bold
  italic
`
