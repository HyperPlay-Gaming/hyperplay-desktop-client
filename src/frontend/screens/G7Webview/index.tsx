import React from 'react'
import WebView from '../WebView'
import { CircularButton, Images } from '@hyperplay/ui'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

export default function G7Webview() {
  const navigate = useNavigate()

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <CircularButton onClick={() => navigate('/quests')}>
          <Images.ArrowLeft />
        </CircularButton>
      </div>
      <WebView
        key="game7Portal"
        classNames={{
          root: styles.webviewRoot,
          webview: styles.webviewElement,
          webviewControls: styles.webviewControls
        }}
      />
    </div>
  )
}
