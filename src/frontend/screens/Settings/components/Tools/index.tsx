import './index.scss'

import React, { useContext, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { getGameInfo } from 'frontend/helpers'

import { ProgressDialog } from 'frontend/components/UI/ProgressDialog'
import SettingsContext from '../../SettingsContext'
import ContextProvider from 'frontend/state/ContextProvider'
import { Button } from '@hyperplay/ui'

export default function Tools() {
  const { t } = useTranslation()
  const [winecfgRunning, setWinecfgRunning] = useState(false)
  const [winetricksRunning, setWinetricksRunning] = useState(false)
  const [progress, setProgress] = useState<string[]>([])
  const { appName, runner, isDefault } = useContext(SettingsContext)
  const { platform } = useContext(ContextProvider)
  const isWindows = platform === 'win32'

  if (isDefault || isWindows) {
    return <></>
  }

  type Tool = 'winecfg' | 'winetricks' | string
  async function callTools(tool: Tool, exe?: string) {
    if (tool === 'winetricks') {
      setWinetricksRunning(true)
    }
    if (tool === 'winecfg') {
      setWinecfgRunning(true)
    }
    await window.api.callTool({
      tool,
      exe,
      appName,
      runner
    })
    setWinetricksRunning(false)
    setWinecfgRunning(false)
  }

  useEffect(() => {
    const onProgress = (e: Electron.IpcRendererEvent, messages: string[]) => {
      setProgress(messages)
    }

    const removeWinetricksProgressListener =
      window.api.handleProgressOfWinetricks(onProgress)

    //useEffect unmount
    return removeWinetricksProgressListener
  }, [])

  useEffect(() => {
    setProgress([])
  }, [winetricksRunning])

  const handleRunExe = async () => {
    let exe = ''
    const gameinfo = await getGameInfo(appName, runner)
    if (!gameinfo) return
    const defaultPath =
      gameinfo.runner === 'sideload' ? undefined : gameinfo.install.install_path

    const path = await window.api.openDialog({
      buttonLabel: t('box.select.button', 'Select'),
      properties: ['openFile'],
      title: t('box.runexe.title', 'Select EXE to Run'),
      defaultPath
    })
    if (path) {
      exe = path
      callTools('runExe', exe)
    }
  }

  async function dropHandler(ev: React.DragEvent<HTMLSpanElement>) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[0].kind === 'file') {
        const exe = ev.dataTransfer.items[0].getAsFile()?.path
        if (exe) {
          return callTools('runExe', exe)
        }
      }
    }
    return
  }

  function dragOverHandler(ev: React.DragEvent<HTMLSpanElement>) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()
  }

  return (
    <>
      <div data-testid="toolsSettings" className="settingsTools">
        {winetricksRunning && (
          <ProgressDialog
            title={'Winetricks'}
            progress={progress}
            showCloseButton={false}
            onClose={() => {
              return
            }}
          />
        )}
        <div className="toolsWrapper">
          <Button
            data-testid="wineCFG"
            className={classNames('buttonOutline', { active: winecfgRunning })}
            onClick={async () => callTools('winecfg')}
            type="secondary"
            size="medium"
          >
            <span className="toolTitle">Winecfg</span>
          </Button>
          <Button
            data-testid="wineTricks"
            className={classNames('buttonOutline', {
              active: winetricksRunning
            })}
            onClick={async () => callTools('winetricks')}
            type="secondary"
            size="medium"
          >
            <span className="toolTitle">Winetricks</span>
          </Button>
          <Button
            onDrop={(ev) => {
              dropHandler(ev)
            }}
            onDragOver={(ev) => dragOverHandler(ev)}
            className="buttonOutlineDrag"
            onClick={handleRunExe}
            type="tertiary"
            size="medium"
          >
            {t('setting.runexe.title')}
            <br />
            <span>{t('setting.runexe.message')}</span>
          </Button>
        </div>
      </div>
    </>
  )
}
