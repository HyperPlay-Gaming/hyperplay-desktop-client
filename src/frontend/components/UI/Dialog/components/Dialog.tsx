import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef
} from 'react'

interface DialogProps {
  className?: string
  children: ReactNode
  showCloseButton: boolean
  onClose: () => void
  // modal or non-modal behavior https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
  isModal?: boolean
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  className,
  showCloseButton = false,
  onClose,
  isModal = true
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog) {
      const cancel = () => {
        onCloseRef.current()
      }
      dialog.addEventListener('cancel', cancel)
      if (isModal) {
        dialog.showModal()
      } else {
        dialog.show()
      }
      return () => {
        dialog.removeEventListener('cancel', cancel)
        dialog.close()
      }
    }
    return
  }, [dialogRef.current])

  const onDialogClick = useCallback(
    (e: SyntheticEvent) => {
      if (e.target === dialogRef.current) {
        const ev = e.nativeEvent as MouseEvent
        const tg = e.target as HTMLElement
        if (
          ev.offsetX < 0 ||
          ev.offsetX > tg.offsetWidth ||
          ev.offsetY < 0 ||
          ev.offsetY > tg.offsetHeight
        ) {
          onClose()
        }
      }
    },
    [onClose]
  )

  return (
    <dialog
      className={`Dialog__element ${className}`}
      ref={dialogRef}
      onClick={isModal ? onDialogClick : undefined}
    >
      {showCloseButton && (
        <div className="Dialog__Close">
          <button className="Dialog__CloseButton" onClick={onClose}>
            <FontAwesomeIcon className="Dialog__CloseIcon" icon={faXmark} />
          </button>
        </div>
      )}
      {children}
    </dialog>
  )
}
