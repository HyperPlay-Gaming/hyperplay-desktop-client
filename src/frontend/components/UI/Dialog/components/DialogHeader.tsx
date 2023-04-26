import React, { ReactNode } from 'react'

interface DialogHeaderProps {
  onClose: () => void
  children: ReactNode
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return (
    <div className="Dialog__header">
      <div className="header Dialog__headerTitle">{children}</div>
    </div>
  )
}
