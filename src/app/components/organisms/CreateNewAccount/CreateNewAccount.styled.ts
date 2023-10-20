import tw from 'tailwind-styled-components'

export const Title = tw.h1`
  text-3xl
  mb-4
`

export const SubTitle = tw.h2`
  text-xl
  mb-8
`

export const Form = tw.form`
  w-96
  animate-fade
`

export const Field = tw.div`
  text-left
  mb-4
`

export const Buttons = tw.div`
  flex
  flex-start
  items-center
  space-x-1
  mb-4
`

export const Result = tw.div`
  w-80
  rounded-lg
  p-4
  font-bold
  animate-fade
`

export const Success = tw(Result)`
  bg-teal-500
  text-white
`

export const Error = tw(Result)`
  bg-red-500
  text-white
`
