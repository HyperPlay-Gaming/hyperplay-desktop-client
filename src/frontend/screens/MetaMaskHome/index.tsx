import React, { useEffect, useRef, useState } from 'react'
import MetaMaskHomeStyles from './index.module.css'
import { wait } from '@hyperplay/utils'

interface MetaMaskHomeProps {
  path?: string
}

let initialized = false

const MetaMaskHome = function ({ path = 'home.html' }: MetaMaskHomeProps) {
  const [extId, setExtId] = useState('')
  const hash = new URL(window.location.href).hash

  useEffect(() => {
    window.api.getExtensionId().then((id) => setExtId(id))
  }, [])
  const trueAsStr = 'true' as unknown as boolean | undefined

  const webviewRef = useRef<Electron.WebviewTag>(null)

  //only should execute when app first launched if specific cli value passed
  useEffect(() => {
    window.api.getExtensionId().then((id) => setExtId(id))

    async function initMM() {
      console.log('initializing metamask')
      await wait(5000)
      async function clickInWebview(dataTestId: string) {
        await webviewRef.current?.executeJavaScript(
          `document.querySelectorAll('[data-testid="${dataTestId}"]')[0].click()`
        )
        await wait(1000)
      }

      async function executeCommandInWebview(cmd: string) {
        await webviewRef.current?.executeJavaScript(cmd)
        await wait(200)
      }

      await clickInWebview('onboarding-terms-checkbox')
      await clickInWebview('onboarding-import-wallet')
      await clickInWebview('metametrics-i-agree')

      await webviewRef.current?.sendInputEvent({
        x: 500,
        y: 500,
        type: 'mouseDown'
      })
      await wait(200)

      await webviewRef.current?.sendInputEvent({
        x: 500,
        y: 500,
        type: 'mouseUp'
      })
      await wait(1000)

      const words = ['true', 'mushroom', 'flush', 'soda', 'cross', 'cheese', 'tissue', 'section', 'survey', 'night', 'creek', 'taxi']

      for (let i = 0; i < words.length; i++) {
        await executeCommandInWebview(
          `document.querySelectorAll('[data-testid="import-srp__srp-word-${i}"]')[0].focus()`
        )
        await wait(50)
        await webviewRef.current?.insertText(words[i])
      }

      await clickInWebview('import-srp-confirm')

      await executeCommandInWebview(
        `document.querySelectorAll('[data-testid="create-password-new"]')[0].focus()`
      )
      await wait(1000)

      await webviewRef.current?.insertText('password')
      await wait(1000)

      await executeCommandInWebview(
        `document.querySelectorAll('[data-testid="create-password-confirm"]')[0].focus()`
      )

      await webviewRef.current?.insertText('password')
      await wait(1000)

      const dataIds = [
        'create-password-terms',
        'create-password-import',
        'onboarding-complete-done',
        'pin-extension-next',
        'pin-extension-done'
      ]

      for (const dataId of dataIds) {
        await clickInWebview(dataId)
        await wait(350)
      }

      // await webviewRef.current?.sendInputEvent({
      //   x: 500,
      //   y: 500,
      //   type: 'mouseDown'
      // })
      // await wait(1000)

      // await webviewRef.current?.sendInputEvent({
      //   x: 500,
      //   y: 500,
      //   type: 'mouseUp'
      // })
      // await wait(1000)

      webviewRef.current?.executeJavaScript(
        `document.getElementsByClassName('button')[1].click()`
      )
      await wait(1000)
      webviewRef.current?.executeJavaScript(
        `document.getElementsByClassName('button')[1].click()`
      )

      await wait(1000)
      clickInWebview('popover-close')
      webviewRef.current?.executeJavaScript(
        `document.querySelector('button.mm-box.mm-button-primary.mm-box--rounded-pill').click()`
      )

      for (let i = 0; i < 41; i++) {
        await clickInWebview('account-menu-icon')
        await clickInWebview('multichain-account-menu-popover-action-button')
        await clickInWebview('multichain-account-menu-popover-add-account')
        await wait(250)
        webviewRef.current?.executeJavaScript(
          `document.querySelector('button.mm-box.mm-button-primary.mm-box--rounded-pill').click()`
        )
        await wait(250)
      }
    }

    if (!initialized) {
      initialized = true
      initMM()
    }
  }, [])


  return (
    <>
      <div className={MetaMaskHomeStyles.homeDiv}>
        <webview
          className={MetaMaskHomeStyles.homeWebview}
          src={`chrome-extension://${extId}/${path}${hash.replace(
            '#/metamaskHome',
            ''
          )}`}
          allowpopups={trueAsStr}
          ref={webviewRef}
        />
      </div>
    </>
  )
}

export default MetaMaskHome
