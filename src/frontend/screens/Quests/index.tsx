import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import useAuthSession from 'frontend/hooks/useAuthSession'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import QuestDetails from 'frontend/components/UI/QuestDetails'
import { fetchEpicListing, getGameInfo } from 'frontend/helpers'
import { useMutation } from '@tanstack/react-query'
import { Runner } from 'common/types'
import { Quest } from '@hyperplay/utils'
import { QuestRewardClaimedToast } from 'frontend/components/UI/QuestRewardClaimedToast'
import useGetHyperPlayListings from 'frontend/hooks/useGetHyperPlayListings'
import useGetQuests from 'frontend/hooks/useGetQuests'
import Fuse from 'fuse.js'
import {
  Alert,
  Background,
  QuestCard,
  QuestFilter,
  QuestsSummaryTable,
  SearchBar,
  DarkContainer,
  LoadingSpinner
} from '@hyperplay/ui'

export function QuestsPage() {
  const navigate = useNavigate()
  const { questId = null } = useParams()
  const selectedQuestId = questId === null ? questId : parseInt(questId)
  const { isSignedIn } = useAuthSession()
  const { t } = useTranslation()

  const questsResults = useGetQuests()
  const quests = questsResults?.data?.data
  const hyperplayListings = useGetHyperPlayListings()
  const listings = hyperplayListings.data.data

  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const searchParam = searchParams.get('search')
  const [searchText, setSearchText] = useState(searchParam ?? '')
  const [activeFilter, setActiveFilter] = useState<QuestFilter>('all')

  interface FuseResult<T> {
    id: number
    project_id: string
    name: string
    title: string
    item: T
    refIndex: number
  }

  useEffect(() => {
    window.api.trackScreen('Quests Page')
  }, [])

  useEffect(() => {
    setSearchText(searchParam ?? '')
  }, [searchParam])

  let alertComponent = null
  const showAlert = !isSignedIn
  let contentWithAlertClass = styles['no-alert']
  if (showAlert) {
    contentWithAlertClass = styles['with-alert']
    alertComponent = (
      <Alert
        className={styles.alert}
        message={t(
          'quests.playstreak.signInWarning.client',
          'You are currently not logged in, play streak progress will not be tracked. Please login to HyperPlay via the top-right dropdown to track progress.'
        )}
        variant="warning"
      />
    )
  }

  const navigateToGame = useMutation({
    mutationFn: async (quest: Quest) => {
      const { appName: epicAppName, epicListingUrl } = await fetchEpicListing(
        quest.project_id
      )

      let runner: Runner = 'hyperplay'
      let storeRedirectUrl = 'https://store.epicgames.com/'
      let name = quest.project_id
      if (epicListingUrl) {
        storeRedirectUrl = epicListingUrl
        runner = 'legendary'
        if (epicAppName) {
          name = epicAppName
        }
      }

      if (quest.quest_external_game !== null) {
        runner = quest.quest_external_game.runner
        storeRedirectUrl = quest.quest_external_game.store_redirect_url
      } // check for gameinfo to see if it is on the library
      return getGameInfo(name, runner)
        .then((res) => {
          if (!res) {
            throw new Error('Game not found in library')
          }

          return navigate(`/gamepage/${runner}/${name}`, {
            state: { gameInfo: res, fromQuests: true }
          })
        })
        .catch(async () => {
          // if hyperplay game, add to library and navigate to game page
          if (runner === 'hyperplay') {
            await window.api.addHyperplayGame(name)
            const gameInfo = await getGameInfo(name, runner)

            return navigate(`/gamepage/hyperplay/${name}`, {
              state: { gameInfo, fromQuests: true }
            })
          }
          // if epic game, open in epic store
          return navigate(`/store-page?store-url=${storeRedirectUrl}`)
        })
    },
    onError: (error, variable) => {
      window.api.logError(
        `Error navigating to ${variable} game: ${error.message}`
      )
    }
  })
  //Search Quest
  const fuseOptions = {
    keys: ['name', 'title'],
    threshold: 0.2
  }

  const questsWithGameNames =
    quests?.map((quest) => {
      const gameName = listings?.[quest.project_id]?.project_meta?.name ?? ''
      return {
        ...quest,
        title: gameName,
        name: quest.name
      }
    }) ?? []

  const fuse = new Fuse(questsWithGameNames ?? [], fuseOptions)

  let searchFilteredQuests: FuseResult<Quest>[] = []
  if (searchText) {
    searchFilteredQuests = fuse.search(searchText) as FuseResult<Quest>[]
  } else if (quests) {
    searchFilteredQuests = quests.map((quest) => ({
      id: quest.id,
      project_id: quest.project_id,
      name: quest.name,
      title: listings?.[quest.project_id]?.project_meta?.name ?? '',
      item: quest,
      refIndex: 0
    }))
  }

  const searchQuests = (quests: Quest[], query: string) => {
    if (!query) return quests
    const results = fuse.search(query)
    return results.map((result) => result.item)
  }

  const filteredQuests = searchQuests(quests ?? [], searchText)

  useEffect(() => {
    if (filteredQuests.length > 0) {
      const currentQuestExists = filteredQuests.find(
        (quest) => quest.id === selectedQuestId
      )
      if (!currentQuestExists) {
        const firstQuest = filteredQuests[0]
        if (firstQuest) {
          const searchParams = new URLSearchParams(window.location.search)
          const newUrl = `/quests/${firstQuest.id}${
            searchParams.toString() ? `?${searchParams.toString()}` : ''
          }#card-${firstQuest.id}`
          navigate(newUrl)
        }
      }
    }
  }, [filteredQuests, navigate, selectedQuestId])

  const initialQuestId = searchFilteredQuests?.[0]?.item?.id ?? null
  const visibleQuestId = selectedQuestId ?? initialQuestId

  const imagesToPreload: string[] = []
  const gameElements =
    searchFilteredQuests?.map((result: FuseResult<Quest>) => {
      const imageUrl = listings
        ? listings[result.item.project_id]?.project_meta?.main_capsule
        : ''
      if (imageUrl) {
        imagesToPreload.push(imageUrl)
      }
      const title = listings
        ? listings[result.item.project_id]?.project_meta?.name
        : ''
      const id = result.item.id
      const name = result.item.name
      return (
        <QuestCard
          key={id}
          image={imageUrl ?? ''}
          title={title}
          onClick={() => {
            if (selectedQuestId !== id) {
              navigate(`/quests/${id}`)
            }
          }}
          selected={id === visibleQuestId}
          description={name}
          className={id === visibleQuestId ? 'gradientBorder' : undefined}
        />
      )
    }) ?? []

  let suggestedSearchTitles = undefined
  if (searchText) {
    suggestedSearchTitles = searchFilteredQuests?.map((val) => {
      const gameName = listings?.[val.item.project_id]?.project_meta?.name ?? ''
      return `${val.item.name} (${gameName})`
    })
  }

  return (
    <>
      <Background style={{ position: 'absolute' }}></Background>
      <div
        className={classNames(
          'contentContainer',
          contentWithAlertClass,
          styles.root
        )}
      >
        {alertComponent}
        <QuestRewardClaimedToast className={styles.toast} />
        <QuestsSummaryTable
          games={gameElements}
          imagesToPreload={imagesToPreload}
          filterProps={{ activeFilter, setActiveFilter }}
          isFetching={questsResults?.data.isFetching}
          isPageLoading={questsResults?.data.isLoading}
          activeTab={activeFilter}
          tabs={[]}
          messageModalProps={{
            title: t('quests.noneFound.title', 'No Quests Found.'),
            message: t(
              'quests.noneFound.message',
              'There were no quests found.'
            )
          }}
          pageTitle={t('quests.quests', 'Quests')}
          className={styles.tableContainer}
          classNames={{
            gamesTable: classNames(visibleQuestId && styles.questSelectedLayout)
          }}
          searchBar={
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              i18n={{ placeholder: t('quests.search', 'Search') }}
              classNames={{ container: styles.searchBar }}
              suggestions={suggestedSearchTitles}
            />
          }
        />
        {visibleQuestId ? (
          <QuestDetails
            className={styles.detailsWrapper}
            questId={visibleQuestId}
            isQuestsPage={true}
            onPlayClick={(quest) => {
              navigateToGame.mutate(quest)
            }}
          />
        ) : (
          <>
            <DarkContainer
              className={classNames(
                styles.detailsWrapper,
                styles.loadingContainer
              )}
            >
              <LoadingSpinner className={styles.loadingSpinner} />
            </DarkContainer>
          </>
        )}
      </div>
    </>
  )
}
