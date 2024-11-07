import { TextInput, TextInputProps } from '@hyperplay/ui'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './index.module.scss'
import { captureException } from '@sentry/electron'

export interface AccessCodeInputProps {
  licenseConfigId?: number
  accessCode: string
  inputProps: TextInputProps
  channelRequiresAccessCode?: boolean
  setAccessCodeVerified: (val: boolean) => void
}

export function AccessCodeInput({
  inputProps,
  licenseConfigId,
  accessCode,
  channelRequiresAccessCode,
  setAccessCodeVerified
}: AccessCodeInputProps) {
  const { t } = useTranslation()
  const [errorText, setErrorText] = useState('')
  const [successText, setSuccessText] = useState('')

  useEffect(() => {
    async function validateAccessCode() {
      if (licenseConfigId === undefined) {
        const errMsg =
          'Could not validate access code input since license config id is undefined'
        window.api.logError(errMsg)
        setErrorText(
          t(
            'hyperplay.accesscodes.error.licenseUndefined',
            'Could not validate access code. Please check your internet access or firewall settings.'
          )
        )
        captureException(errMsg, {
          tags: { event: 'validateAccessCode Error' }
        })
        return
      }

      const result = await window.api.checkHyperPlayAccessCode(
        licenseConfigId,
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
          t('hyperplay.accesscodes.error.validation', 'Access code is invalid')
        )
      }
    }

    if (accessCode && channelRequiresAccessCode) validateAccessCode()
    else {
      setErrorText('')
      setSuccessText('')
      setAccessCodeVerified(false)
    }
  }, [accessCode, licenseConfigId, channelRequiresAccessCode])

  return (
    <>
      <TextInput
        placeholder="Enter access code"
        label="Enter Access code"
        error={errorText}
        {...inputProps}
      />
      {successText && (
        <div className={`caption ${styles.successText}`}>{successText}</div>
      )}
    </>
  )
}
