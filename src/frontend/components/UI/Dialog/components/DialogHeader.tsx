import React, { ReactNode } from 'react'

interface DialogHeaderProps {
  onClose: () => void
  children: ReactNode
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return (
    <div className="Dialog__header">
      <h5 className="Dialog__headerTitle">{children}</h5>
    </div>
  )
}
