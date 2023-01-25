import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  TextInputWithIconField,
  SelectField,
  ToggleSwitch,
  TextInputField
} from 'frontend/components/UI'
import React from 'react'
import { WineInstallation } from 'common/types'
import { useTranslation } from 'react-i18next'
import { configStore } from 'frontend/helpers/electronStores'
import { removeSpecialcharacters } from 'frontend/helpers'

type Props = {
  setWineVersion: React.Dispatch<
    React.SetStateAction<WineInstallation | undefined>
  >
  setWinePrefix: React.Dispatch<React.SetStateAction<string>>
  setCrossoverBottle: React.Dispatch<React.SetStateAction<string>>
  winePrefix: string
  crossoverBottle: string
  wineVersionList: WineInstallation[]
  wineVersion: WineInstallation | undefined
  title?: string
}

export default function WineSelector({
  setWinePrefix,
  setWineVersion,
  winePrefix,
  wineVersionList,
  wineVersion,
  title = 'sideload',
  crossoverBottle,
  setCrossoverBottle
}: Props) {
  const { t } = useTranslation('gamepage')

  const [useDefaultSettings, setUseDefaultSettings] = React.useState(false)
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    const {
      defaultWinePrefix: prefixFolder,
      wineVersion,
      winePrefix: defaultPrefix,
      wineCrossoverBottle: defaultBottle
    } = { ...configStore.get_nodefault('settings') }

    if (!wineVersion || !defaultPrefix || !defaultBottle) return
    setDescription(
      `${defaultPrefix} / ${wineVersion.name.replace('Proton - ', '')}`
    )

    if (!useDefaultSettings && wineVersion.type === 'crossover') {
      return setCrossoverBottle(defaultBottle)
    }

    if (useDefaultSettings) {
      setWinePrefix(defaultPrefix)
      setWineVersion(wineVersion)
      setCrossoverBottle(defaultBottle)
    } else {
      const sugestedWinePrefix = `${prefixFolder}/${removeSpecialcharacters(
        title
      )}`
      setWinePrefix(sugestedWinePrefix)
      setWineVersion(wineVersion || undefined)
    }
  }, [useDefaultSettings])

  const showPrefix = wineVersion?.type !== 'crossover'
  const showBottle = wineVersion?.type === 'crossover'

  return (
    <>
      <ToggleSwitch
        htmlId="use-wine-defaults"
        title={t(
          'setting.use-default-wine-settings',
          'Use Default Wine Settings'
        )}
        value={useDefaultSettings}
        handleChange={() => setUseDefaultSettings(!useDefaultSettings)}
        description={description}
      />
      {!useDefaultSettings && (
        <>
          {showPrefix && (
            <TextInputWithIconField
              label={t('install.wineprefix', 'WinePrefix')}
              htmlId="setinstallpath"
              placeholder={winePrefix}
              value={winePrefix.replaceAll("'", '')}
              onChange={(event) => setWinePrefix(event.target.value)}
              icon={<FontAwesomeIcon icon={faFolderOpen} />}
              onIconClick={async () =>
                window.api
                  .openDialog({
                    buttonLabel: t('box.choose'),
                    properties: ['openDirectory'],
                    title: t('box.wineprefix', 'Select WinePrefix Folder')
                  })
                  .then((path) => setWinePrefix(path || winePrefix))
              }
            />
          )}
          {showBottle && (
            <TextInputField
              label={t('setting.winecrossoverbottle', 'CrossOver Bottle')}
              htmlId="crossoverBottle"
              value={crossoverBottle}
              onChange={(event) => setCrossoverBottle(event.target.value)}
            />
          )}

          <SelectField
            label={`${t('install.wineversion')}:`}
            htmlId="wineVersion"
            value={wineVersion?.name || ''}
            onChange={(e) =>
              setWineVersion(
                wineVersionList.find(
                  (version) => version.name === e.target.value
                )
              )
            }
          >
            {wineVersionList &&
              wineVersionList.map(({ name }, i) => (
                <option value={name} key={i}>
                  {name}
                </option>
              ))}
          </SelectField>
        </>
      )}
    </>
  )
}
