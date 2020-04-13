import { useCallback, useEffect, useState, useRef } from 'react'

export default function useInterval(callback, interval, options = {}) {
  const { autoStart = true } = options

  const [isActive, setIsActive] = useState(autoStart)
  const start = useCallback(() => setIsActive(true), [setIsActive])
  const stop = useCallback(() => setIsActive(false), [setIsActive])

  const callbackRef = useRef()
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      callbackRef.current()
    }

    if (isActive && !!interval) {
      const intervalId = setInterval(tick, interval)

      return () => clearInterval(intervalId)
    }

    return () => {}
  }, [interval, isActive])

  return {
    isActive,
    start,
    stop,
  }
}
