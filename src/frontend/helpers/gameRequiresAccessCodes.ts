import { GameInfo } from 'common/types'

export default function gameRequiresAccessCodes(
  gameInfo: GameInfo,
  channelName: string
) {
  const selectedChannel = gameInfo?.channels?.[channelName]
  const channelRequiresAccessCode =
    !!selectedChannel?.license_config.access_codes
  return channelRequiresAccessCode
}
