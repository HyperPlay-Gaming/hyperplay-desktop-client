import styles from '../../index.module.scss'

import React, { useContext } from 'react'

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
import ContextProvider from 'frontend/state/ContextProvider'

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

export function LibraryTopBar({
  filters,
  setSelectedFilter,
  selectedFilter,
  otherFiltersData
}: LibraryTopBarInterface): JSX.Element {
  const { t } = useTranslation()
  const { epic, gog, handleCategory, category } = useContext(ContextProvider)

  const isGOGLoggedin = gog.username
  const isEpicLoggedin = epic.username
  return (
    <Tabs
      onTabChange={(val: Category) => handleCategory(val)}
      defaultValue={category}
    >
      <Tabs.List className={styles.tabsList} type="outline">
        <Tabs.Tab value="all">
          <div className="menu">{t('ALL', 'ALL')}</div>
        </Tabs.Tab>
        <Tabs.Tab value="hyperplay">
          <div className="menu">{t('HyperPlay')}</div>
        </Tabs.Tab>
        {isEpicLoggedin && (
          <Tabs.Tab value="legendary">
            <div className="menu">EPIC</div>
          </Tabs.Tab>
        )}
        {isGOGLoggedin && (
          <Tabs.Tab value="gog">
            <div className="menu">GOG</div>
          </Tabs.Tab>
        )}
        <Tabs.Tab value="sideload">
          <div className="menu">{t('Other')}</div>
        </Tabs.Tab>
        <div>
          <Dropdown
            options={filters}
            onItemChange={setSelectedFilter}
            selected={selectedFilter}
            targetWidth={275}
          />
        </div>
        <div>
          <GenericDropdown
            target={
              <GenericDropdown.GenericButton
                text={'Other filters'}
                style={{ width: '340px' }}
              ></GenericDropdown.GenericButton>
            }
          >
            {otherFiltersData.map((val, index) => (
              <Menu.Item closeMenuOnClick={false} key={`toggleItem${index}`}>
                <Toggle
                  defaultChecked={val.defaultValue}
                  labelPosition="right"
                  onChange={
                    //eslint-disable-next-line
                    (e: any) => {
                      val.onChange(e.target.checked)
                    }
                  }
                >
                  <div
                    className="body"
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
