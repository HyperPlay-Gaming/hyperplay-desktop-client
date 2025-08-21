import React from 'react'
import { Runner } from 'common/types'
import { ReactComponent as EpicLogo } from 'frontend/assets/epic-logo.svg'
import { ReactComponent as GOGLogo } from 'frontend/assets/gog-logo.svg'
import { ReactComponent as SideLoad } from 'frontend/assets/sideload.svg'
import { ReactComponent as SteamLogo } from 'frontend/assets/steam-logo.svg'

type Props = { runner: Runner; className?: string }

export default function StoreLogos({
  runner,
  className = 'store-icon'
}: Props) {
  switch (runner) {
    case 'legendary':
      return <EpicLogo className={className} />
    case 'gog':
      return <GOGLogo className={className} />
    case 'steam':
      return <SteamLogo className={className} />
    default:
      return <SideLoad className={className} />
  }
}
