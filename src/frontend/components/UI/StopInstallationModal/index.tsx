import React, { useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from 'frontend/components/UI/Dialog'
import { useTranslation } from 'react-i18next'
import { Button, Checkbox } from '@hyperplay/ui'
import { GameInfo, InstallProgress } from 'common/types'
const storage: Storage = window.localStorage

interface StopInstallProps {
  onClose: () => void
  installPath: string | undefined
  folderName: string
  gameInfo: GameInfo
  progress: InstallProgress
  status?: string
}

export default function StopInstallationModal(props: StopInstallProps) {
  const { t } = useTranslation('gamepage')
  const checkbox = useRef<HTMLInputElement>(null)

  const { runner, title, app_name, account_name } = props.gameInfo
  const isExtracting = props.status === 'extracting'
  const isPatching = props.status === 'patching'

  const showCheckbox =
    !isPatching && !isExtracting && account_name !== 'marketwars'

  return (
    <Dialog onClose={props.onClose} showCloseButton>
      <DialogHeader onClose={props.onClose}>
        {isExtracting
          ? t(
              'gamepage:box.stopExtraction.title',
              'Do you want to cancel the Extraction?'
            )
          : t(
              'gamepage:box.stopInstall.title',
              'Do you want to cancel the Download?'
            )}
      </DialogHeader>
      <DialogContent className="body dialogContent">
        {showCheckbox ? (
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
        ) : null}
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
              storage.setItem(app_name, JSON.stringify(latestProgress))

              if (isExtracting) {
                window.api.cancelExtraction(app_name)

                return
              }

              window.api.cancelDownload(false)
            }
            // if user does not want to keep downloaded files but still wants to cancel download
            else {
              props.onClose()

              if (isExtracting) {
                window.api.cancelExtraction(app_name)
              } else {
                window.api.cancelDownload(true)
              }

              window.api.trackEvent({
                event: 'Game Install Canceled',
                properties: {
                  store_name: runner,
                  game_title: title,
                  game_name: app_name
                }
              })

              storage.removeItem(app_name)
            }
          }}
        >
          {t('box.yesCancel', 'Yes, cancel')}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
