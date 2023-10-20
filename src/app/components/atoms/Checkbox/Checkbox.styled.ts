import tw from 'tailwind-styled-components'

export interface ContainerProps {
  $disabled?: boolean
}

export const Container = tw.label<ContainerProps>`
  flex
  items-center
  font-medium
  ${({ $disabled }) => ($disabled ? 'text-gray-400' : '')}
  ${({ $disabled }) => ($disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
`

export const Input = tw.input`
  w-4 h-4
  mr-2
  ${({ disabled }) => (disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
  rounded
  focus:ring-blue-500
  focus:ring-1
`
