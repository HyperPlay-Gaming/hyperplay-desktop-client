import React from 'react'
import SidebarLinks from './components/SidebarLinks'
import './index.scss'
import styles from './index.module.scss'

const Sidebar = () => {
  return (
    <aside className={`${styles.Sidebar}`}>
      <SidebarLinks />
    </aside>
  )
}

export default React.memo(Sidebar)
