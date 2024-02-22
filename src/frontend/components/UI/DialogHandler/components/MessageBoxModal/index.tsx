import './index.css'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from 'frontend/components/UI/Dialog'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { DialogType, ButtonOptions } from 'common/types'
import { Button } from '@hyperplay/ui'

interface MessageBoxModalProps {
  title: string
  message: string
  onClose: () => void
  buttons: Array<ButtonOptions>
  type: DialogType
  showCheckbox?: boolean
  checkboxLabel?: string
  checkboxValue?: boolean
}

const MessageBoxModal: React.FC<MessageBoxModalProps> = function (props) {
  const { t } = useTranslation()
  const getButtons = function () {
    const allButtons = []
    for (let i = 0; i < props.buttons.length; ++i) {
      allButtons.push(
        <Button
          type={i === props.buttons.length - 1 ? 'secondary' : 'tertiary'}
          size="large"
          onClick={() => {
            props.onClose()
            props.buttons[i].onClick?.()
          }}
          key={'messageBoxModalButton_' + i.toString()}
        >
          {props.buttons[i].text}
        </Button>
      )
    }
    return allButtons
  }

  const getContent = () => {
    switch (props.type) {
      case 'ERROR':
        return (
          <>
            <div className="errorDialog contentHeader">
              {t('error', 'Error')}:
            </div>
            <div className="errorDialog error-box">
              {props.message.split('\n').map((line, key) => {
                return <p key={key}>{line}</p>
              })}
            </div>
          </>
        )
        break
      default:
        return props.message
        break
    }
  }

  return (
    <Dialog
      onClose={props.onClose}
      showCloseButton
      className={classNames({ errorDialog: props.type === 'ERROR' })}
    >
      <DialogHeader onClose={props.onClose}>{props.title}</DialogHeader>
      <DialogContent className="body dialogContent">
        {getContent()}
        {props.showCheckbox && (
          <div className="checkbox">
            <input
              type="checkbox"
              checked={props.checkboxValue ? true : false}
            >
              {props.checkboxLabel}
            </input>
          </div>
        )} 
      </DialogContent>

      <DialogFooter>{getButtons()}</DialogFooter>
    </Dialog>
  )
}

export default MessageBoxModal
