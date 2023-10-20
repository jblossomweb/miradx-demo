import tw from 'tailwind-styled-components'
import type { AllowedColors } from './Button'

export interface ButtonProps {
  $color: AllowedColors
}

const bgClass = (color: AllowedColors) => {
  switch (color) {
    case 'slate':
      return 'bg-slate-500 hover:bg-slate-700'
    case 'teal':
      return 'bg-teal-600 hover:bg-teal-800'
  }
}

export const Button = tw.button<ButtonProps>`
  font-bold
  py-2 px-4
  rounded-full
  flex
  items-center
  ${({ disabled, $color }) =>
    disabled
      ? 'cursor-not-allowed text-gray-400 bg-gray-500'
      : `cursor-pointer text-white ${bgClass($color)}`}
`

export const Icon = tw.span`
  ml-1
`
