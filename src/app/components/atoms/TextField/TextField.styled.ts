import tw from 'tailwind-styled-components'

export interface ContainerProps {
  $disabled?: boolean
}

export interface LabelProps {
  $required?: boolean
}

export interface InputProps {
  $fullWidth?: boolean
  $error?: boolean
}

export const Container = tw.label<ContainerProps>`
  flex
  flex-col
  items-left
  font-medium
  ${({ $disabled }) => ($disabled ? 'text-gray-400' : '')}
`

export const InputLabel = tw.span<LabelProps>`
  after:ml-1
  after:text-red-500
  ${({ $required }) => ($required ? `after:content-['*']` : '')}
`

export const Input = tw.input<InputProps>`
  ${({ $fullWidth }) => ($fullWidth ? 'w-full' : 'w-80')}
  h-8
  mr-2
  py-4
  px-1
  text-black
  rounded
  ring-1
  focus:ring-blue-500
  ${({ $error }) => ($error ? 'ring-red-500' : 'ring-transparent')}
  ${({ disabled }) => (disabled ? 'cursor-not-allowed' : '')}
  
`

export const InputError = tw.span`
  text-red-500
  font-bold
  italic
`
