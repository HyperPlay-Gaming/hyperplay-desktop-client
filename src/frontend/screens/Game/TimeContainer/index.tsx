import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { timestampStore } from 'frontend/helpers/electronStores'

import './index.css'
import { Runner } from 'common/types'

type Props = {
  runner: Runner
  game: string
}

function TimeContainer({ runner, game }: Props) {
  const { t } = useTranslation('gamepage')
  const [tsInfo, setTsInfo] = useState(timestampStore.get_nodefault(game))
  useEffect(() => {
    async function fetchPlaytime() {
      const playTime = await window.api.fetchPlaytimeFromServer(runner, game)
      if (!playTime) {
        return
      }
      if (tsInfo?.totalPlayed) {
        if (tsInfo.totalPlayed < playTime) {
          const newObject = { ...tsInfo, totalPlayed: playTime }
          timestampStore.set(game, newObject)
          setTsInfo(newObject)
        }
      } else {
        const newObject = {
          firstPlayed: '',
          lastPlayed: '',
          totalPlayed: playTime
        }
        timestampStore.set(game, newObject)
        setTsInfo(newObject)
      }
    }

    fetchPlaytime()
  }, [])

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
  const firstPlayed = tsInfo.firstPlayed
    ? new Date(tsInfo.firstPlayed)
    : undefined
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
