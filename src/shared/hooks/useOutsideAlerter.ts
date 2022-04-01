import { useEffect } from 'react'

export const useOutsideClick = (ref: any, onClick: any) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      console.log('11111')
      // debugger
      console.log(ref.current, ref.current.contains(event.target), event.target)
      if (ref.current && !ref.current.contains(event.target)) {
        onClick(event)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
