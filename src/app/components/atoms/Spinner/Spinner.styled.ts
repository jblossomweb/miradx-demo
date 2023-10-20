import tw from 'tailwind-styled-components'
import { LoaderAlt } from '@styled-icons/boxicons-regular/LoaderAlt'

export interface SizeProps {
  $size: number
}

export const Spinner = tw(LoaderAlt)`
  animate-spinfast
`
