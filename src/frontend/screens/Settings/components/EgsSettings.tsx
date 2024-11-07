import React, { useContext, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import ContextProvider from 'frontend/state/ContextProvider'
import useSetting from 'frontend/hooks/useSetting'
import {
  InfoBox,
  TextInputWithIconField,
  ToggleSwitch
} from 'frontend/components/UI'
import libraryState from 'frontend/state/libraryState'
import { Button } from '@hyperplay/ui'

const EgsSettings = () => {
  const { t } = useTranslation()
  const [isSyncing, setIsSyncing] = useState(false)
  const { platform, showDialogModal } = useContext(ContextProvider)
  const [egsPath, setEgsPath] = useSetting('egsLinkedPath', '')
  const isLinked = Boolean(egsPath.length)
  const isWindows = platform === 'win32'

  async function handleSync() {
    setIsSyncing(true)
    if (isLinked) {
      return window.api.egsSync('unlink').then(async () => {
        showDialogModal({
          showDialog: true,
          message: t('message.unsync'),
          title: 'EGS Sync'
        })
        setEgsPath('')
        setIsSyncing(false)
        libraryState.refreshLibrary({ runInBackground: false })
      })
    }

    return window.api.egsSync(egsPath).then(async (res: string) => {
      if (res === 'Error') {
        setIsSyncing(false)
        showDialogModal({
          showDialog: true,
          type: 'ERROR',
          message: t('box.sync.error'),
          title: t('box.error.title', 'Error')
        })
        setEgsPath('')
        return
      }
      showDialogModal({
        showDialog: true,
        message: t('message.sync'),
        title: 'EGS Sync'
      })

      setIsSyncing(false)
      setEgsPath(isWindows ? 'windows' : egsPath)
      libraryState.refreshLibrary({ runInBackground: false })
    })
  }

  function handleEgsFolder() {
    if (isLinked) {
      return
    }
    window.api
      .openDialog({
        buttonLabel: t('box.choose'),
        properties: ['openDirectory'],
        title: t('box.choose-egs-prefix')
      })
      .then((path) => setEgsPath(path || ''))
  }

  return (
    <>
      {!isWindows && (
        <TextInputWithIconField
          label={t('setting.egs-sync')}
          extraClass="withRightButton"
          htmlId="set_epic_sync_path"
          placeholder={t('placeholder.egs-prefix')}
          value={egsPath}
          disabled={isLinked}
          onChange={(event) => setEgsPath(event.target.value)}
          icon={
            !egsPath.length ? (
              <FontAwesomeIcon
                icon={faFolderOpen}
                data-testid="setEpicSyncPathButton"
                style={{
                  color: isLinked ? 'transparent' : 'currentColor'
                }}
              />
            ) : (
              <FontAwesomeIcon
                data-testid="setEpicSyncPathBackspace"
                style={
                  isLinked
                    ? { color: 'transparent', pointerEvents: 'none' }
                    : { color: '#B0ABB6' }
                }
                icon={faBackspace}
              />
            )
          }
          onIconClick={
            !egsPath.length
              ? handleEgsFolder
              : () => (isLinked ? '' : setEgsPath(''))
          }
          afterInput={
            <>
              <span className="rightButton">
                <Button
                  data-testid="syncButton"
                  onClick={async () => handleSync()}
                  disabled={isSyncing || !egsPath.length}
                  style={{ display: 'flex', marginTop: '27px' }}
                >
                  {`${
                    isLinked
                      ? t('button.unsync')
                      : isSyncing
                      ? t('button.syncing')
                      : t('button.sync')
                  }`}
                </Button>
              </span>
            </>
          }
        />
      )}
      <div>
        {!isWindows && (
          <InfoBox text="infobox.help">{t('help.general')}</InfoBox>
        )}
      </div>
      {isWindows && (
        <ToggleSwitch
          htmlId="syncToggle"
          value={isLinked}
          handleChange={handleSync}
          title={t('setting.egs-sync')}
        />
      )}
    </>
  )
}

export default EgsSettings
