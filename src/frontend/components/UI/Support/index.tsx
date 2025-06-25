import { Button, Images } from '@hyperplay/ui'
import React, { useEffect } from 'react'
import styles from './index.module.scss'

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
      <Button
        type="tertiary-neutral"
        size="icon"
        onClick={() => window.zE('messenger', 'open')}
      >
        <Images.QuestionMarkRounded className={styles.icon} />
      </Button>
    </>
  )
}
