import * as React from 'react'

import { useTranslation } from 'react-i18next'

import { timestampStore } from 'frontend/helpers/electronStores'

import './index.css'

type Props = {
  game: string
}

type TimeStamp = {
  firstPlayed: Date
  lastPlayed: Date
  totalPlayed: number
}

function TimeContainer({ game }: Props) {
  const { t } = useTranslation('gamepage')
  const hasPlayed = timestampStore.has(game)

  if (!hasPlayed) {
    return (
      <>
        <div className="subtitle">{`${t(
          'game.lastPlayed',
          'Last Played'
        )}:`}</div>
        <div className="col2-item italic">{`${t(
          'game.neverPlayed',
          'Never'
        )}`}</div>
      </>
    )
  }

  const tsInfo = timestampStore.get(game) as TimeStamp
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  const firstPlayed = new Date(tsInfo.firstPlayed)
  const firstDate = new Intl.DateTimeFormat(undefined, options).format(
    firstPlayed
  )
  const lastPlayed = tsInfo.lastPlayed ? new Date(tsInfo.lastPlayed) : null
  const totalPlayed = tsInfo.totalPlayed
    ? convertMinsToHrsMins(tsInfo.totalPlayed)
    : null
  const lastDate = new Intl.DateTimeFormat(undefined, options).format(
    lastPlayed || new Date()
  )

  return (
    <>
      <div className="subtitle">{`${t(
        'game.firstPlayed',
        'First Played'
      )}:`}</div>
      <div className="col2-item italic">{firstDate}</div>

      {lastPlayed && (
        <>
          <div className="subtitle">{`${t(
            'game.lastPlayed',
            'Last Played'
          )}:`}</div>
          <div className="col2-item italic">{lastDate}</div>
        </>
      )}
      <div className="subtitle">{`${t(
        'game.totalPlayed',
        'Time Played'
      )}:`}</div>
      <div className="col2-item italic">{`${totalPlayed}`}</div>
    </>
  )
}

const convertMinsToHrsMins = (mins: number) => {
  let h: string | number = Math.floor(mins / 60)
  let m: string | number = mins % 60
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  return `${h}:${m}`
}

export default TimeContainer
