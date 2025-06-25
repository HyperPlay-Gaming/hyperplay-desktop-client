import { Button, Images } from '@hyperplay/ui'
import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import ContextProvider from 'frontend/state/ContextProvider'

declare global {
  interface Window {
    /* eslint-disable-next-line */
    zE: any
  }
}

export const Support = () => {
  const [count, setCount] = useState(0)
  const [modalIsShown, setModalIsShown] = useState(false)

  const { connectivity } = useContext(ContextProvider)
  const isOffline = connectivity.status !== 'online'

  useEffect(() => {
    window.zE?.('messenger:on', 'unreadMessages', (newCount: number) => {
      setCount(newCount)
    })
    window.zE?.('messenger:on', 'open', () => {
      setModalIsShown(true)
    })
    window.zE?.('messenger:on', 'close', () => {
      setModalIsShown(false)
    })
  }, [])
  return (
    <>
      <Button
        type="tertiary-neutral"
        size="icon"
        disabled={isOffline}
        onClick={() => {
          if (modalIsShown) {
            window.zE('messenger', 'close')
          } else {
            window.zE('messenger', 'open')
          }
        }}
      >
        <Images.QuestionMarkRounded className={styles.icon} />
        {count ? (
          <div className={classNames('eyebrow', styles.unreadCounter)}>
            {count}
          </div>
        ) : null}
      </Button>
    </>
  )
}
