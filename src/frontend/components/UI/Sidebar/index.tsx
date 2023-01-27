import classNames from 'classnames'
import React, { useEffect, useRef, useState, useContext } from 'react'
import onboardingStore from 'frontend/store/OnboardingStore'
import SidebarLinks from './components/SidebarLinks'
import './index.scss'
import Wallet from './components/wallet'
import { DMQueueElement } from 'common/types'
import { NavLink } from 'react-router-dom'
import { ReactComponent as MetaMaskRoundedOutline } from 'frontend/assets/metamask-rounded-outline.svg'
import { observer } from 'mobx-react-lite'

let sidebarSize = localStorage.getItem('sidebar-width') || 240
const minWidth = 60
const maxWidth = 400
const collapsedWidth = 120

const Sidebar = observer(() => {
  const sidebarEl = useRef<HTMLDivElement | null>(null)
  const {
    showMetaMaskBrowserSidebarLinks
  } = useContext(ContextProvider)
  const [badgeText, setBadgeText] = useState('0')

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  function setBadgeString(err: any, text: string) {
    setBadgeText(text)
  }

  useEffect(() => {
    const removeHandleSetBadgeText =
      window.api.handleSetBadgeTextInRenderer(setBadgeString)

    return () => {
      removeHandleSetBadgeText()
    }
  }, [])

  useEffect(() => {
    if (!sidebarEl.current) return

    if (sidebarSize < collapsedWidth) {
      sidebarEl.current.classList.add('collapsed')
    } else {
      sidebarEl.current.classList.remove('collapsed')
    }

    sidebarEl.current.style.setProperty('--sidebar-width', `${sidebarSize}px`)
  }, [sidebarEl])

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    let mouseDragX = e.clientX
    let dragging = true

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientX !== 0) {
        mouseDragX = e.clientX
      }
    }

    const finishDrag = () => {
      document.body.removeEventListener('mousemove', onMouseMove)
      document.body.removeEventListener('mouseup', finishDrag)
      document.body.removeEventListener('mouseleave', finishDrag)
      dragging = false
      localStorage.setItem('sidebar-width', sidebarSize.toString())
    }

    document.body.addEventListener('mouseup', finishDrag)
    document.body.addEventListener('mouseleave', finishDrag)
    document.body.addEventListener('mousemove', onMouseMove)

    const dragFrame = () => {
      if (!sidebarEl.current) return

      let newWidth = mouseDragX
      if (newWidth < minWidth) {
        newWidth = minWidth
      } else if (newWidth > maxWidth) {
        newWidth = maxWidth
      }

      if (sidebarSize !== newWidth) {
        sidebarSize = newWidth

        if (sidebarSize < collapsedWidth) {
          sidebarEl.current.classList.add('collapsed')
        } else {
          sidebarEl.current.classList.remove('collapsed')
        }

        sidebarEl.current.style.setProperty('--sidebar-width', `${newWidth}px`)
      }

      if (dragging) {
        requestAnimationFrame(dragFrame)
      }
    }

    requestAnimationFrame(dragFrame)
  }

  return (
    <aside ref={sidebarEl} className={classNames('Sidebar')}>
      <SidebarLinks />
      <div className="currentDownloads"></div>

      {showMetaMaskBrowserSidebarLinks ? (
        <>
          <button
            className="Sidebar__item"
            onClick={async () => window.api.showPopup()}
          >
            <>
              <div className="Sidebar__itemIcon">
                <MetaMaskRoundedOutline />
              </div>
              <span>MetaMask Popup {badgeText}</span>
            </>
          </button>
          <NavLink
            className={({ isActive }) =>
              classNames('Sidebar__item', { active: isActive })
            }
            to={'metamaskPortfolio'}
          >
            <>
              <div className="Sidebar__itemIcon">
                <MetaMaskRoundedOutline />
              </div>
              <span>{'MetaMask Portfolio'}</span>
            </>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames('Sidebar__item', { active: isActive })
            }
            to={'metamaskHome'}
          >
            <>
              <div className="Sidebar__itemIcon">
                <MetaMaskRoundedOutline />
              </div>
              <span>{'MetaMask Home'}</span>
            </>
          </NavLink>
        </>
      ) : null}

      <Wallet onClick={() => onboardingStore.openOnboarding()} />
      <div className="resizer" onMouseDown={handleDragStart} />
    </aside>
  )
})

export default React.memo(Sidebar)
