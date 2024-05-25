import React from 'react'
import DownloadManagerHeader from '../../DownloadManagerHeader'
import DownloadManagerItem from '../DownloadManagerItem'
import { DMQueueElement } from 'common/types'
import styles from './index.module.scss'

export interface DownloadTableProps {
  elements: DMQueueElement[]
  time: 'started' | 'finished' | 'queued'
}

export function DownloadTable({ elements, time }: DownloadTableProps) {
  return (
    <table className={styles.dmItemList}>
      <DownloadManagerHeader time={time} />
      {elements.map((el, key) => (
        <DownloadManagerItem key={key} element={el} current={false} />
      ))}
    </table>
  )
}
