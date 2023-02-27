import ImportOptionStyles from './index.module.scss'
import React, { useEffect, useState } from 'react'
import { ImportableBrowsers } from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import classNames from 'classnames'

interface WalletOptionProps {
  title: ImportableBrowsers
  onClick: () => void
  isCreate?: boolean
}

const ImportOption = ({
  title,
  onClick,
  isCreate = false
}: WalletOptionProps) => {
  const [icon, setIcon] = useState('')

  useEffect(() => {
    if (isCreate) {
      import(`../../../../assets/hyperplay/plus.svg`)
        .then((val) => setIcon(val.default))
        .catch(() => setIcon('/src/frontend/assets/browser-icon.svg'))
    } else {
      import(`../../../../assets/${title}-logo.svg`)
        .then((val) => setIcon(val.default))
        .catch(() => setIcon('/src/frontend/assets/browser-icon.svg'))
    }
  })

  return (
    <button className={ImportOptionStyles.importOption} onClick={onClick}>
      <img className={ImportOptionStyles.importOptionBrowserIcon} src={icon} />
      <div
        className={classNames(`{ImportOptionStyles.importOptionTitle}`, {
          [`${ImportOptionStyles.createNewText}`]: isCreate,
          'body-sm': isCreate
        })}
      >
        {title}
      </div>
    </button>
  )
}

export default ImportOption
