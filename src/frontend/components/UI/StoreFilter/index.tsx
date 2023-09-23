import classNames from 'classnames'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import FormControl from 'frontend/components/UI/FormControl'
import ContextProvider from 'frontend/state/ContextProvider'
import { observer } from 'mobx-react-lite'
import libraryState from 'frontend/state/libraryState'
import { Category } from 'frontend/types'

export default observer(function StoreFilter() {
  const { gog, epic } = useContext(ContextProvider)
  const { t } = useTranslation()

  const isGOGLoggedin = gog.username
  const isEpicLoggedin = epic.username
  const category = libraryState.category
  const handleCategory = (category: Category) =>
    (libraryState.category = category)

  return (
    <div className="storeFilter">
      <FormControl segmented small>
        <button
          onClick={() => handleCategory('all')}
          className={classNames('FormControl__button', {
            active: libraryState.category === 'all'
          })}
          title={`${t('header.store', 'Filter Store')}: ${t('All')}`}
        >
          {t('All').toUpperCase()}
        </button>
        <button
          className={classNames('FormControl__button', {
            active: category === 'hyperplay'
          })}
          title={'HyperPlay'}
          onClick={() => handleCategory('hyperplay')}
        >
          {t('HyperPlay')}
        </button>
        {isEpicLoggedin && (
          <button
            className={classNames('FormControl__button', {
              active: category === 'legendary'
            })}
            title={`${t('header.store')}: ${t('store')}`}
            onClick={() => handleCategory('legendary')}
          >
            EPIC
          </button>
        )}
        {isGOGLoggedin && (
          <button
            className={classNames('FormControl__button', {
              active: category === 'gog'
            })}
            title={`${t('header.store')}: ${t('GOG')}`}
            onClick={() => handleCategory('gog')}
          >
            GOG
          </button>
        )}
        {isGOGLoggedin && (
          <button
            className={classNames('FormControl__button', {
              active: category === 'sideload'
            })}
            title={`${t('header.store')}: ${t('Other')}`}
            onClick={() => handleCategory('sideload')}
          >
            {t('Other')}
          </button>
        )}
      </FormControl>
    </div>
  )
})
