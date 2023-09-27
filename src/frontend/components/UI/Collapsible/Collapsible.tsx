import React from 'react'

type Props = {
  isOpen: boolean
  summary: string
  children: React.ReactNode
  isCollapsible?: boolean
}

const Collapsible = ({ isOpen, isCollapsible, children, summary }: Props) => {
  return isCollapsible ? (
    <details open={isOpen}>
      <summary className="settingsSectionHeader title">{summary}</summary>
      {children}
    </details>
  ) : (
    <div>
      <div className="settingsSectionHeader title">{summary}</div>
      {children}
    </div>
  )
}

export default Collapsible
