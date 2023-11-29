import {
  ImportableBrowser,
  MetaMaskImportOptions,
  MetaMaskInitMethod
} from 'backend/hyperplay-extension-helper/ipcHandlers/types'

export interface ImportProps {
  importOptions: MetaMaskImportOptions
  handleImportMmExtensionClicked: (
    mmInitMethod: MetaMaskInitMethod,
    dbPath?: string,
    browser?: ImportableBrowser
  ) => Promise<void>
}

export interface ImportAndCreateOptionsProps extends ImportProps {
  setBrowserSelected: React.Dispatch<
    React.SetStateAction<ImportableBrowser | null>
  >
}

export interface BrowserPackageManagerImportOptionProps extends ImportProps {
  browserSelected: ImportableBrowser
  pkgManager: string
}

export interface BrowsersAndManualImportOptionsProps
  extends ImportAndCreateOptionsProps {
  browserSelected: ImportableBrowser
}
