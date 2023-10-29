import React, { useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from 'frontend/components/UI/Dialog'
import { useTranslation } from 'react-i18next'
import { Button, Checkbox } from '@hyperplay/ui'
import { InstallProgress, Runner } from 'common/types'
const storage: Storage = window.localStorage

interface StopInstallProps {
  onClose: () => void
  installPath: string | undefined
  folderName: string
  appName: string
  runner: Runner
  progress: InstallProgress
  status: string
}

export default function StopInstallationModal(props: StopInstallProps) {
  const { t } = useTranslation('gamepage')
  const checkbox = useRef<HTMLInputElement>(null)
  const isExtracting = props.status === 'extracting';

  return (
    <Dialog onClose={props.onClose} showCloseButton>
      <DialogHeader onClose={props.onClose}>
        {t('gamepage:box.stopInstall.title')}
      </DialogHeader>
      <DialogContent className="body dialogContent">
        <Checkbox
          ref={checkbox}
          onClick={() => console.log(checkbox.current?.checked)}
          defaultChecked={false}
          type="secondary"
        >
          <div className="body">
            {t(
              'gamepage:box.stopInstall.keepFilesMessage',
              'Check here if you want to keep the download files after canceling.'
            )}
          </div>
        </Checkbox>
      </DialogContent>
      <DialogFooter>
        <Button
          type="tertiary"
          size="large"
          onClick={async () => {
            props.onClose()
          }}
        >
          {t('box.no')}
        </Button>
        <Button
          type="secondary"
          size="large"
          onClick={async () => {
            console.log('isExtracting', isExtracting)
            // if user wants to keep downloaded files and cancel download
            if (checkbox.current && checkbox.current.checked) {
              props.onClose()

              /* this sets the latest progress to window.localStorage so that when installing again,
               * it will auto fill the installation modal with the previous folder install path and download progress
               */
              const latestProgress = {
                ...props.progress,
                folder: props.installPath
              }
              storage.setItem(props.appName, JSON.stringify(latestProgress))

              if (isExtracting) {
                window.api.cancelExtraction(props.appName)

                return 
              }

              window.api.cancelDownload(false)
            }
            // if user does not want to keep downloaded files but still wants to cancel download
            else {
              props.onClose()

              if (isExtracting) {
                window.api.cancelExtraction(props.appName)
              } else {
                window.api.cancelDownload(true)
              }

              storage.removeItem(props.appName)
            }
          }}
        >
          {t('box.yesCancel', 'Yes, cancel')}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
