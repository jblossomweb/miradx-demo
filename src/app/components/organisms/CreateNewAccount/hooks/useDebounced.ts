import { useEffect, useRef, useState } from 'react'

const useDebouncedValue = (value: string, delay = 333) => {
  const [debouncedValue, setDebouncedValue] = useState('')
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay)

    // cleanup function (so we don't pollute)
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebouncedValue
