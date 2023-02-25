import classNames from 'classnames'
import React, { useEffect, useRef, useState, useContext } from 'react'
import onboardingStore from 'frontend/store/OnboardingStore'
import SidebarLinks from './components/SidebarLinks'
import './index.scss'
import Wallet from './components/wallet'
import { NavLink } from 'react-router-dom'
import { ReactComponent as MetaMaskRoundedOutline } from 'frontend/assets/metamask-rounded-outline.svg'
import { observer } from 'mobx-react-lite'
import ContextProvider from 'frontend/state/ContextProvider'
import { t } from 'i18next'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SidbarStyles from './index.module.scss'

let sidebarSize = 240
const localStorageSidebarWidth = localStorage.getItem('sidebar-width')
if (localStorageSidebarWidth !== null) {
  sidebarSize = parseInt(localStorageSidebarWidth)
}
const minWidth = 60
const maxWidth = 400
const collapsedWidth = 120

const Sidebar = observer(() => {
  const sidebarEl = useRef<HTMLDivElement | null>(null)
  const { showMetaMaskBrowserSidebarLinks } = useContext(ContextProvider)
  const [badgeText, setBadgeText] = useState('0')
  const [showMetaMaskSubMenu, setShowMetaMaskSubMenu] = useState(false)
  const [metamaskPopupIsActive, setMetamaskPopupIsActive] = useState(false)

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
        <div className="SidebarItemWithSubmenu">
          <button
            className={classNames('Sidebar__item', {
              active: showMetaMaskSubMenu
            })}
            onClick={async () => setShowMetaMaskSubMenu(!showMetaMaskSubMenu)}
          >
            <div className="Sidebar__itemIcon">
              <MetaMaskRoundedOutline
                style={{ height: '32px', position: 'relative' }}
              />

              {badgeText !== '' && badgeText !== '0' ? (
                <div className={SidbarStyles.badge}>{badgeText}</div>
              ) : null}
            </div>
            <span>MetaMask</span>
            <FontAwesomeIcon
              icon={faAngleDown}
              style={{ margin: '0 0 0 auto' }}
            />
          </button>
          {showMetaMaskSubMenu ? (
            <div className="SidebarSubmenu">
              <NavLink
                className={({ isActive }) =>
                  classNames('Sidebar__item SidebarLinks__subItem', {
                    active: isActive
                  })
                }
                to={'metamaskHome'}
              >
                <span>{t('metamask.sidebar.home', 'Home')}</span>
              </NavLink>
              <button
                className={classNames('Sidebar__item SidebarLinks__subItem', {
                  active: metamaskPopupIsActive
                })}
                onClick={async () => {
                  const popupIsShown = await window.api.showPopup()
                  setMetamaskPopupIsActive(popupIsShown)
                }}
              >
                <span>{t('metamask.sidebar.popup', 'Popup')}</span>
              </button>
              <NavLink
                className={({ isActive }) =>
                  classNames('Sidebar__item SidebarLinks__subItem', {
                    active: isActive
                  })
                }
                to={'metamaskPortfolio'}
              >
                <span>{t('metamask.sidebar.portfolio', 'Portfolio')}</span>
              </NavLink>
            </div>
          ) : null}
        </div>
      ) : null}

      <Wallet onClick={() => onboardingStore.openOnboarding()} />
      <div className="resizer" onMouseDown={handleDragStart} />
    </aside>
  )
})

export default React.memo(Sidebar)
