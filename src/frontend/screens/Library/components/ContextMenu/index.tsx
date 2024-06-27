import React from 'react'
import './index.css'
import { Menu } from '@hyperplay/ui'

export interface Item {
  label: string
  onClick: () => void
  show: boolean
}

interface Props {
  children: React.ReactNode
  items: Item[]
}

function ContextMenu({ children, items }: Props) {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number
    mouseY: number
  } | null>(null)

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY - 2
          }
        : null
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  const handleClick = (callback: { (): void }) => {
    handleClose()
    callback()
  }

  const y = contextMenu !== null ? contextMenu.mouseY : 0
  const x = contextMenu !== null ? contextMenu.mouseX : 0

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{
        cursor: 'context-menu',
        display: 'inline-block',
        width: 'fit-content'
      }}
    >
      {children}
      <Menu
        opened={contextMenu !== null}
        onClose={handleClose}
        offset={y}
        styles={{ dropdown: { left: x } }}
      >
        {items.map(
          ({ label, onClick, show }, i) =>
            show && (
              <Menu.Item key={i} onClick={() => handleClick(onClick)}>
                {label}
              </Menu.Item>
            )
        )}
      </Menu>
    </div>
  )
}

export default React.memo(ContextMenu)
