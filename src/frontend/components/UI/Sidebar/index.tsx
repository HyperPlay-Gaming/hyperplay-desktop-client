import React from 'react'
import SidebarLinks from './components/SidebarLinks'
import TourTriggerButton from 'frontend/components/TourGuide/TourTriggerButton'
import './index.scss'
import styles from './index.module.scss'

const Sidebar = () => {
  return (
    <aside className={`${styles.Sidebar}`} data-tour="sidebar-container">
      <div className={styles.sidebarContent}>
        <SidebarLinks />
        <div className={styles.sidebarTourButtonWrapper}>
          <TourTriggerButton
            tourId="sidebar"
            className={styles.sidebarTourButton}
            buttonType="secondary"
            showIcon={true}
            showText={false}
          />
        </div>
      </div>
    </aside>
  )
}

export default React.memo(Sidebar)
