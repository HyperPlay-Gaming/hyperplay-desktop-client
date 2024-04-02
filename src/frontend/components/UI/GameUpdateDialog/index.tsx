import React, { useEffect, useState } from 'react'
import { Dialog } from 'frontend/components/UI/Dialog'
import TextInputField from '../TextInputField'
import { useTranslation } from 'react-i18next'
import styles from './index.module.scss'
import { Button } from '@hyperplay/ui'
import updateState from 'frontend/state/UpdateState'
import gameRequiresAccessCodes from 'frontend/helpers/gameRequiresAccessCodes'

export default function GameUpdateDialog({ onClose }: { onClose: () => void }) {
  const [accessCode, setAccessCode] = useState('')
  const [accessCodeVerified, setAccessCodeVerified] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [successText, setSuccessText] = useState('')
  const { t } = useTranslation()

  const gameInfo = updateState.gameInfo
  const channelName = gameInfo?.install.channelName
  const selectedChannel = gameInfo?.channels?.[channelName ?? '']
  const channelRequiresAccessCode = gameInfo
    ? gameRequiresAccessCodes(gameInfo, channelName ?? '')
    : false

  useEffect(() => {
    async function validateAccessCode() {
      if (selectedChannel?.channel_id !== undefined) {
        const result = await window.api.checkHyperPlayAccessCode(
          selectedChannel?.license_config.id,
          accessCode
        )

        setAccessCodeVerified(result.valid)

        if (result.valid) {
          setErrorText('')
          setSuccessText(
            t(
              'hyperplay.accesscodes.success.validation',
              'Success! Access code is valid'
            )
          )
        } else {
          setSuccessText('')
          setErrorText(
            t(
              'hyperplay.accesscodes.error.validation',
              'Access code is invalid'
            )
          )
        }
      }
    }

    if (accessCode && channelRequiresAccessCode) validateAccessCode()
    else {
      setErrorText('')
      setSuccessText('')
      setAccessCodeVerified(false)
    }
  }, [selectedChannel, accessCode])

  const enableCTAButton =
    !channelRequiresAccessCode ||
    (channelRequiresAccessCode && accessCodeVerified)

  function updateClick() {
    if (gameInfo) {
      window.api.updateGame(gameInfo, accessCode)
      onClose()
    } else {
      setErrorText('Error during update!')
    }
  }

  return (
    <Dialog showCloseButton onClose={onClose} className={styles.dialog}>
      <div className="title">
        {t(
          'hyperplay.accesscodes.requirescode',
          'This game update requires an access code.'
        )}
      </div>
      <TextInputField
        placeholder={'Enter access code'}
        value={accessCode}
        onChange={(ev) => setAccessCode(ev.target.value)}
        htmlId="access_code_input"
        isError={!!errorText}
      ></TextInputField>
      {errorText && (
        <div className={`caption ${styles.errorText}`}>{errorText}</div>
      )}
      {successText && (
        <div className={`caption ${styles.successText}`}>{successText}</div>
      )}
      <Button
        type="secondary"
        disabled={!enableCTAButton}
        onClick={updateClick}
      >
        {t('button.update', 'Update')}
      </Button>
    </Dialog>
  )
}
