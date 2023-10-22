import tw from 'tailwind-styled-components'
import { BiLoaderAlt as LoaderAlt } from 'react-icons/bi'

export interface SizeProps {
  $size: number
}

export const Spinner = tw(LoaderAlt)`
  animate-spinfast
`
