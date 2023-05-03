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
      <summary className="settingsSectionHeader">{summary}</summary>
      {children}
    </details>
  ) : (
    <section>
      <div className="settingsSectionHeader">{summary}</div>
      {children}
    </section>
  )
}

export default Collapsible
