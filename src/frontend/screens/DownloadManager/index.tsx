import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DMQueueElement, DownloadManagerState } from 'common/types'
import { UpdateComponent } from 'frontend/components/UI'
import ProgressHeader from './components/ProgressHeader'
import DownloadManagerHeader from './DownloadManagerHeader'
import { DMQueue } from 'frontend/types'
import DownloadManagerItem from './components/DownloadManagerItem'
import { Tabs, getTabsClassNames } from '@hyperplay/ui'
import styles from './index.module.scss'

export default React.memo(function DownloadManager(): JSX.Element | null {
  const { t } = useTranslation()
  const [refreshing, setRefreshing] = useState(false)
  const [state, setState] = useState<DownloadManagerState>('idle')
  const [plannendElements, setPlannendElements] = useState<DMQueueElement[]>([])
  const [currentElement, setCurrentElement] = useState<DMQueueElement>()
  const [finishedElem, setFinishedElem] = useState<DMQueueElement[]>()

  const appName = currentElement?.params?.appName ?? ''

  useEffect(() => {
    setRefreshing(true)
    window.api.getDMQueueInformation().then(({ elements, state }: DMQueue) => {
      setCurrentElement(elements[0])
      setPlannendElements([...elements.slice(1)])
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
          setPlannendElements([...elements.slice(1)])
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
  }, [plannendElements.length, appName])

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
    <div className="contentContainer">
      <h3
        style={{
          textAlign: 'left'
        }}
      >
        {t('download-manager.title_dm', 'Download Manager')}
      </h3>
      <Tabs
        defaultValue="downloading"
        classNames={getTabsClassNames({}, { list: 'outline' })}
      >
        <Tabs.List>
          <Tabs.Tab value="downloading">Downloading</Tabs.Tab>
          <Tabs.Tab value="queued">Queued</Tabs.Tab>
          <Tabs.Tab value="downloaded">Downloaded</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="downloading">
          <div className={styles.downloadManager}>
            <div
              style={!currentElement ? { backgroundColor: 'transparent' } : {}}
              className={styles.downloadList}
            >
              <div className={styles.dmItemList}>
                <DownloadManagerHeader time="started" />
                <DownloadManagerItem
                  element={currentElement}
                  current={true}
                  state={state}
                />
              </div>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="queued">
          <>
            <div className={styles.dmItemList}>
              <DownloadManagerHeader time="queued" />
              {plannendElements.length > 0 ? (
                plannendElements.map((el) => (
                  <DownloadManagerItem
                    key={el.params.appName}
                    element={el}
                    current={false}
                  />
                ))
              ) : (
                <DownloadManagerItem current={false} />
              )}
            </div>
          </>
        </Tabs.Panel>
        <Tabs.Panel value="downloaded">
          <div className={styles.downloadManager}>
            <div className={styles.downloadList}>
              <div className={styles.dmItemList}>
                <DownloadManagerHeader time="finished" />
                {doneElements.map((el, key) => (
                  <DownloadManagerItem key={key} element={el} current={false} />
                ))}
              </div>
            </div>
          </div>
        </Tabs.Panel>
      </Tabs>
      <ProgressHeader state={state} appName={appName} />
    </div>
  )
})
