import React from 'react'
import DownloadManagerHeader from '../../DownloadManagerHeader'
import DownloadManagerItem from '../DownloadManagerItem'
import { DMQueueElement, DownloadManagerState } from 'common/types'
import styles from './index.module.scss'

export interface DownloadTableProps {
  elements: DMQueueElement[]
  time: 'started' | 'finished' | 'queued'
  isCurrent?: boolean
  state?: DownloadManagerState
}

export function DownloadTable({
  elements,
  time,
  isCurrent,
  state
}: DownloadTableProps) {
  return (
    <table className={styles.dmItemList}>
      <DownloadManagerHeader time={time} />
      {elements.map((el) => (
        <DownloadManagerItem
          key={el.params.appName}
          element={el}
          current={!!isCurrent}
          state={state}
        />
      ))}
    </table>
  )
}
