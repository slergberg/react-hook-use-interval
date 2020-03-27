import { useCallback, useEffect, useMemo, useState, useRef } from 'react'

export function useInterval(callback, interval, options = {}) {
  const { autoStart = true } = options

  const [isActive, setActive] = useState(autoStart)

  const clearRef = useRef()
  const startRef = useRef()
  const intervalRef = useRef()

  useEffect(() => {
    startRef.current = () => {
      setActive(true)
      intervalRef.current = setInterval(callback, interval)
    }

    clearRef.current = () => {
      setActive(false)
      clearInterval(intervalRef.current)
    }

    return clearRef.current
  }, [callback, interval])

  useEffect(() => {
    if (autoStart) {
      startRef.current()
    }
  }, [autoStart, startRef])

  const clear = useCallback(
    (...args) => {
      clearRef.current(...args)
    },
    [clearRef],
  )

  const start = useCallback(
    (...args) => {
      startRef.current(...args)
    },
    [startRef],
  )

  return useMemo(() => ({ clear, isActive, start }), [clear, isActive, start])
}
