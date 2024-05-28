import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DMQueueElement, DownloadManagerState } from 'common/types'
import { UpdateComponent } from 'frontend/components/UI'
import ProgressHeader from './components/ProgressHeader'
import { DMQueue } from 'frontend/types'
import { Background, Tabs, getTabsClassNames } from '@hyperplay/ui'
import styles from './index.module.scss'
import { DownloadTable } from './components/DownloadTable'

export default React.memo(function DownloadManager(): JSX.Element | null {
  const { t } = useTranslation()
  const [refreshing, setRefreshing] = useState(false)
  const [state, setState] = useState<DownloadManagerState>('idle')
  const [queuedElements, setQueuedElements] = useState<DMQueueElement[]>([])
  const [currentElement, setCurrentElement] = useState<DMQueueElement>()
  const [finishedElem, setFinishedElem] = useState<DMQueueElement[]>()

  const appName = currentElement?.params?.appName ?? ''

  useEffect(() => {
    setRefreshing(true)
    window.api.getDMQueueInformation().then(({ elements, state }: DMQueue) => {
      setCurrentElement(elements[0])
      setQueuedElements([...elements.slice(1)])
      setRefreshing(false)
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
  }, [])

  useEffect(() => {
    window.api.getDMQueueInformation().then(({ finished }: DMQueue) => {
      setFinishedElem(finished)
    })
  }, [queuedElements.length, appName])

  // Track the screen view once and only once
  useEffect(() => {
    window.api.trackScreen('Download Manager')
  }, [])

  if (refreshing) {
    return <UpdateComponent />
  }

  const doneElements =
    (finishedElem?.length &&
      finishedElem.sort((a, b) => {
        // Sort by endTime
        return b.endTime - a.endTime
      })) ||
    []

  /*
    Other Keys:
    t('queue.label.empty', 'Nothing to download')
    t('download-manager.install-type.install', 'Install')
    t('download-manager.install-type.update', 'Update')
    */

  return (
    <>
      <Background style={{ position: 'absolute' }}></Background>
      <div className="contentContainer">
        <h3 className={styles.title}>
          {t('download-manager.title_dm', 'Download Manager')}
        </h3>
        <Tabs
          defaultValue="downloading"
          classNames={getTabsClassNames(
            { list: styles.tabsList, panel: styles.tabsPanel },
            { list: 'outline' }
          )}
        >
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
          </Tabs.Panel>

          <Tabs.Panel value="queued">
            <div className={styles.dmItemList}>
              <DownloadTable elements={queuedElements} time="queued" />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="downloaded">
            <div className={styles.downloadManager}>
              <div className={styles.downloadList}>
                <DownloadTable elements={doneElements} time="finished" />
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
        <ProgressHeader state={state} appName={appName} />
      </div>
    </>
  )
})
