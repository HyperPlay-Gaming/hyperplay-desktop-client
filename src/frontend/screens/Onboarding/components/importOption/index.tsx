import './index.css'
import React, { useEffect, useState } from 'react'
import { ImportableBrowsers } from 'backend/hyperplay-extension-helper/ipcHandlers/types'

interface WalletOptionProps {
  title: ImportableBrowsers
  onClick: () => void
}

const ImportOption = (props: WalletOptionProps) => {
  const [icon, setIcon] = useState('')

  useEffect(() => {
    import(`../../../../assets/${props.title}-logo.svg`)
      .then((val) => setIcon(val.default))
      .catch(() => setIcon('/src/frontend/assets/browser-icon.svg'))
  })

  return (
    <button className="importOption" onClick={props.onClick}>
      <img className="importOptionBrowserIcon" src={icon} />
      <div className="importOptionTitle">{props.title}</div>
    </button>
  )
}

export default ImportOption
