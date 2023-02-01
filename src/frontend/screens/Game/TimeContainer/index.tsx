import React from 'react'

import { useTranslation } from 'react-i18next'

import { timestampStore } from 'frontend/helpers/electronStores'

import './index.css'

type Props = {
  game: string
}

function TimeContainer({ game }: Props) {
  const { t } = useTranslation('gamepage')
  const tsInfo = timestampStore.get_nodefault(game)

  if (!tsInfo) {
    return (
      <>
        <div className="hp-subtitle">{`${t(
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
  const totalPlayed =
    typeof tsInfo.totalPlayed === 'number'
      ? convertMinsToHrsMins(tsInfo.totalPlayed)
      : null

  const lastDate = new Intl.DateTimeFormat(undefined, options).format(
    lastPlayed || new Date()
  )

  return (
    <>
      <div className="hp-subtitle">{`${t(
        'game.firstPlayed',
        'First Played'
      )}:`}</div>
      <div className="col2-item italic">{firstDate}</div>

      {lastPlayed && (
        <>
          <div className="hp-subtitle">{`${t(
            'game.lastPlayed',
            'Last Played'
          )}:`}</div>
          <div className="col2-item italic">{lastDate}</div>
        </>
      )}
      <div className="hp-subtitle">{`${t(
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
