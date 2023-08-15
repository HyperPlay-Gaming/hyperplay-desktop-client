import React from 'react'
import SelectField from '../SelectField'
import { GameInfo } from 'common/types'
import { translateChannelName } from 'frontend/screens/Library/constants'
import TextInputField from 'frontend/components/UI/TextInputField'
import { useTranslation } from 'react-i18next'

interface ChannelNameSelectionProps {
  channelNameToInstall: string
  setChannelNameToInstall(name: string): void
  gameInfo: GameInfo
  accessCode: string
  setAccessCode(code: string): void
}

export default function ChannelNameSelection({
  channelNameToInstall,
  setChannelNameToInstall,
  gameInfo,
  accessCode,
  setAccessCode
}: ChannelNameSelectionProps) {
  const { t } = useTranslation('gamepage')
  const selectedChannel = gameInfo?.channels?.[channelNameToInstall]
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
      {selectedChannel?.license_config.access_codes ? (
        <TextInputField
          placeholder={'Enter access code'}
          value={accessCode}
          onChange={(ev) => setAccessCode(ev.target.value)}
          htmlId="access_code_input"
        ></TextInputField>
      ) : null}
    </>
  )
}
