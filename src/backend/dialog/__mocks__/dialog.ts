import { vi } from 'vitest'

const dialog = vi.importActual('../dialog')

dialog.showDialogBoxModalAuto = vi.fn()
dialog.notify = vi.fn()

export default dialog
