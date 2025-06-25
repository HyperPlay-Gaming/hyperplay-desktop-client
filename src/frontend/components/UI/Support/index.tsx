import React, { useEffect } from 'react'

declare global {
  interface Window {
    /* eslint-disable-next-line */
    zE: any
  }
}

export const Support = () => {
  useEffect(() => {
    window.zE?.('messenger:on', 'unreadMessages', (count: number) => {
      console.log('count ', count)
    })
  })
  return (
    <>
      <button onClick={() => window.zE('messenger', 'open')}>Support</button>
    </>
  )
}
