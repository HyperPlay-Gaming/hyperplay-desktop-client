import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectField } from 'frontend/components/UI'
import useSetting from 'frontend/hooks/useSetting'
import { LibraryTopSectionOptions } from 'common/types'
import libraryState from 'frontend/state/libraryState'

const LibraryTopSection = () => {
  const { t } = useTranslation()
  const [libraryTopSection, setLibraryTopSection] = useSetting(
    'libraryTopSection',
    'disabled'
  )

  const onSectionChange = (event: ChangeEvent) => {
    const newValue = (event.target as HTMLSelectElement)
      .value as LibraryTopSectionOptions
    libraryState.libraryTopSection = newValue
    setLibraryTopSection(newValue)
  }

  return (
    <SelectField
      label={t('setting.library_top_section', 'Library Top Section')}
      htmlId="library_top_section_selector"
      onChange={onSectionChange}
      value={libraryTopSection}
    >
      <option value="recently_played">
        {t(
          'setting.library_top_option.recently_played',
          'Recently Played Games'
        )}
      </option>
      <option value="recently_played_installed">
        {t(
          'setting.library_top_option.recently_played_installed',
          'Recently Played Games (Only Installed)'
        )}
      </option>
      <option value="favourites">
        {t('setting.library_top_option.favourites', 'Favourite Games')}
      </option>
      <option value="disabled">
        {t('setting.library_top_option.disabled', 'Disabled')}
      </option>
    </SelectField>
  )
}

export default LibraryTopSection
