import { DialogType, ButtonOptions } from 'common/types'
import { DialogModalOptions } from 'frontend/types'
import { TFunction } from 'i18next'

export function showSteamInstallDialog(
  showDialogModal: (options: DialogModalOptions) => void,
  t: TFunction,
  appName: string
) {
  showDialogModal({
    type: 'MESSAGE',
    title: t('steam.install.title', 'Install from Steam'),
    message: t(
      'steam.install.message',
      'Please install this game from Steam and refresh the library afterwards to play on HyperPlay.'
    ),
    buttons: [
      {
        text: t('steam.install.launch', 'Launch Steam'),
        onClick: () => window.api.openExternalUrl(`steam://install/${appName}`)
      },
      {
        text: t('steam.install.later', 'Install Later'),
        onClick: () => {}
      }
    ]
  } as {
    type: DialogType
    title: string
    message: string
    buttons: ButtonOptions[]
  })
}
