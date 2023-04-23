import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from 'frontend/components/UI/Dialog'
import { useTranslation } from 'react-i18next'
import { Button } from '@hyperplay/ui'
import { sendKill } from 'frontend/helpers'
import { InstallProgress, Runner } from 'common/types'
const storage: Storage = window.localStorage

interface StopInstallProps {
  onClose: () => void
  installPath: string
  folderName: string
  appName: string
  runner: Runner
  progress: InstallProgress
}

export default function StopInstallationModal(props: StopInstallProps) {
  const { t } = useTranslation('gamepage')
  return (
    <Dialog onClose={props.onClose} showCloseButton>
      <DialogHeader onClose={props.onClose}>
        {t('gamepage:box.stopInstall.title')}
      </DialogHeader>
      <DialogContent className="body dialogContent">
        {t('gamepage:box.stopInstall.message')}
      </DialogContent>
      <DialogFooter>
        <Button
          type="tertiary"
          size="large"
          onClick={async () => {
            props.onClose()
            await sendKill(props.appName, props.runner)
            storage.removeItem(props.appName)
            window.api.removeFolder([props.installPath, props.folderName])
          }}
        >
          {t('box.no')}
        </Button>
        <Button
          type="secondary"
          size="large"
          onClick={async () => {
            props.onClose()
            storage.setItem(
              props.appName,
              JSON.stringify({ ...props.progress, folder: props.installPath })
            )
            sendKill(props.appName, props.runner)
          }}
        >
          {t('box.yes')}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
