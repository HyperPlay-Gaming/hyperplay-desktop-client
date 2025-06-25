import React, { useEffect } from 'react'

declare global {
  interface Window {
    /* eslint-disable-next-line */
    zE: any
  }
}

export const Support = () => {
  useEffect(() => {
    window?.zE('messenger', 'show')
  }, [])
  return null
}
