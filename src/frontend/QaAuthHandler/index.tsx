import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Button } from '@hyperplay/ui'
import authStore from 'frontend/store/AuthStore'

const QaAuthHandler = function () {
  const [showHiddenTextBox, setShowHiddenTextBox] = useState(false)
  const [authToken, setAuthToken] = useState('')
  useEffect(() => {
    const rmListener = window.api.handleShowHiddenQaAuthTextBox(() =>
      setShowHiddenTextBox(true)
    )
    return rmListener
  }, [])

  return showHiddenTextBox ? (
    <div className={styles.textBox}>
      <div className="title">Enter your auth token:</div>
      <input
        type="text"
        onChange={(ev) => setAuthToken(ev.currentTarget.value)}
      />
      <Button
        size="small"
        onClick={() => {
          authStore.setAuthToken(authToken)
          setShowHiddenTextBox(false)
        }}
      >
        Submit
      </Button>
    </div>
  ) : (
    <></>
  )
}

export default QaAuthHandler
