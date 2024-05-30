import styles from './index.module.scss'

import React from 'react'

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
  }: LibraryTopBarInterface): JSX.Element => {
    const { t } = useTranslation()
    const category = libraryState.category

    const isGOGLoggedin = storeAuthState.gog.username
    const isEpicLoggedin = storeAuthState.epic.username

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
      >
        <Tabs.List>
          <Tabs.Tab value="all">
            <div className="menu">{t('ALL', 'ALL')}</div>
          </Tabs.Tab>
          <Tabs.Tab value="hyperplay">
            <div className="menu">{t('HyperPlay')}</div>
          </Tabs.Tab>
          {isEpicLoggedin ? (
            <Tabs.Tab value="legendary">
              <div className="menu">EPIC</div>
            </Tabs.Tab>
          ) : null}
          {isGOGLoggedin ? (
            <Tabs.Tab value="gog">
              <div className="menu">GOG</div>
            </Tabs.Tab>
          ) : null}
          <Tabs.Tab value="sideload">
            <div className="menu">{t('Other')}</div>
          </Tabs.Tab>
          <div className={styles.sortByDropdown}>
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
            />
          </div>
          <div className={styles.dropdownContainer}>
            <GenericDropdown
              target={
                <GenericDropdown.GenericButton
                  text={'Other filters'}
                  className={styles.dropdownButton}
                  divProps={{ className: 'body-sm' }}
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
