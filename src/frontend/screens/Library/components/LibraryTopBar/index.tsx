import styles from './index.module.scss'

import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import {
  Dropdown,
  Toggle,
  DropdownItemType,
  GenericDropdown,
  Menu,
  Tabs,
  getTabsClassNames
} from '@hyperplay/ui'
import { Category } from 'frontend/types'
import { observer } from 'mobx-react-lite'
import libraryState from '../../../../state/libraryState'
import storeAuthState from 'frontend/state/storeAuthState'

export interface LibraryTopBarInterface {
  filters: DropdownItemType[]
  setSelectedFilter: React.Dispatch<React.SetStateAction<DropdownItemType>>
  selectedFilter: DropdownItemType
  otherFiltersData: {
    text: string
    defaultValue: boolean
    onChange: (checked: boolean) => void
  }[]
}

export const LibraryTopBar = observer(
  ({
    filters,
    setSelectedFilter,
    selectedFilter,
    otherFiltersData
  }: LibraryTopBarInterface): React.JSX.Element => {
    const { t } = useTranslation()
    const category = libraryState.category

    const isGOGLoggedin = storeAuthState.gog.username
    const isEpicLoggedin = storeAuthState.epic.username

    useEffect(() => {
      const tabsRoot = document.getElementById('libraryTopBarTabs')
      const sortRoot = document.getElementById('librarySortContainer')
      const filtersRoot = document.getElementById('libraryFiltersContainer')

      const focusSidebar = () => {
        const sidebarLink = document.querySelector<HTMLElement>(
          '[data-testid="sidebar-library-link"]'
        )
        sidebarLink?.focus()
      }

      const focusFirstFocusable = (root: HTMLElement | null) => {
        if (!root) return false
        const el = root.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (el) {
          el.focus()
          return true
        }
        return false
      }

      const getTabs = () =>
        Array.from(
          tabsRoot?.querySelectorAll<HTMLElement>('[role="tab"]') || []
        )

      const onTabsKeyDown = (e: KeyboardEvent) => {
        const tabs = getTabs()
        if (!tabs.length) return
        const focused = (e.target as HTMLElement)?.closest('[role="tab"]')
        const idx = tabs.findIndex((t) => t === focused)
        if (idx === -1) return
        if (e.key === 'ArrowLeft' && idx === 0) {
          focusSidebar()
          e.preventDefault()
          e.stopPropagation()
        }
        if (e.key === 'ArrowRight' && idx === tabs.length - 1) {
          if (!focusFirstFocusable(sortRoot)) {
            focusFirstFocusable(filtersRoot)
          }
          e.preventDefault()
          e.stopPropagation()
        }
      }

      const onFiltersKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          const tabs = getTabs()
          if (tabs.length) {
            tabs[tabs.length - 1].focus()
            e.preventDefault()
            e.stopPropagation()
          }
        }
      }

      tabsRoot?.addEventListener('keydown', onTabsKeyDown, true)
      sortRoot?.addEventListener('keydown', onFiltersKeyDown, true)
      filtersRoot?.addEventListener('keydown', onFiltersKeyDown, true)

      return () => {
        tabsRoot?.removeEventListener('keydown', onTabsKeyDown, true)
        sortRoot?.removeEventListener('keydown', onFiltersKeyDown, true)
        filtersRoot?.removeEventListener('keydown', onFiltersKeyDown, true)
      }
    }, [])

    return (
      <Tabs
        onChange={(val) => {
          if (val !== null) {
            libraryState.category = val as Category
          }
        }}
        defaultValue={category}
        classNames={getTabsClassNames(
          { list: styles.tabsList },
          { list: 'outline' }
        )}
        id="libraryTopBarTabs"
      >
        <Tabs.List>
          <Tabs.Tab value="all" data-testid="library-tab-all">
            <div className="menu">{t('ALL', 'ALL')}</div>
          </Tabs.Tab>
          <Tabs.Tab value="hyperplay" data-testid="library-tab-hyperplay">
            <div className="menu">{t('HyperPlay')}</div>
          </Tabs.Tab>
          {isEpicLoggedin ? (
            <Tabs.Tab value="legendary" data-testid="library-tab-legendary">
              <div className="menu">EPIC</div>
            </Tabs.Tab>
          ) : null}
          {isGOGLoggedin ? (
            <Tabs.Tab value="gog" data-testid="library-tab-gog">
              <div className="menu">GOG</div>
            </Tabs.Tab>
          ) : null}
          <Tabs.Tab value="sideload" data-testid="library-tab-sideload">
            <div className="menu">{t('Other')}</div>
          </Tabs.Tab>
          <div className={styles.sortByDropdown} id="librarySortContainer">
            <Dropdown
              options={filters}
              onItemChange={setSelectedFilter}
              selected={selectedFilter}
              targetWidth={275}
              dropdownButtonDivProps={{
                className: 'body-sm'
              }}
              containerProps={{
                className: styles.dropdownContainer
              }}
              classNames={{ item: 'body-sm' }}
              styles={{ dropdown: { gap: '0px' } }}
              menuItemsGap="0px"
              data-testid="library-sort-dropdown"
            />
          </div>
          <div
            className={styles.dropdownContainer}
            id="libraryFiltersContainer"
          >
            <GenericDropdown
              target={
                <GenericDropdown.GenericButton
                  text={'Other filters'}
                  className={styles.dropdownButton}
                  divProps={{
                    className: 'body-sm',
                    'data-testid': 'library-filters-dropdown'
                  }}
                ></GenericDropdown.GenericButton>
              }
              containerProps={{
                className: styles.dropdownContainer
              }}
              menuItemsGap="0px"
            >
              {otherFiltersData.map((val, index) => (
                <Menu.Item
                  closeMenuOnClick={false}
                  key={`toggleItem${index}`}
                  style={{ padding: 'var(--space-sm)' }}
                >
                  <Toggle
                    defaultChecked={val.defaultValue}
                    labelPosition="right"
                    onChange={(e) => {
                      val.onChange(e.target.checked)
                    }}
                  >
                    <div
                      className="body-sm"
                      style={{
                        paddingLeft: 'var(--space-sm)',
                        margin: 'auto 0px'
                      }}
                    >
                      {val.text}
                    </div>
                  </Toggle>
                </Menu.Item>
              ))}
            </GenericDropdown>
          </div>
          <div id="alignEnd">
            {/* <div>
              <Button type="tertiary" className={styles.gridListButton}>
                <Images.Grid fill="white" height={24} width={24} />
              </Button>
            </div>
            <div>
              <Button type="tertiary" className={styles.gridListButton}>
                <Images.List fill="white" height={24} width={24} />
              </Button>
            </div> */}
          </div>
        </Tabs.List>
      </Tabs>
    )
  }
)
