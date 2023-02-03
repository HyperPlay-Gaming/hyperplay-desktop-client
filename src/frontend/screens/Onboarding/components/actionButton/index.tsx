import './index.css'
import React, { PropsWithChildren } from 'react'

interface ActionButtonProps {
  onClick?: () => void
}

const ActionButton = ({
  onClick,
  children
}: PropsWithChildren<ActionButtonProps>) => {
  return (
    <button className="button-sm actionButton" onClick={onClick}>
      {children}
    </button>
  )
}

export default ActionButton
