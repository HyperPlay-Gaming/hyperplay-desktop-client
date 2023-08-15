import React from 'react'
import SelectField from '../SelectField'
import { AvailablePlatforms, InstallPlatform } from 'common/types'
import { useTranslation } from 'react-i18next'

interface PlatformSelectionProps {
  availablePlatforms: AvailablePlatforms
  platformToInstall: InstallPlatform
  disabled: boolean
  setPlatformToInstall: (platform: InstallPlatform) => void
}

export default function PlatformSelection({
  availablePlatforms,
  platformToInstall,
  disabled,
  setPlatformToInstall
}: PlatformSelectionProps) {
  const { t } = useTranslation('gamepage')

  if (availablePlatforms.length <= 1) {
    return null
  }

  return (
    <SelectField
      label={`${t('game.platform', 'Select Platform')}:`}
      htmlId="platformPick"
      value={platformToInstall}
      disabled={disabled}
      onChange={(e) => setPlatformToInstall(e.target.value as InstallPlatform)}
    >
      {availablePlatforms.map((p, i) => (
        <option value={p.value} key={i}>
          {p.name}
        </option>
      ))}
    </SelectField>
  )
}
