import React from 'react'
import SelectField from '../SelectField'
import { GameInfo } from 'common/types'
import { translateChannelName } from 'frontend/screens/Library/constants'
import { useTranslation } from 'react-i18next'

interface ChannelNameSelectionProps {
  channelNameToInstall: string
  setChannelNameToInstall(name: string): void
  gameInfo: GameInfo
}

export default function ChannelNameSelection({
  channelNameToInstall,
  setChannelNameToInstall,
  gameInfo
}: ChannelNameSelectionProps) {
  const { t } = useTranslation('gamepage')
  return (
    <>
      <SelectField
        label={`${t('game.selectChannelName', 'Select Channel Name')}:`}
        htmlId="channelNameSelect"
        value={channelNameToInstall}
        onChange={(e) => setChannelNameToInstall(e.target.value)}
      >
        {gameInfo?.channels !== undefined
          ? Object.keys(gameInfo.channels).map((p, i) => {
              if (!gameInfo.channels) return <div>error</div>
              const channel_i = gameInfo.channels[p]
              return (
                <option value={p} key={i}>
                  {translateChannelName(channel_i.channel_name, t)}
                </option>
              )
            })
          : null}
      </SelectField>
    </>
  )
}
