import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const storage = window.localStorage
let lastVersion = storage.getItem('last_version')
if (lastVersion === undefined) {
  lastVersion = ''
}

export default function AppVersion() {
  const { t } = useTranslation()
  const [appVersion, setAppVersion] = useState(lastVersion)

  useEffect(() => {
    window.api.getAppVersion().then((version) => {
      storage.setItem('last_version', JSON.stringify(version))
      setAppVersion(version)
    })
  }, [])

  return (
    <div
      className="body-sm"
      style={{
        color: 'var(--color-neutral-400)',
        margin: 'var(--space-xl) 0px var(--space-md) 0px'
      }}
    >
      {t('info.hyperplay.version', 'HyperPlay Version') + `: ${appVersion}`}
    </div>
  )
}
