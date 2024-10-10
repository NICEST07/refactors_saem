import { RefObject, useEffect, useRef } from 'react'

export function useOnClickOutside<T extends HTMLElement = HTMLElement> (ref: RefObject<T> | Array<RefObject<T>> | null, handler: (event: MouseEvent) => void) {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    if (ref === null) return
    const lisener = (event: MouseEvent) => {
      const target = event.target as Node

      const isOutside = Array.isArray(ref)
        ? ref
          .filter(r => Boolean(r.current))
          .every(r => (r.current != null) && !r.current.contains(target))
        : (ref.current == null) || !ref.current.contains(target)

      if (isOutside) {
        savedHandler.current(event)
      }
    }

    window.addEventListener('mousedown', lisener)
    return () => window.removeEventListener('mousedown', lisener)
  }, [])
}
