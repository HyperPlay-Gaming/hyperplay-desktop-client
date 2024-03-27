import ImportOptionStyles from './index.module.scss'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { ImportableBrowser } from 'backend/hyperplay-extension-helper/ipcHandlers/types'
import { Images } from '@hyperplay/ui'

interface WalletOptionProps {
  title: ImportableBrowser
  onClick: () => void
  classNames?: string
  override?: 'create' | 'recovery'
}

const ImportOption = ({
  title,
  onClick,
  override,
  classNames
}: WalletOptionProps) => {
  const [icon, setIcon] = useState('')

  useEffect(() => {
    if (override === undefined) {
      import(`../../../../assets/${title}-logo.svg`)
        .then((val) => setIcon(val.default))
        .catch(() => setIcon('/src/frontend/assets/browser-icon.svg'))
    }
  })

  function getOverrideIcon() {
    switch (override) {
      case 'recovery':
        return <Images.MetaMaskUnlock />
      default:
        return <Images.MetaMaskAdd />
    }
  }

  return (
    <button
      className={cn(ImportOptionStyles.importOption, classNames)}
      onClick={onClick}
    >
      {override !== undefined ? (
        getOverrideIcon()
      ) : (
        <img
          className={ImportOptionStyles.importOptionBrowserIcon}
          src={icon}
        />
      )}

      <div className={ImportOptionStyles.importOptionTitle}>{title}</div>
    </button>
  )
}

export default ImportOption
