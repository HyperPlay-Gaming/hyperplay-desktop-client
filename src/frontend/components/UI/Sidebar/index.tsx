import React from 'react'
import SidebarLinks from './components/SidebarLinks'
import './index.scss'
import styles from './index.module.scss'

const Sidebar = () => {
  return (
    <aside className={`${styles.Sidebar}`} data-tour="sidebar-container">
      <div className={styles.sidebarContent}>
        <SidebarLinks />
      </div>
    </aside>
  )
}

export default React.memo(Sidebar)
