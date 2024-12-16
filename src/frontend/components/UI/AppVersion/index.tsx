import React, { useEffect, useState } from 'react'

const storage = window.localStorage
let lastVersion = storage.getItem('last_version')?.replaceAll('"', '')
if (lastVersion === undefined) {
  lastVersion = ''
}

export default function AppVersion() {
  const [appVersion, setAppVersion] = useState(lastVersion)

  useEffect(() => {
    window.api.getAppVersion().then((version) => {
      storage.setItem('last_version', JSON.stringify(version))
      setAppVersion(version)
    })
  }, [])

  return <div>{appVersion}</div>
}
