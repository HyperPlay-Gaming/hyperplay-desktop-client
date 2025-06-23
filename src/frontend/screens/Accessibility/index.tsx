import React, {
  ChangeEvent,
  CSSProperties,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import ContextProvider from 'frontend/state/ContextProvider'
import classNames from 'classnames'
import { SelectField } from 'frontend/components/UI'
import ToggleSwitch from 'frontend/components/UI/ToggleSwitch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@hyperplay/ui'
import styles from './index.module.scss'

export default React.memo(function Accessibility() {
  const { t } = useTranslation()
  const {
    isRTL,
    zoomPercent,
    setZoomPercent,
    allTilesInColor,
    setAllTilesInColor,
    setPrimaryFontFamily,
    setSecondaryFontFamily
  } = useContext(ContextProvider)

  const [fonts, setFonts] = useState<string[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [contentFont, setContentFont] = useState('')
  const [actionFont, setActionFont] = useState('')

  const defaultPrimaryFont = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--default-primary-font-family')

  const defaultSecondaryFont = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--default-secondary-font-family')

  const getFonts = async (reload = false) => {
    const systemFonts = await window.api.getFonts(reload)
    setFonts([
      defaultSecondaryFont.trim(),
      defaultPrimaryFont.trim(),
      ...systemFonts
    ])
    if (reload) {
      setRefreshing(false)
    }
  }

  const refreshFonts = async () => {
    setRefreshing(true)
    await getFonts(true)
  }

  const onRefreshingAnimationEnd = () => {
    setRefreshing(false)
  }

  // Track the screen view once and only once
  useEffect(() => {
    window.api.trackScreen('Accessibility')
  }, [])

  useEffect(() => {
    getFonts()
    const primaryFont = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--primary-font-family')
    setActionFont(primaryFont.trim())

    const secondaryFont = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--secondary-font-family')
    setContentFont(secondaryFont.trim())
  }, [])

  const handleZoomLevel = (event: ChangeEvent<HTMLInputElement>) => {
    setZoomPercent(parseInt(event.target.value))
  }

  const handleContentFontFamily = (event: ChangeEvent<HTMLSelectElement>) => {
    setSecondaryFontFamily(event.target.value)
    setContentFont(event.target.value)
  }

  const handleActionsFontFamily = (event: ChangeEvent<HTMLSelectElement>) => {
    setPrimaryFontFamily(event.target.value)
    setActionFont(event.target.value)
  }

  const options = useMemo(() => {
    return fonts.map((font) => {
      const style: CSSProperties = { fontFamily: font }
      return (
        <option key={font} value={font} style={style}>
          {font}
        </option>
      )
    })
  }, [fonts])

  return (
    <div className={styles.accessibility}>
      <div className={styles.settingsWrapper}>
        <div className={styles.accessibilityTitle}>
          {t('accessibility.title', 'Accessibility')}
        </div>

        <div className={styles.rangeWrapper}>
          <label
            className={classNames({ isRTL: isRTL }, styles.zoomRangeLabel)}
          >
            {t('accessibility.zoom', 'Zoom')} ({zoomPercent}%)
          </label>
          <input
            type="range"
            value={zoomPercent}
            onChange={handleZoomLevel}
            min="60"
            max="200"
            step="10"
            list="zoom-levels"
          />
          <div className={styles.zoomHint}>
            {[60, 80, 100, 120, 140, 160, 180, 200].map((zoom) => (
              <span key={zoom}>{zoom}</span>
            ))}
          </div>
          <datalist id="zoom-levels">
            {[60, 80, 100, 120, 140, 160, 180, 200].map((zoom) => (
              <option key={zoom} value={zoom}>
                {zoom}
              </option>
            ))}
          </datalist>
        </div>

        <SelectField
          htmlId="content-font-family"
          value={contentFont}
          onChange={handleContentFontFamily}
          label={
            t(
              'accessibility.content_font_family_no_default',
              'Content Font Family (Default: '
            ) +
            defaultSecondaryFont.split(',')[0].trim() +
            ')'
          }
        >
          {options}
        </SelectField>

        <SelectField
          htmlId="actions-font-family"
          value={actionFont}
          onChange={handleActionsFontFamily}
          label={
            t(
              'accessibility.actions_font_family_no_default',
              'Actions Font Family (Default: '
            ) +
            defaultPrimaryFont.split(',')[0].trim() +
            ')'
          }
        >
          {options}
        </SelectField>

        <div className={styles.fonts}>
          <Button
            type="secondary"
            size="small"
            onClick={refreshFonts}
            onAnimationEnd={onRefreshingAnimationEnd}
          >
            <FontAwesomeIcon
              icon={faSyncAlt}
              className={classNames({ 'fa-spin': refreshing })}
            />
            <span>
              {refreshing
                ? t('accessibility.refreshingFonts', 'Refreshing Fonts...')
                : t('accessibility.refreshFonts', 'Refresh Fonts')}
            </span>
          </Button>
        </div>

        <span className={styles.setting}>
          <label className={classNames(styles.toggleWrapper, { isRTL: isRTL })}>
            <ToggleSwitch
              htmlId="setAllTitlesInColor"
              value={allTilesInColor}
              handleChange={() => {
                setAllTilesInColor(!allTilesInColor)
              }}
              title={t(
                'accessibility.all_tiles_in_color',
                'Show all game tiles in color'
              )}
            />
          </label>
        </span>
      </div>
    </div>
  )
})
