import styles from './index.module.scss'

import React from 'react'

import { useTranslation } from 'react-i18next'

import {
  Dropdown,
  Tabs,
  Toggle,
  DropdownItemType,
  GenericDropdown,
  Menu
} from '@hyperplay/ui'
import { Category } from 'frontend/types'
import { observer } from 'mobx-react-lite'
import libraryState from '../../../../state/libraryState'
import storeAuthState from 'frontend/state/storeAuthState'
import { ENABLE_AMAZON_STORE } from 'frontend/constants'

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
    const isAmazonLoggedin = storeAuthState.amazon.username

    return (
      <Tabs
        onTabChange={(val: Category) => (libraryState.category = val)}
        defaultValue={category}
      >
        <Tabs.List className={styles.tabsList} type="outline">
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
          {isAmazonLoggedin && ENABLE_AMAZON_STORE ? (
            <Tabs.Tab value="nile">
              <div className="menu">Amazon</div>
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
              targetWidth={'275'}
              dropdownButtonDivProps={{
                className: 'body-sm'
              }}
              classNames={{ item: 'body-sm' }}
              styles={{ dropdown: { gap: '0px' } }}
              menuItemsGap="0px"
            />
          </div>
          <div>
            <GenericDropdown
              target={
                <GenericDropdown.GenericButton
                  text={'Other filters'}
                  className={styles.dropdownButton}
                  divProps={{ className: 'body-sm' }}
                ></GenericDropdown.GenericButton>
              }
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
