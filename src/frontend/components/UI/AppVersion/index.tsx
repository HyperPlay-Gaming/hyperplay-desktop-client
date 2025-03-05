import React, { useEffect, useState } from 'react'

const storage = window.localStorage
const lastVersion = storage.getItem('last_version')?.replaceAll('"', '')

export default function AppVersion() {
  const [appVersion, setAppVersion] = useState(lastVersion)

  useEffect(() => {
    window.api.getAppVersion().then((version) => {
      if (version !== lastVersion) {
        window.api.logInfo(
          `Updated to a new version, reloading the MetaMask extension. Old version: ${lastVersion}, new version: ${version}`
        )
        window.api.reloadForMM()
      } else {
        window.api.logInfo('No new version detected. Wont reload the app')
      }
      storage.setItem('last_version', JSON.stringify(version))
      setAppVersion(version)
    })
  }, [])

  return <div>{appVersion}</div>
}
