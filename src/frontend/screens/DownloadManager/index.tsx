import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DMQueueElement, DownloadManagerState } from 'common/types'
import ProgressHeader from './components/ProgressHeader'
import { DMQueue } from 'frontend/types'
import { Background, Button, Tabs, getTabsClassNames } from '@hyperplay/ui'
import styles from './index.module.scss'
import { DownloadTable } from './components/DownloadTable'
import { downloadManagerStore } from 'frontend/helpers/electronStores'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default React.memo(function DownloadManager(): JSX.Element | null {
  const { t } = useTranslation()
  const [state, setState] = useState<DownloadManagerState>('idle')
  const [queuedElements, setQueuedElements] = useState<DMQueueElement[]>([])
  const [currentElement, setCurrentElement] = useState<DMQueueElement>()
  const [finishedElem, setFinishedElem] = useState<DMQueueElement[]>()
  const [activeTab, setActiveTab] = useState<string | null>('downloading')

  const appName = currentElement?.params?.appName ?? ''

  useEffect(() => {
    window.api.getDMQueueInformation().then(({ elements, state }: DMQueue) => {
      setCurrentElement(elements[0])
      setQueuedElements([...elements.slice(1)])
      setState(state)
    })

    const removeHandleDMQueueInformation = window.api.handleDMQueueInformation(
      (
        e: Electron.IpcRendererEvent,
        elements: DMQueueElement[],
        state: DownloadManagerState
      ) => {
        if (elements) {
          setCurrentElement(elements[0])
          setQueuedElements([...elements.slice(1)])
          setState(state)
        }
      }
    )

    return () => {
      removeHandleDMQueueInformation()
    }
  }, [finishedElem])

  useEffect(() => {
    window.api.getDMQueueInformation().then(({ finished }: DMQueue) => {
      setFinishedElem(finished)
    })
  }, [queuedElements.length, appName])

  // Track the screen view once and only once
  useEffect(() => {
    window.api.trackScreen('Download Manager')
  }, [])

  const doneElements =
    (finishedElem?.length &&
      finishedElem.sort((a, b) => {
        // Sort by endTime
        return b.endTime - a.endTime
      })) ||
    []

  const handleClearList = () => {
    setFinishedElem([])
    downloadManagerStore.set('finished', [])
  }

  const showClearListButton = activeTab === 'downloaded'

  /*
    Other Keys:
    t('queue.label.empty', 'Nothing to download')
    t('download-manager.install-type.install', 'Install')
    t('download-manager.install-type.update', 'Update')
    */

  return (
    <>
      <Background style={{ position: 'absolute' }}></Background>
      <div className={'contentContainer'}>
        <h3 className={styles.title}>
          {t('download-manager.title_dm', 'Download Manager')}
        </h3>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          classNames={getTabsClassNames(
            { list: styles.tabsList, panel: styles.tabsPanel },
            { list: 'outline' }
          )}
        >
          {showClearListButton ? (
            <Button
              className={styles.clearButton}
              onClick={() => handleClearList()}
              type="tertiary"
              leftIcon={<FontAwesomeIcon icon={faTrash} />}
              size="small"
            >
              {t('queue.label.clear', 'Clear List')}
            </Button>
          ) : null}
          <Tabs.List>
            <Tabs.Tab value="downloading">Downloading</Tabs.Tab>
            <Tabs.Tab value="queued">Queued</Tabs.Tab>
            <Tabs.Tab value="downloaded">Downloaded</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="downloading">
            <div className={styles.downloadManager}>
              <div
                style={
                  !currentElement ? { backgroundColor: 'transparent' } : {}
                }
                className={styles.downloadList}
              >
                <DownloadTable
                  elements={currentElement ? [currentElement] : []}
                  time="started"
                  isCurrent={true}
                  state={state}
                />
              </div>
            </div>
            <ProgressHeader state={state} appName={appName} />
          </Tabs.Panel>

          <Tabs.Panel value="queued">
            <div className={styles.dmItemList}>
              <DownloadTable elements={queuedElements} time="queued" />
              {queuedElements.length === 0 && (
                <h5 className={styles.empty}>
                  {t('queue.label.empty.queue', 'Nothing to download')}
                </h5>
              )}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="downloaded">
            <div className={styles.downloadManager}>
              <div className={styles.downloadList}>
                <DownloadTable elements={doneElements} time="finished" />
                {doneElements.length === 0 && (
                  <h5 className={styles.empty}>
                    {t('queue.label.empty.finished', 'Nothing downloaded')}
                  </h5>
                )}
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  )
})
